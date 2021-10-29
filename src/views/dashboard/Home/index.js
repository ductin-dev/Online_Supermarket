import React, { useEffect, useState } from 'react';
import { Form, Input, message, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CUSTOMER } from '../../../store/actions';

import { Grid } from '@material-ui/core';

import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { addCustomer } from '../../formpopup/Customer';
import { addShop } from '../../formpopup/Shop';
import { loginShopHandler } from '../../../services/Shop/getShop';
import { loginCusHandler } from '../../../services/Customer/getCustomer';
import { isPhone } from '../../../utils/validation';
import { logoutCusHandler } from '../../../services/Customer/getCustomer';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Dashboard = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    const [formShop] = Form.useForm();
    const [formCus] = Form.useForm();
    const onFinishFailed = () => {
        message.error('Vui lòng nhập đầy đủ thông tin');
    };
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    //Input
    const [state, setState] = useState({
        ShopPhone: '',
        CusPhone: ''
    });
    const inputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    //Redirect
    const gotoShop = () => {
        message.success('đang chuyển qua trang quản lý shop...');
        loginShopHandler(state.ShopPhone, (res) => {
            history('/shop/' + res.shopId);
        });
    };
    const gotoProfile = () => {
        message.success('đang chuyển qua trang cá nhân...');
        loginCusHandler(state.CusPhone, (res) => {
            if (res.name) {
                dispatch({ type: SET_CUSTOMER, currentCustomer: res });
                localStorage.setItem('jwtFake', res.phoneNumber);
                history('/myprofile');
            } else {
                message.error('Người dùng không tồn tại');
            }
        });
    };

    //RENDER
    const shop = () => (
        <MainCard
            title="Quản lí shop"
            secondary={
                <Button type="primary" onClick={addShop}>
                    + Tạo Shop mới
                </Button>
            }
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title="Quản lí shop">
                        <Form form={formShop} layout="vertical" onFinish={gotoShop} onFinishFailed={onFinishFailed} autoComplete="off">
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item
                                    name="Phone"
                                    label="Đăng nhập bằng SĐT"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                isPhone(state.ShopPhone) ? Promise.resolve() : Promise.reject(new Error('Nhập sđt hợp lệ'))
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="nhập sđt của shop vào đây"
                                        name="ShopPhone"
                                        value={state.ShopPhone}
                                        onChange={inputChange}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        Truy cập
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </SubCard>
                    <br></br>
                    <p>
                        Truy cập vào trang quản lí của shop, quản lí danh sách mặt hàng, danh sách orders, cũng như thay đổi trạng thái đơn
                        hàng
                    </p>
                </Grid>
            </Grid>
        </MainCard>
    );

    const cus = () => (
        <MainCard
            title="Đăng nhập / Đặt hàng"
            secondary={
                <Button type="primary" onClick={addCustomer}>
                    + Đăng ký
                </Button>
            }
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard
                        title={
                            customization.currentCustomer.name === null
                                ? 'Sử dụng tài khoản đã có'
                                : 'Bạn đã đăng nhập với tên: ' + customization.currentCustomer.name
                        }
                    >
                        <Form form={formCus} layout="vertical" onFinish={gotoProfile} onFinishFailed={onFinishFailed} autoComplete="off">
                            {customization.currentCustomer.name === null && (
                                <div style={{ overflow: 'hidden' }}>
                                    <Form.Item
                                        name="Phone"
                                        label="Số điện thoại"
                                        rules={[
                                            {
                                                validator: (_, value) =>
                                                    isPhone(state.CusPhone)
                                                        ? Promise.resolve()
                                                        : Promise.reject(new Error('Nhập sđt hợp lệ'))
                                            }
                                        ]}
                                    >
                                        <Input
                                            name="CusPhone"
                                            placeholder="nhập sđt liên kết vào đây"
                                            value={state.CusPhone}
                                            onChange={inputChange}
                                        />
                                    </Form.Item>
                                </div>
                            )}
                            <Form.Item>
                                <Space>
                                    {customization.currentCustomer.name === null ? (
                                        <Button type="primary" htmlType="submit" style={{ backgroundColor: 'darkorange', border: 'none' }}>
                                            Đăng nhập
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                style={{ backgroundColor: 'forestgreen', border: 'none' }}
                                                onClick={() => {
                                                    history('/carts');
                                                }}
                                            >
                                                Đặt hàng
                                            </Button>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                onClick={() => {
                                                    logoutCusHandler();
                                                    message.success('Đã đăng xuất');
                                                    window.location.href = '/';
                                                }}
                                                style={{ backgroundColor: 'red', border: 'none' }}
                                            >
                                                Đăng xuất
                                            </Button>
                                        </>
                                    )}
                                </Space>
                            </Form.Item>
                        </Form>
                    </SubCard>
                    <br></br>
                    <p>
                        Bạn phải đăng nhập để có thể sử dụng các tính năng: xem trang cá nhân, xem hoá đơn, đặt hàng, theo dõi tình trạng
                        đơn hàng
                    </p>
                </Grid>
            </Grid>
        </MainCard>
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        {shop()}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {cus()}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
