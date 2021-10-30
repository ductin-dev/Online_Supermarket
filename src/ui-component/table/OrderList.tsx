import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import { Button } from 'antd';
import { NotificationFilled, DashboardOutlined, CheckSquareFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { readableTime } from '../../utils/dateTimeFormater';
import { REALTIME_ORDER, REALTIME_SHOP } from '../../endpoint';

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
                        props.syncOrderList();
                    });
                })
                .catch((error: any) => console.log('ERROR: ' + error));
        }
    }, [connection]);

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
                <span>
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
                            backgroundColor: 'rgba(41,171,135,0.8)',
                            color: 'white',
                            border: 'rgb(41,171,135)',
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
                ) : (
                    <p
                        style={{
                            fontSize: 10,
                            backgroundColor: 'rgba(230,145,56,0.8)',
                            color: 'white',
                            border: 'rgb(230,145,56)',
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
            name: 'Xem đơn hàng',
            cell: (row: any) => (
                <div>
                    <Button
                        type="primary"
                        style={{ margin: 2, fontWeight: 800, backgroundColor: 'forestgreen', border: 'none' }}
                        icon={<DashboardOutlined />}
                        onClick={() => history('/order/' + row.orderId)}
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
