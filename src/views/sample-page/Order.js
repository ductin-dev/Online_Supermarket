import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';

import { Typography } from '@material-ui/core';
import { message, Descriptions, Table, Badge } from 'antd';

import MainCard from '../../ui-component/cards/MainCard';
import { getOrderHandler } from '../../services/Order/getOrder';
import { readableTime } from '../../utils/dateTimeFormater';
import { REALTIME_ORDER, REALTIME_SHOP } from '../../endpoint';

const Order = () => {
    let { orderId } = useParams();
    const history = useNavigate();

    //ORDER
    const [order, setOrder] = useState({
        shopId: '',
        cusId: '',
        shopName: '',
        shopPhone: '',
        status: '',
        orderTime: '',
        deliveTime: '',
        items: []
    });
    useEffect(() => {
        getOrderHandler(orderId, callbackOrder);
    }, []);
    const callbackOrder = (res) => {
        if (res?.shopId) {
            setOrder({
                shopId: res.shopId,
                cusId: res.customerId,
                shopName: res.shopName,
                shopPhone: res.phoneNumberOfShop,
                status: res.status,
                orderTime: res.orderTime,
                deliveTime: res.deliveryTime,
                items: res.itemsInCart,
                totalPrice: res.totalPrice
            });
        } else {
            message.warning('Không tìm thấy đơn hàng này');
            history('/');
        }
    };

    //REALTIME ORDER
    const [connection, setConnection] = useState(null);
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(REALTIME_ORDER + orderId, { withCredentials: false })
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, []);
    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on('ChangeOrderStatus', (message) => {
                        getOrderHandler(orderId, callbackOrder);
                    });
                })
                .catch((error) => console.log('ERROR: ' + error));
        }
    }, [connection]);
    const [connection2, setConnection2] = useState(null);
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(REALTIME_SHOP + order.shopId, { withCredentials: false })
            .withAutomaticReconnect()
            .build();
        setConnection2(connect);
    }, []);
    useEffect(() => {
        if (connection2) {
            connection2
                .start()
                .then(() => {
                    connection2.on('NewOrder', (message) => {
                        getOrderHandler(orderId, callbackOrder);
                    });
                    connection2.on('CancelOrder', (message) => {
                        getOrderHandler(orderId, callbackOrder);
                    });
                })
                .catch((error) => console.log('ERROR: ' + error));
        }
    }, [connection2]);

    //ITEM TABLE
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: 'Mặt hàng',
            dataIndex: 'itemName',
            key: 'itemName'
        },
        {
            title: 'Người đặt',
            dataIndex: 'customerName',
            key: 'customerName'
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Giá tiền',
            key: 'price',
            dataIndex: 'price'
        }
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        let dataTmp = [];
        for (let i = 0; i < order.items.length; i++) {
            let item = order.items[i];
            dataTmp.push({
                key: i + 1,
                itemName: item.itemName,
                customerName: item.customerName,
                amount: item.amount,
                price: item.price
            });
        }
        setData(dataTmp);
    }, [order.items]);

    return (
        <MainCard
            title={
                <Descriptions layout="horizontal" bordered>
                    <Descriptions.Item label="Backend không chịu trả tên user nên hiện tạm cái id này" span={12}>
                        {order.cusId + ' - ' + order.shopId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt hàng" span={12}>
                        {readableTime(order.orderTime)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày xác nhận" span={12}>
                        {readableTime(order.deliveTime)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái" span={12}>
                        <Badge status="processing" text={order.status == null ? 'Chờ xác nhận' : order.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Thành tiền" span={12}>
                        {parseFloat(order.totalPrice).toFixed(2)}
                    </Descriptions.Item>
                </Descriptions>
            }
        >
            <Typography variant="body2">
                <div>
                    <br />
                    <h4>Danh sách món hàng</h4>
                    <Table columns={columns} dataSource={data} />
                </div>
            </Typography>
        </MainCard>
    );
};

export default Order;
