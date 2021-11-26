import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { addCartHandler } from '../../services/Cart/addCart';

const CartList = (props: any) => {
    const history = useNavigate();
    const customization = useSelector((state: any) => state.customization);

    //Table column structure
    const columns = [
        {
            name: 'Id',
            sortable: false,
            cell: (row: any) => <span>{row.cartId}</span>
        },
        {
            name: 'Shop',
            sortable: false,
            cell: (row: any) => <span>{row.shopId}</span>
        },
        {
            name: 'Số lượng hàng hoá',
            sortable: false,
            cell: (row: any) => <span style={{ fontWeight: 800 }}>{row.totalAmount}</span>
        },
        {
            name: 'Thành tiền',
            cell: (row: any) => <div>{row.totalPrice}</div>
        },
        {
            name: 'Thao tác',
            cell: (row: any) => (
                <div>
                    <Button type="primary" icon={<EyeFilled />} style={{ margin: 2 }} onClick={() => history('/carts/' + row.cartId)} />
                </div>
            )
        }
    ];

    const calSum = (arr: any) => {
        let arrRes = [] as any;
        arr.forEach((element: any) => {
            let sum = 0;
            element.itemsInCart.forEach((element: any) => {
                sum += element.amount;
            });
            arrRes.push({
                cartId: element.cartId,
                shopId: element.shopId,
                totalAmount: sum,
                totalPrice: element.totalPrice
            });
        });
        return arrRes;
    };

    //RENDER
    return (
        <DataTable
            title={
                <span>
                    Danh sách giỏ hàng của bạn | SĐT SHOP:{' '}
                    <span style={{ color: 'violet' }}>
                        <a href={'/shop/' + props.carts[0]?.shopId} target="_blank" style={{ fontWeight: 800 }} rel="noreferrer">
                            {props.shopPhone}
                        </a>
                    </span>{' '}
                    <Button
                        type="primary"
                        style={{ float: 'right', backgroundColor: 'forestgreen', border: 'none' }}
                        onClick={() => {
                            addCartHandler(customization.currentCustomer.customerId, props.shopPhone, props.callbackSync);
                        }}
                    >
                        + Thêm giỏ hàng
                    </Button>
                </span>
            }
            columns={columns}
            data={!props.carts[0].cartId ? [] : calSum(props.carts)}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 30, 100]}
        />
    );
};
export default CartList;
