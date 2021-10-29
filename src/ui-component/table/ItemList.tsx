import DataTable from 'react-data-table-component';
import { Button, Avatar } from 'antd';
import { addItem, deleteItem, editItem } from '../../views/formpopup/Item';
import { EditFilled, DeleteFilled, EyeFilled, UpCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { activeItemHandler } from '../../services/Item/activeItem';

const ItemList = (props: any) => {
    const history = useNavigate();

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
            cell: (row: any) => <Avatar src={'data:image/png;base64,' + row.image} shape="square" size={32} />
        },
        {
            name: 'Price',
            cell: (row: any) => <div>{row.price}</div>
        },
        {
            name: 'Thao tác',
            cell: (row: any) =>
                row.isActive ? (
                    <div>
                        <Button type="primary" icon={<EyeFilled />} style={{ margin: 2 }} onClick={() => history('/item/' + row.itemId)} />
                        <Button type="primary" icon={<EditFilled />} style={{ margin: 2 }} onClick={() => editItem(props.shopId, row)} />
                        <Button
                            type="primary"
                            icon={<DeleteFilled />}
                            style={{ margin: 2, border: 'none', backgroundColor: 'red' }}
                            onClick={() => deleteItem(props.shopId, row.itemId)}
                        />
                    </div>
                ) : (
                    <Button
                        type="primary"
                        icon={<UpCircleFilled />}
                        style={{ margin: 2, border: 'none', backgroundColor: 'darkorange' }}
                        onClick={() => activeItemHandler(props.shopId, row.itemId)}
                    />
                )
        }
    ];

    //RENDER
    return (
        <DataTable
            title={
                <span>
                    Danh sách mặt hàng
                    <Button
                        type="primary"
                        style={{ float: 'right', backgroundColor: 'forestgreen', border: 'none' }}
                        onClick={() => addItem(props.shopId)}
                    >
                        + Thêm mặt hàng
                    </Button>
                </span>
            }
            columns={columns}
            data={props.items}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 30, 100]}
        />
    );
};
export default ItemList;
