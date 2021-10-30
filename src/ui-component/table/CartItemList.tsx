import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

import { Button } from 'antd';
import { MinusCircleOutlined, CheckCircleOutlined, LockFilled } from '@ant-design/icons';
import { removeItemFromCart } from '../../services/Cart/editCart';

const CartItemList = (props: any) => {
    const customization = useSelector((state: any) => state.customization);

    //Table column structure
    const columns = [
        {
            name: 'Người thêm',
            sortable: false,
            cell: (row: any) => (
                <span style={{ fontWeight: 800, maxWidth: 150 }}>
                    {row.customerName}
                    {row.readyToOrder ? (
                        <p
                            style={{
                                fontSize: 10,
                                backgroundColor: 'rgba(0,171,102,0.8)',
                                color: 'white',
                                border: '2px solid rgba(0,171,102)',
                                padding: '5px',
                                borderRadius: 8,
                                width: 80,
                                textAlign: 'center'
                            }}
                        >
                            <CheckCircleOutlined />
                            &nbsp;Ready
                        </p>
                    ) : (
                        <p
                            style={{
                                fontSize: 10,
                                backgroundColor: 'rgba(255,163,67,0.8)',
                                color: 'white',
                                border: '2px solid rgba(255,163,67)',
                                padding: '5px',
                                borderRadius: 8,
                                width: 80,
                                textAlign: 'center'
                            }}
                        >
                            <LockFilled />
                            &nbsp;..working
                        </p>
                    )}
                </span>
            )
        },
        {
            name: 'Tên',
            sortable: false,
            cell: (row: any) => <span style={{ fontWeight: 800 }}>{row.itemName}</span>
        },
        {
            name: 'Số lượng',
            cell: (row: any) => (
                <div>
                    <span style={{ fontWeight: 700 }}>{row.amount}</span>&nbsp;<span style={{ fontSize: 8 }}>x</span>&nbsp;{row.price}
                </div>
            )
        },
        {
            name: 'Thành tiền',
            cell: (row: any) => <span style={{ fontWeight: 700, color: 'darkorange' }}>{(row.price * row.amount).toFixed(2)}</span>
        },
        {
            name: 'Xoá',
            cell: (row: any) => (
                <Button
                    disabled={customization.currentCustomer.customerId === row.customerId ? false : true}
                    type="default"
                    icon={<MinusCircleOutlined />}
                    style={{ margin: 2, display: 'inline-block' }}
                    onClick={() =>
                        removeItemFromCart(row.itemId, customization.currentCustomer.customerId, props.cartId, props.callBackSync)
                    }
                />
            )
        }
    ];

    const parseArray = (arr: any) => {
        let thisCus = customization.currentCustomer.customerId;
        let arrTop = [] as any;
        let arrBottom = [] as any;
        arr.forEach((element: any) => {
            if (thisCus === element.customerId) arrTop.push(element);
            else arrBottom.push(element);
        });
        arrBottom.sort((a: any, b: any) => a.customerName.localeCompare(b.customerName));
        return arrTop.concat(arrBottom);
    };

    //RENDER
    return (
        <DataTable
            title={<span>Giỏ hàng</span>}
            columns={columns}
            data={parseArray(props.itemsInCart)}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 30, 100]}
        />
    );
};
export default CartItemList;
