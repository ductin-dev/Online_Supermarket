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
import { getAllOrderByShopHandler } from '../../services/Order/getOrder';

const Shop = () => {
    let { shopId } = useParams();
    const history = useNavigate();

    const [isViewOrders, setIsViewOrders] = useState(false);

    //SHOP
    const [syncShop, setSyncShop] = useState(false);
    const [shop, setShop] = useState({
        name: '',
        phone: '',
        image: '',
        items: []
    });
    useEffect(() => {
        getShopHandler(shopId, callbackShop);
    }, [syncShop]);
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

    //ORDER + ITEM LIST
    const [orders, setOrders] = useState([]);
    const [syncOrders, setSyncOrders] = useState(false);
    useEffect(() => {
        getAllOrderByShopHandler(shopId, (res) => {
            setOrders(res.orders);
        });
    }, [syncOrders]);
    const viewOrders = () => {
        setIsViewOrders(true);
    };
    const viewItems = () => {
        setIsViewOrders(false);
    };
    const pharseOrders = (arr) => {
        let arrCanPick = [];
        let arrCon = [];
        let arrKitchen = [];
        let arrBottom = [];
        arr.forEach((element) => {
            switch (element.status) {
                case 'Ready for Pickup':
                    arrCanPick.push(element);
                    break;
                case 'Confirmed':
                    arrCon.push(element);
                    break;
                case 'Sent To Kitchen':
                    arrKitchen.push(element);
                    break;
                default:
                    arrBottom.push(element);
                    break;
            }
        });
        return arrCanPick.concat(arrCon).concat(arrKitchen).concat(arrBottom);
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
                                editShop(shop, () => {
                                    setSyncShop(!syncShop);
                                });
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
            {isViewOrders ? (
                <OrderList
                    orders={pharseOrders(orders)}
                    shopId={shopId}
                    syncOrderList={() => {
                        setSyncOrders(!syncOrders);
                    }}
                />
            ) : (
                <ItemList
                    items={shop.items}
                    shopId={shopId}
                    callbackSync={() => {
                        setSyncShop(!syncShop);
                    }}
                />
            )}
        </MainCard>
    );
};

export default Shop;
