import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import { Button } from 'antd';
import {
    NotificationFilled,
    DashboardOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
    CheckSquareFilled,
    RotateRightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { readableTime } from '../../utils/dateTimeFormater';
import { REALTIME_ORDER, REALTIME_SHOP } from '../../endpoint';
import { viewOrder } from '../../views/formpopup/Order';
import { cancelOrder, changeStatusOrder, approvedOrder } from '../../views/formpopup/Order';

const OrderStatus = ['Confirmed', 'Sent To Kitchen', 'Ready for Pickup', 'Delivered'];

const OrderList = (props: any) => {
    const history = useNavigate();

    //REALTIME ORDER
    const [connection, setConnection] = useState(null) as any;
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(REALTIME_SHOP + props.shopId, { withCredentials: false })
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, []);
    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on('NewOrder', (message: any) => {
                        console.log('New: ' + message);
                        props.syncOrderList();
                    });
                    connection.on('CancelOrder', (message: any) => {
                        console.log('Cancel: ' + message);
                        props.syncOrderList();
                    });
                    connection.on('ChangeOrderStatus', (message: any) => {
                        console.log('Change: ' + message);
                        props.syncOrderList();
                    });
                })
                .catch((error: any) => console.log('ERROR: ' + error));
        }
    }, [connection]);
    const callBackSync = async (event: any) => {
        try {
            if (connection) await connection.send(event);
        } catch (exception_var) {
            console.log('Not connect');
        }
    };

    //Table column structure
    const columns = [
        {
            name: 'Id',
            sortable: false,
            cell: (row: any) => <span>{row.orderId}</span>
        },
        {
            name: 'Shop',
            sortable: false,
            cell: (row: any) => (
                <span>
                    <a
                        onClick={() => {
                            history('/shop/' + row.shopId);
                        }}
                        style={{ fontWeight: 800 }}
                    >
                        {row.shopId}
                    </a>
                </span>
            )
        },
        {
            name: 'Người tạo',
            sortable: false,
            cell: (row: any) => (
                <span style={{ minWidth: 150 }}>
                    <span style={{ fontWeight: 800 }}>{row.customerName}</span>&nbsp;đã tạo vào:{' '}
                    <span style={{ fontWeight: 800 }}>{readableTime(row.orderTime)}</span>
                </span>
            )
        },
        {
            name: 'Trạng thái',
            sortable: false,
            cell: (row: any) =>
                row.status === null ? (
                    <p
                        style={{
                            fontSize: 10,
                            backgroundColor: '#f3f6f4',
                            color: '#494949',
                            border: '2px solid #eeeeee',
                            padding: '5px',
                            borderRadius: 8,
                            width: 100,
                            textAlign: 'center',
                            fontWeight: 800
                        }}
                    >
                        <NotificationFilled />
                        &nbsp;
                        {row.deliveryInformation}
                    </p>
                ) : row.status === 'Ready for Pickup' ? (
                    <p
                        style={{
                            fontSize: 10,
                            backgroundColor: 'darkorange',
                            color: 'white',
                            border: 'rgb(41,171,135)',
                            padding: '5px',
                            borderRadius: 8,
                            width: 150,
                            textAlign: 'center',
                            fontWeight: 800
                        }}
                    >
                        <CheckSquareFilled />
                        &nbsp; Can pickup
                    </p>
                ) : row.status === 'Confirmed' ? (
                    <p
                        style={{
                            fontSize: 10,
                            backgroundColor: '#1890ff',
                            color: 'white',
                            border: 'rgb(41,171,135)',
                            padding: '5px',
                            borderRadius: 8,
                            width: 150,
                            textAlign: 'center',
                            fontWeight: 800
                        }}
                    >
                        <CheckSquareFilled />
                        &nbsp;Confirmed
                    </p>
                ) : row.status === 'Cancelled' ? (
                    <p
                        style={{
                            fontSize: 10,
                            backgroundColor: '#f3f6f4',
                            color: '#494949',
                            border: '2px solid #eeeeee',
                            padding: '5px',
                            borderRadius: 8,
                            width: 100,
                            textAlign: 'center',
                            fontWeight: 800
                        }}
                    >
                        <CloseCircleOutlined />
                        &nbsp;
                        {row.status}
                    </p>
                ) : (
                    <p
                        style={{
                            fontSize: 10,
                            backgroundColor: 'rgba(0,171,102,0.7)',
                            color: 'white',
                            border: 'rgb(0,171,102)',
                            padding: '5px',
                            borderRadius: 8,
                            width: 120,
                            textAlign: 'center',
                            fontWeight: 800
                        }}
                    >
                        <CheckSquareFilled />
                        &nbsp;
                        {row.status}
                    </p>
                )
        },
        {
            name: 'Thành tiền',
            cell: (row: any) => <div>{row.totalPrice}</div>
        },
        {
            name: 'Đổi trạng thái',
            cell: (row: any) => (
                <div>
                    {OrderStatus.includes(row.status) ? (
                        <Button
                            disabled={row.status === 'Delivered' ? true : false}
                            type={row.status === 'Delivered' ? 'default' : 'primary'}
                            style={{
                                margin: 2,
                                fontWeight: 800,
                                backgroundColor: row.status === 'Delivered' ? '' : 'darkorange',
                                border: 'none'
                            }}
                            icon={<DashboardOutlined />}
                            onClick={() =>
                                changeStatusOrder(row, (res) => {
                                    props.syncOrderList();
                                    callBackSync('ChangeOrderStatus');
                                })
                            }
                        />
                    ) : row.status === 'Cancelled' ? (
                        <Button
                            disabled={true}
                            type={'primary'}
                            style={{
                                margin: 2,
                                fontWeight: 800,
                                border: 'none'
                            }}
                            icon={<DashboardOutlined />}
                            onClick={() => {}}
                        />
                    ) : (
                        <>
                            <Button
                                type="primary"
                                style={{ margin: 2, fontWeight: 800, backgroundColor: 'forestgreen', border: 'none' }}
                                icon={<CheckCircleOutlined />}
                                onClick={() =>
                                    approvedOrder(row, (res) => {
                                        props.syncOrderList();
                                        callBackSync('ChangeOrderStatus');
                                    })
                                }
                            />
                            <Button
                                type="primary"
                                style={{ margin: 2, fontWeight: 800, backgroundColor: 'red', border: 'none' }}
                                icon={<CloseCircleOutlined />}
                                onClick={() => cancelOrder(row, (res) => callBackSync('CancelOrder'))}
                            />
                        </>
                    )}
                </div>
            )
        },
        {
            name: 'Xem đơn hàng',
            cell: (row: any) => (
                <div>
                    <Button type="primary" icon={<EyeOutlined />} 
                        onClick={() =>viewOrder({customerName: row.customerName, orderTime: row.orderTime, status: row.status, totalPrice: row.totalPrice, itemsInCart: row.itemsInCart})} 
                    />
                </div>
            )
        }
    ];

    //RENDER
    return (
        <DataTable
            title={<span>Danh sách đơn hàng</span>}
            columns={columns}
            data={props.orders}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 30, 100]}
        />
    );
};
export default OrderList;
