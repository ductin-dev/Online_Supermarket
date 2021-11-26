import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';

import { Typography } from '@material-ui/core';
import { message, Button } from 'antd';
import { Grid } from '@material-ui/core';
import { CheckCircleOutlined } from '@ant-design/icons';

import MainCard from '../../ui-component/cards/MainCard';
import CartItemList from '../../ui-component/table/CartItemList';
import ItemList from '../../ui-component/table/ItemList';
import { REALTIME_CART } from '../../endpoint';
import { getCartHandler } from '../../services/Cart/getCart';
import { addOrderHandler } from '../../services/Order/addOrder';
import { submitCartHandler, unSubmitCartHandler } from '../../services/Cart/submitCart';

const Cart = () => {
    let { cartId } = useParams();
    const history = useNavigate();
    const customization = useSelector((state) => state.customization);

    //CART
    const [cart, setCart] = useState({
        cartId: '',
        shop: {},
        customerId: '',
        totalPrice: '',
        itemsInCart: []
    });
    useEffect(() => {
        getCartHandler(cartId, callbackCart);
    }, [cartId]);
    const callbackCart = (res) => {
        if (res.customerId) {
            setCart({
                cartId: res.cartId,
                shop: res.shop,
                customerId: res.customerId,
                totalPrice: res.totalPrice,
                itemsInCart: res.itemsInCart
            });
        } else {
            message.warning('Không tìm thấy giỏ hàng này, hoặc nó đã được thực hiện');
            history('/carts');
        }
    };

    //REALTIME CART
    const [connection, setConnection] = useState(null);
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(REALTIME_CART + cartId, { withCredentials: false })
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, [cartId]);
    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on('AddItemToCart', (message) => {
                        getCartHandler(cartId, callbackCart);
                    });
                    connection.on('RemoveItemFromCart', (message) => {
                        getCartHandler(cartId, callbackCart);
                    });
                    connection.on('SubmitItems', (message) => {
                        getCartHandler(cartId, callbackCart);
                    });
                    connection.on('UnsubmitItems', (message) => {
                        getCartHandler(cartId, callbackCart);
                    });
                })
                .catch((error) => console.log('ERROR: ' + error));
        }
    }, [connection, cartId]);
    const callBackSync = async (event) => {
        try {
            if (connection) await connection.send(event);
        } catch (exception_var) {
            console.log('Not connect');
        }
    };

    //CURRENT CUSTOMER
    useEffect(() => {
        if (customization.currentCustomer.name === null) {
            message.warning('Chưa đăng nhập');
            history('/');
        }
    }, [customization.currentCustomer.name, history]);

    //CHECK READY
    const [readyCount, setReadyCount] = useState(0);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        let readyCount = 0;
        let ready = false;
        cart.itemsInCart.forEach((element) => {
            if (element.readyToOrder) {
                readyCount += 1;
                if (element.customerId === customization.currentCustomer.customerId) ready = true;
            }
        });
        setReadyCount(readyCount);
        setReady(ready);
    }, [cart, customization.currentCustomer.customerId]);

    return (
        <MainCard
            title={
                <>
                    Giỏ hàng:{' '}
                    <a href={'/shop/' + cart.shop?.shopId} target="_blank">
                        {cart.shop?.name}
                    </a>
                </>
            }
        >
            <Typography variant="body2">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ItemList
                                    cartId={cart.cartId}
                                    items={cart.shop?.items}
                                    ordering={true}
                                    callBackSync={() => callBackSync('AddItemToCart')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CartItemList
                                    cartId={cart.cartId}
                                    itemsInCart={cart.itemsInCart}
                                    callBackSync={() => callBackSync('RemoveItemFromCart')}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <MainCard
                                    title="Thanh toán"
                                    secondary={
                                        <>
                                            {ready ? (
                                                <Button
                                                    style={{ margin: 5, backgroundColor: 'red', border: 'none' }}
                                                    type="primary"
                                                    onClick={() =>
                                                        unSubmitCartHandler(customization.currentCustomer.customerId, cart.cartId, (res) =>
                                                            callBackSync('UnsubmitItems')
                                                        )
                                                    }
                                                >
                                                    <CheckCircleOutlined />
                                                    Huỷ xác nhận
                                                </Button>
                                            ) : (
                                                <Button
                                                    style={{ margin: 5, backgroundColor: 'forestgreen', border: 'none' }}
                                                    type="primary"
                                                    onClick={() =>
                                                        submitCartHandler(
                                                            cart.itemsInCart.filter(
                                                                (element) => element.customerId === customization.currentCustomer.customerId
                                                            ),
                                                            customization.currentCustomer.customerId,
                                                            cart.cartId,
                                                            (res) => callBackSync('SubmitItems')
                                                        )
                                                    }
                                                >
                                                    <CheckCircleOutlined />
                                                    Xác nhận
                                                </Button>
                                            )}
                                            <Button
                                                disabled={customization.currentCustomer.customerId === cart.customerId ? false : true}
                                                style={{ margin: 5 }}
                                                type="primary"
                                                onClick={() => {
                                                    if (ready) {
                                                        addOrderHandler(cart.cartId, 'Đã gửi đơn', (res) => {
                                                            callBackSync('NewOrder');
                                                            history('/order/' + res.orderId);
                                                        });
                                                    } else if (cart.itemsInCart.length === 0) {
                                                        message.warn('Giỏ hàng trống');
                                                    } else message.warn('Vui lòng xác nhận đơn trước');
                                                }}
                                            >
                                                Submit giỏ hàng&nbsp;|&nbsp;
                                                <span style={{ fontWeight: 800, color: 'rgb(252,247,94)' }}>
                                                    {parseFloat(cart.totalPrice).toFixed(2)}&nbsp;$
                                                </span>
                                            </Button>
                                        </>
                                    }
                                >
                                    {' '}
                                    <Grid item xs={12}>
                                        <p>
                                            Chỉ host mới có thể submit giỏ hàng (nếu tất cả người dùng đã xác nhận), số mục đã được xác
                                            nhận&nbsp;
                                            <span
                                                style={{
                                                    color: readyCount === cart.itemsInCart?.length ? 'forestgreen' : 'red',
                                                    fontWeight: 800,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                ( {readyCount} / {cart.itemsInCart?.length} )
                                            </span>
                                        </p>
                                    </Grid>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Typography>
        </MainCard>
    );
};

export default Cart;
