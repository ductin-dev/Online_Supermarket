import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Input, Button, Space, Upload, Avatar } from 'antd';
import { addItemHandler } from '../../services/Item/addItem';
import { editItemHandler } from '../../services/Item/editItem';
import { deleteItemHandler } from '../../services/Item/deleteItem';
import { useState } from 'react';
import { InboxOutlined, TagsOutlined } from '@ant-design/icons';
import { isNumber, isEmpty } from '../../utils/validation';

const MySwal = withReactContent(Swal);

const FormAdd = (props: any) => {
    const [formAdd] = Form.useForm();
    const [state, setState] = useState({
        Name: '',
        Price: '',
        Image: null
    });
    const inputChange = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    return (
        <Form
            form={formAdd}
            layout="vertical"
            onFinish={() => {
                addItemHandler(props.shopId, state.Name, state.Price, state.Image, props.callbackSync);
                MySwal.close();
            }}
            autoComplete="off"
        >
            <div style={{ overflow: 'hidden' }}>
                <Form.Item
                    name="Name"
                    label="Tên item"
                    rules={[
                        {
                            validator: (_, value) =>
                                !isEmpty(state.Name) ? Promise.resolve() : Promise.reject(new Error('Không được để trống'))
                        }
                    ]}
                >
                    <Input placeholder="Trà sữa" name="Name" value={state.Name} onChange={inputChange} />
                </Form.Item>
                <Form.Item
                    name="Price"
                    label="Giá"
                    rules={[
                        {
                            validator: (_, value) =>
                                isNumber(state.Price) ? Promise.resolve() : Promise.reject(new Error('Nhập giá tiền hợp lệ'))
                        }
                    ]}
                >
                    <Input placeholder="10" name="Price" value={state.Price} onChange={inputChange} />
                </Form.Item>
                <Form.Item label="Ảnh mặt hàng">
                    <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => {
                            setState({ ...state, Image: e.fileList[0]?.originFileObj });
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                        noStyle
                    >
                        <Upload.Dragger name="files" multiple={false}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Kéo thả ảnh vào đây</p>
                            <p className="ant-upload-hint">hỗ trợ jpg,jpeg,png | 1 file duy nhất</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </div>
            <Form.Item>
                <Space style={{ float: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Tạo item
                    </Button>
                    <Button
                        type="default"
                        onClick={() => {
                            MySwal.close();
                        }}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

const FormEdit = (props: any) => {
    console.log(props);
    const [formEdit] = Form.useForm();
    const [state, setState] = useState({
        Name: props.item.name,
        Price: props.item.price,
        Image: props.item.image
    });
    const inputChange = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    return (
        <Form
            form={formEdit}
            layout="vertical"
            onFinish={() => {
                editItemHandler(props.shopId, props.item.itemId, state.Name, state.Price, state.Image, props.callbackSync);
                MySwal.close();
            }}
            autoComplete="off"
        >
            <div style={{ overflow: 'hidden' }}>
                <Form.Item
                    name="Name"
                    label="Tên item"
                    rules={[
                        {
                            validator: (_, value) =>
                                !isEmpty(state.Name) ? Promise.resolve() : Promise.reject(new Error('Không được để trống'))
                        }
                    ]}
                >
                    <Input placeholder="Trà sữa" name="Name" value={state.Name} defaultValue={props.item.name} onChange={inputChange} />
                </Form.Item>
                <Form.Item
                    name="Price"
                    label="Giá"
                    rules={[
                        {
                            validator: (_, value) =>
                                isNumber(state.Price) ? Promise.resolve() : Promise.reject(new Error('Nhập giá tiền hợp lệ'))
                        }
                    ]}
                >
                    <Input placeholder="10" name="Price" value={state.Price} defaultValue={props.item.price} onChange={inputChange} />
                </Form.Item>
                <Form.Item label="Ảnh mặt hàng">
                    <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => {
                            setState({ ...state, Image: e.fileList[0]?.originFileObj });
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                        noStyle
                    >
                        <Upload.Dragger name="files" multiple={false}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Ảnh hiện tại</p>
                            <Avatar src={'data:image/png;base64,' + state.Image} shape="square" size={64} />
                            <p className="ant-upload-hint">hỗ trợ jpg,jpeg,png | 1 file duy nhất</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </div>
            <Form.Item>
                <Space style={{ float: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                    <Button
                        type="default"
                        onClick={() => {
                            MySwal.close();
                        }}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export const addItem = (shopId: string, callbackSync: () => void) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'forestgreen' }}>
                <TagsOutlined />
                &nbsp;Tạo item mới
            </h5>
        ),
        html: <FormAdd shopId={shopId} callbackSync={callbackSync} />,
        showCloseButton: false,
        showConfirmButton: false
    });
};

export const editItem = (shopId: string, item: any, callbackSync: () => void) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'forestgreen' }}>
                <TagsOutlined />
                &nbsp;Chỉnh sửa item <span style={{ color: 'violet' }}>{item.itemId}</span>
            </h5>
        ),
        html: <FormEdit shopId={shopId} item={item} callbackSync={callbackSync} />,
        showCloseButton: false,
        showConfirmButton: false
    });
};

export const deleteItem = (shopId: string, itemId: string, callbackSync: () => void) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'red' }}>
                <TagsOutlined />
                &nbsp;Bạn có muốn xoá item này?
            </h5>
        ),
        text: 'thao tác này có thể hoàn tác',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Có`,
        denyButtonText: `Không`
    }).then((result) => {
        if (result.isConfirmed) deleteItemHandler(shopId, itemId, callbackSync);
    });
};

export const viewItemImage = (image: any) => {
    MySwal.fire({
        html: <Avatar src={'data:image/png;base64,' + image} shape="square" size={256} />,
        showCloseButton: false,
        showConfirmButton: false
    });
};
