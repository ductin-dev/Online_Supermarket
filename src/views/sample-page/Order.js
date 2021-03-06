import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';

import { Typography } from '@material-ui/core';
import { message, Descriptions, Table, Steps, Popover } from 'antd';

import MainCard from '../../ui-component/cards/MainCard';
import { getOrderHandler } from '../../services/Order/getOrder';
import { readableTime } from '../../utils/dateTimeFormater';
import { REALTIME_ORDER, REALTIME_SHOP } from '../../endpoint';

const { Step } = Steps;
const customDot = (dot, { status, index }) => <Popover content={<span>{status}</span>}>{dot}</Popover>;

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
    }, [callbackOrder, orderId]);
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
    }, [orderId]);
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
    }, [connection, orderId]);
    const [connection2, setConnection2] = useState(null);
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(REALTIME_SHOP + order.shopId, { withCredentials: false })
            .withAutomaticReconnect()
            .build();
        setConnection2(connect);
    }, [order.shopId]);
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
    }, [connection2, orderId]);

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
        },
        {
            title: 'Tổng',
            key: 'total',
            dataIndex: 'total'
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
                price: item.price,
                total: parseFloat(item.amount * item.price).toFixed(2)
            });
        }
        setData(dataTmp);
    }, [order.items]);

    return (
        <MainCard
            title={
                <Descriptions layout="horizontal" bordered>
                    <Descriptions.Item label="Define ID" span={12}>
                        {order.cusId + ' - ' + order.shopId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt hàng" span={12}>
                        {readableTime(order.orderTime)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày hoàn thành" span={12}>
                        {order.status === 'Cancelled' ? <span style={{ color: 'red' }}>Đã huỷ</span> : readableTime(order.deliveTime)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thành tiền" span={12}>
                        {parseFloat(order.totalPrice).toFixed(2)}
                    </Descriptions.Item>
                </Descriptions>
            }
        >
            <Typography variant="body2">
                {order.status == null ? (
                    <Steps current={1} progressDot={customDot}>
                        <Step title="Đã submit" description="Đã tạo đơn hàng" />
                        <Step title="Chờ xác nhận" status="wait" />
                    </Steps>
                ) : order.status === 'Confirmed' ? (
                    <Steps current={1} progressDot={customDot}>
                        <Step title="Đã submit" description="Đã tạo đơn hàng" />
                        <Step title="Đã xác nhận" />
                        <Step title="In kitcheen" description="Đang chuẩn bị đơn hàng ở bếp" />
                        <Step title="Đã sẵn sàng" description="Đơn hàng đang chờ để mang đi" />
                        <Step title="Thành công" />
                    </Steps>
                ) : order.status === 'Sent To Kitchen' ? (
                    <Steps current={2} progressDot={customDot}>
                        <Step title="Đã submit" description="Đã tạo đơn hàng" />
                        <Step title="Đã xác nhận" />
                        <Step title="In kitcheen" description="Đang chuẩn bị đơn hàng ở bếp" />
                        <Step title="Đã sẵn sàng" description="Đơn hàng đang chờ để mang đi" />
                        <Step title="Thành công" />
                    </Steps>
                ) : order.status === 'Ready for Pickup' ? (
                    <Steps current={3} progressDot={customDot}>
                        <Step title="Đã submit" description="Đã tạo đơn hàng" />
                        <Step title="Đã xác nhận" />
                        <Step title="In kitcheen" description="Đang chuẩn bị đơn hàng ở bếp" />
                        <Step title="Đã sẵn sàng" description="Đơn hàng đang chờ để mang đi" />
                        <Step title="Thành công" />
                    </Steps>
                ) : order.status === 'Delivered' ? (
                    <Steps current={4} progressDot={customDot}>
                        <Step title="Đã submit" description="Đã tạo đơn hàng" status="finish" />
                        <Step title="Đã xác nhận" status="finish" />
                        <Step title="In kitcheen" description="Đang chuẩn bị đơn hàng ở bếp" status="" />
                        <Step title="Đã sẵn sàng" description="Đơn hàng đang chờ để mang đi" status="finish" />
                        <Step title="Thành công" description="Đã hoàn thành đơn hàng" status="finish" />
                    </Steps>
                ) : (
                    <div>
                        <Steps current={1} progressDot={customDot} style={{ width: '50%', margin: 'auto' }}>
                            <Step title="Đã submit" description="Đã tạo đơn hàng" />
                            <Step title="Đã huỷ" description="Đã huỷ đơn hàng" status="error" />
                        </Steps>
                    </div>
                )}
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
