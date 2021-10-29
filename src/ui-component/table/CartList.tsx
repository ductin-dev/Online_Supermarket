import DataTable from 'react-data-table-component';
import { Button } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { readableTime } from '../../utils/dateTimeFormater';

const CartList = (props: any) => {
    const history = useNavigate();

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
                    {row.shopId}:&nbsp;
                    <a
                        onClick={() => {
                            history('/shop/' + row.shopId);
                        }}
                        style={{ fontWeight: 800 }}
                    >
                        {row.shopName}
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
            name: 'Info',
            sortable: false,
            cell: (row: any) => <span style={{ fontWeight: 800 }}>{row.deliveryInformation}</span>
        },
        {
            name: 'Thành tiền',
            cell: (row: any) => <div>{row.totalPrice}</div>
        },
        {
            name: 'Thao tác',
            cell: (row: any) => (
                <div>
                    <Button type="primary" icon={<EyeFilled />} style={{ margin: 2 }} onClick={() => history('/order/' + row.orderId)} />
                </div>
            )
        }
    ];

    //RENDER
    return (
        <DataTable
            title={
                <span>
                    Danh sách giỏ hàng{' '}
                    <Button type="primary" style={{ float: 'right', backgroundColor: 'forestgreen', border: 'none' }} onClick={() => {}}>
                        + Thêm giỏ hàng
                    </Button>
                </span>
            }
            columns={columns}
            data={props.orders}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 30, 100]}
        />
    );
};
export default CartList;
