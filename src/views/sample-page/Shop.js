import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MainCard from '../../ui-component/cards/MainCard';
import ItemList from '../../ui-component/table/ItemList';
import OrderList from '../../ui-component/table/OrderList';
import { getShopHandler } from '../../services/Shop/getShop';
import { editShop } from '../formpopup/Shop';
import { Avatar, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditFilled, MenuOutlined } from '@ant-design/icons';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { REALTIME_SHOP } from '../../endpoint';
import { getAllOrderByShopHandler } from '../../services/Order/getOrder';

const Shop = () => {
    let { shopId } = useParams();
    const history = useNavigate();

    const [isViewOrders, setIsViewOrders] = useState(false);

    //SHOP
    const [sync, setSync] = useState(false);
    const [shop, setShop] = useState({
        name: '',
        phone: '',
        image: '',
        items: []
    });

    useEffect(() => {
        getShopHandler(shopId, callbackShop);
    }, [sync]);

    const callbackShop = (res) => {
        if (res.name) {
            setShop({
                name: res.name,
                phone: res.phoneNumber,
                image: res.image,
                items: res.items
            });
        } else {
            message.warning('Không tìm thấy shop này');
            history('/');
        }
    };

    const [connection, setConnection] = useState(null);
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(REALTIME_SHOP + shopId, { withCredentials: false })
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, []);
    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on('ReceiveMessage', (message) => {
                        setSync(!sync);
                        console.log('Re: ' + message);
                    });
                })
                .catch((error) => console.log('ERROR: ' + error));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection) await connection.send('SendMessage', 'Cập nhật');
    };

    //ORDER LIST
    const [orders, setOrders] = useState([]);
    const viewOrders = () => {
        getAllOrderByShopHandler(shopId, (res) => {
            setOrders(res.orders);
        });
        setIsViewOrders(true);
    };
    const viewItems = () => {
        setIsViewOrders(false);
    };

    return (
        <MainCard
            title={
                <>
                    <span style={{ float: 'left', display: 'block' }}>
                        <Avatar src={'data:image/png;base64,' + shop.image} shape="square" size={64} style={{ display: 'inline-block' }} />
                        &nbsp;&nbsp;
                        <span style={{ display: 'inline-block', margin: 'auto', padding: 'auto' }}>
                            {shop.name}
                            <br></br>
                            <span style={{ fontWeight: 200, fontSize: 12 }}>SĐT:{shop.phone} </span>
                        </span>
                    </span>
                    <span style={{ float: 'right', textAlign: 'center' }}>
                        <Button
                            type="primary"
                            icon={<EditFilled />}
                            style={{ margin: 2 }}
                            onClick={() => {
                                editShop(shop);
                                sendMessage();
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                        {isViewOrders ? (
                            <Button
                                type="default"
                                icon={<MenuOutlined />}
                                style={{ margin: 2, borderColor: 'forestgreen', color: 'forestgreen' }}
                                onClick={() => viewItems()}
                            >
                                Danh sách items
                            </Button>
                        ) : (
                            <Button type="default" icon={<MenuOutlined />} style={{ margin: 2 }} onClick={() => viewOrders()}>
                                Xem đơn hàng
                            </Button>
                        )}
                    </span>
                </>
            }
        >
            {isViewOrders ? <OrderList orders={orders} /> : <ItemList items={shop.items} shopId={shopId} />}
        </MainCard>
    );
};

export default Shop;
