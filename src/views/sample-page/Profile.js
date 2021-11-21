import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MainCard from '../../ui-component/cards/MainCard';
import OrderList from '../../ui-component/table/OrderList';
import { editCustomer } from '../formpopup/Customer';
import { Avatar, Button, message } from 'antd';
import { EditFilled, UserSwitchOutlined } from '@ant-design/icons';
import { SET_CUSTOMER } from '../../store/actions';
import { loginCusHandler, logoutCusHandler } from '../../services/Customer/getCustomer';
import { getAllOrderByCustomerHandler } from '../../services/Order/getOrder';

const Profile = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    //CURRENT CUSTOMER
    const [syncUser, setSyncUser] = useState(false);
    const [user, setUser] = useState({
        customerId: customization.currentCustomer.customerId,
        name: customization.currentCustomer.name,
        phoneNumber: customization.currentCustomer.phoneNumber,
        avatar: customization.currentCustomer.avatar
    });
    useEffect(() => {
        if (customization.currentCustomer.name === null) {
            if (localStorage.getItem('jwtFake') === null) {
                message.warning('Chưa đăng nhập');
                history('/');
            }
        }
    }, []);
    useEffect(() => {
        loginCusHandler(localStorage.getItem('jwtFake'), (res) => {
            dispatch({ type: SET_CUSTOMER, currentCustomer: res });
            if (res === 0) {
                message.warning('Chưa đăng nhập');
                history('/');
            }
        });
    }, [syncUser]);
    useEffect(
        () => {
            setUser({
                customerId: customization.currentCustomer.customerId,
                name: customization.currentCustomer.name,
                phoneNumber: customization.currentCustomer.phoneNumber,
                avatar: customization.currentCustomer.avatar
            });
        },
        [customization],
        dispatch
    );

    //ORDER LIST
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getAllOrderByCustomerHandler(user.customerId, (res) => {
            setOrders(res.orders);
        });
    }, [user.customerId]);

    return (
        <MainCard
            title={
                <>
                    <span style={{ float: 'left' }}>
                        <Avatar src={'data:image/png;base64,' + user.avatar} shape="square" size={64} />
                        &nbsp;{user.name}&nbsp;&nbsp;
                        <Button
                            type="primary"
                            icon={<UserSwitchOutlined />}
                            style={{ fontSize: 12, padding: '2px 15px 2px 15px', border: 'none', backgroundColor: 'red', borderRadius: 8 }}
                            onClick={() => {
                                logoutCusHandler();
                                message.success('Đã đăng xuất');
                                window.location.href = '/';
                            }}
                        >
                            Đăng xuất
                        </Button>
                    </span>
                    <span style={{ float: 'right', textAlign: 'center' }}>
                        <span style={{ fontWeight: 200, fontSize: 12 }}>SĐT: </span>
                        {user.phoneNumber}
                        <br></br>
                        <Button
                            type="primary"
                            icon={<EditFilled />}
                            style={{ margin: 2 }}
                            onClick={() =>
                                editCustomer(user, () => {
                                    setSyncUser(!syncUser);
                                })
                            }
                        >
                            Chỉnh sửa
                        </Button>
                    </span>
                </>
            }
        >
            <OrderList orders={orders} myprofileView={true} />
        </MainCard>
    );
};

export default Profile;
