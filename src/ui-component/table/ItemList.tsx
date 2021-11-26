import DataTable from 'react-data-table-component';
import { Button, Avatar } from 'antd';
import { useSelector } from 'react-redux';

import { addItem, deleteItem, editItem, viewItemImage } from '../../views/formpopup/Item';
import { PlusCircleOutlined, EditFilled, DeleteFilled, EyeFilled, UpCircleFilled } from '@ant-design/icons';
import { activeItemHandler } from '../../services/Item/activeItem';
import { addItemToCart } from '../../services/Cart/editCart';

const ItemList = (props: any) => {
    const customization = useSelector((state: any) => state.customization);

    //Table column structure
    const columns = [
        {
            name: 'Id',
            sortable: false,
            cell: (row: any) => (
                <span>
                    {row.itemId}{' '}
                    {!row.isActive && (
                        <>
                            <br></br>
                            <p style={{ color: 'gray', fontSize: 11 }}>(inactive)</p>
                        </>
                    )}
                </span>
            )
        },
        {
            name: 'Name',
            sortable: false,
            cell: (row: any) => <span style={{ fontWeight: 800 }}>{row.name}</span>
        },
        {
            name: 'Image',
            sortable: false,
            cell: (row: any) => (
                <div onClick={() => viewItemImage(row.image)}>
                    <Avatar src={'data:image/png;base64,' + row.image} shape="square" size={32} />
                </div>
            )
        },
        {
            name: 'Price',
            cell: (row: any) => <div>{row.price}</div>
        },
        {
            name: props.ordering ? 'Thêm ->' : 'Thao tác',
            cell: (row: any) =>
                row.isActive ? (
                    <div>
                        {props.ordering ? (
                            <Button
                                type="default"
                                icon={<PlusCircleOutlined />}
                                style={{ margin: 2, display: 'inline-block' }}
                                onClick={() =>
                                    addItemToCart(row.itemId, customization.currentCustomer.customerId, props.cartId, props.callBackSync)
                                }
                            />
                        ) : (
                            <>
                                <Button type="primary" icon={<EyeFilled />} style={{ margin: 2 }} />
                                <Button
                                    type="primary"
                                    icon={<EditFilled />}
                                    style={{ margin: 2 }}
                                    onClick={() => editItem(props.shopId, row, props.callbackSync)}
                                />
                                <Button
                                    type="primary"
                                    icon={<DeleteFilled />}
                                    style={{ margin: 2, border: 'none', backgroundColor: 'red' }}
                                    onClick={() => deleteItem(props.shopId, row.itemId, props.callbackSync)}
                                />
                            </>
                        )}
                    </div>
                ) : (
                    !props.ordering && (
                        <Button
                            type="primary"
                            icon={<UpCircleFilled />}
                            style={{ margin: 2, border: 'none', backgroundColor: 'darkorange' }}
                            onClick={() => activeItemHandler(props.shopId, row.itemId, props.callbackSync)}
                        />
                    )
                )
        }
    ];

    //RENDER
    return (
        <DataTable
            title={
                <span>
                    {props.ordering ? (
                        'Chọn món hàng'
                    ) : (
                        <>
                            Danh sách mặt hàng{' '}
                            <Button
                                type="primary"
                                style={{ float: 'right', backgroundColor: 'forestgreen', border: 'none' }}
                                onClick={() => addItem(props.shopId, props.callbackSync)}
                            >
                                + Thêm mặt hàng
                            </Button>
                        </>
                    )}
                </span>
            }
            columns={columns}
            data={props.ordering ? props.items?.filter((item: any) => item.isActive === true) : props.items}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 30, 100]}
        />
    );
};
export default ItemList;
