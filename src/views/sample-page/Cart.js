import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { Form, Input, message, Button, Space } from 'antd';
import { EditFilled, DeleteFilled, EyeFilled, UpCircleFilled } from '@ant-design/icons';

import MainCard from '../../ui-component/cards/MainCard';
import CartList from '../../ui-component/table/CartList';

//= =============================|| SAMPLE PAGE ||==============================//

const Cart = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    //CURRENT CUSTOMER
    useEffect(() => {
        if (customization.currentCustomer.name === null) {
            message.warning('Chưa đăng nhập');
            history('/');
        }
    }, []);

    return (
        <MainCard title="Chọn shop <dropdown/>">
            <Typography variant="body2">
                <CartList />
            </Typography>
        </MainCard>
    );
};

export default Cart;
