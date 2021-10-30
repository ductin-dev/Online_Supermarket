import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { Form, Input, message, Button, Space } from 'antd';

import MainCard from '../../ui-component/cards/MainCard';
import CartList from '../../ui-component/table/CartList';
import { isPhone } from '../../utils/validation';
import { getCartByCustomerHandler } from '../../services/Cart/getCart';
//= =============================|| SAMPLE PAGE ||==============================//

const Carts = () => {
    const history = useNavigate();
    const customization = useSelector((state) => state.customization);

    const [formShop] = Form.useForm();
    const [phone, setPhone] = useState('');
    const [carts, setCarts] = useState([]);
    const [showCarts, setShowCarts] = useState(false);
    const showCartsHandler = () => {
        setShowCarts(false);
        getCartByCustomerHandler(customization.currentCustomer.customerId, phone, (res) => {
            setCarts([res]);
            setShowCarts(true);
        });
    };

    //CURRENT CUSTOMER
    useEffect(() => {
        if (customization.currentCustomer.name === null) {
            message.warning('Chưa đăng nhập');
            history('/');
        }
    }, []);

    return (
        <MainCard
            title={
                <>
                    <Form form={formShop} layout="vertical" onFinish={showCartsHandler} autoComplete="off">
                        <div style={{ overflow: 'hidden' }}>
                            <Form.Item
                                style={{ display: 'inline-block' }}
                                name="Phone"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            isPhone(phone) ? Promise.resolve() : Promise.reject(new Error('Nhập sđt hợp lệ'))
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="nhập sđt shop vào đây"
                                    name="ShopPhone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block' }}>
                                <Button type="primary" htmlType="submit">
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </>
            }
        >
            <Typography variant="body2">
                {showCarts ? (
                    <CartList
                        shopPhone={phone}
                        carts={carts}
                        callbackSync={(res) => {
                            showCartsHandler();
                        }}
                    />
                ) : (
                    <p style={{ textAlign: 'center' }}>vui lòng chọn shop đầu tiên</p>
                )}
            </Typography>
        </MainCard>
    );
};

export default Carts;
