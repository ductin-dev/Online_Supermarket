import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Input, Button, Space, Upload, Avatar } from 'antd';
import { addShopHandler } from '../../services/Shop/addShop';
import { editShopHandler } from '../../services/Shop/editShop';
import { deleteShopHandler } from '../../services/Shop/deleteShop';
import { useState } from 'react';
import { ShopFilled, InboxOutlined } from '@ant-design/icons';
import { isPhone, isEmpty } from '../../utils/validation';
const MySwal = withReactContent(Swal);

const FormAdd = () => {
    const [formAdd] = Form.useForm();
    const [state, setState] = useState({
        Name: '',
        Phone: '',
        Logo: null
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
                addShopHandler(state.Name, state.Phone, state.Logo);
                MySwal.close();
            }}
            autoComplete="off"
        >
            <div style={{ overflow: 'hidden' }}>
                <Form.Item
                    name="Name"
                    label="Tên shop"
                    rules={[
                        {
                            validator: (_, value) =>
                                !isEmpty(state.Name) ? Promise.resolve() : Promise.reject(new Error('Không được để trống'))
                        }
                    ]}
                >
                    <Input placeholder="Shop ABC" name="Name" value={state.Name} onChange={inputChange} />
                </Form.Item>
                <Form.Item
                    name="Phone Number"
                    label="Số điện thoại shop"
                    rules={[
                        {
                            validator: (_, value) =>
                                isPhone(state.Phone) ? Promise.resolve() : Promise.reject(new Error('Nhập sđt hợp lệ'))
                        }
                    ]}
                >
                    <Input placeholder="0123456789" name="Phone" value={state.Phone} onChange={inputChange} />
                </Form.Item>
                <Form.Item label="Ảnh shop">
                    <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => {
                            /*fileToBase64(e.fileList[0]?.originFileObj, (res) => {
                                setState({ ...state, Logo: res });
                            });*/
                            setState({ ...state, Logo: e.fileList[0]?.originFileObj });
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
                        Tạo shop
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
    const [formEdit] = Form.useForm();
    const [state, setState] = useState({
        Name: props.shop.name,
        Phone: props.shop.phone,
        Logo: props.shop.image
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
                editShopHandler(state.Name, props.shop.phone, state.Phone, state.Logo, props.callbackSync);
                MySwal.close();
            }}
            autoComplete="off"
        >
            <div style={{ overflow: 'hidden' }}>
                <Form.Item
                    name="Name"
                    label="Tên shop"
                    rules={[
                        {
                            validator: (_, value) =>
                                !isEmpty(state.Name) ? Promise.resolve() : Promise.reject(new Error('Không được để trống'))
                        }
                    ]}
                >
                    <Input placeholder="Shop ABC" name="Name" value={state.Name} defaultValue={props.shop.name} onChange={inputChange} />
                </Form.Item>
                <Form.Item
                    name="Phone Number"
                    label="Số điện thoại mới"
                    rules={[
                        {
                            validator: (_, value) =>
                                isPhone(state.Phone) ? Promise.resolve() : Promise.reject(new Error('Nhập sđt hợp lệ'))
                        }
                    ]}
                >
                    <Input placeholder="0123456789" name="Phone" value={state.Phone} onChange={inputChange} />
                </Form.Item>
                <Form.Item label="Ảnh shop">
                    <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => {
                            setState({ ...state, Logo: e.fileList[0]?.originFileObj });
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
                            <Avatar src={'data:image/png;base64,' + state.Logo} shape="square" size={64} />
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

export const addShop = () => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'forestgreen' }}>
                <ShopFilled />
                &nbsp;Tạo shop mới
            </h5>
        ),
        html: <FormAdd />,
        showCloseButton: false,
        showConfirmButton: false
    });
};

export const editShop = (shop: any, callbackSync: () => void) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'forestgreen' }}>
                <ShopFilled />
                &nbsp;Chỉnh sửa shop <span style={{ color: 'violet' }}>{shop.name}</span>
            </h5>
        ),
        html: <FormEdit shop={shop} callbackSync={callbackSync} />,
        showCloseButton: false,
        showConfirmButton: false
    });
};

export const deleteShop = (phone: any) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'red' }}>
                <ShopFilled />
                &nbsp;Bạn có muốn xoá shop này?
            </h5>
        ),
        text: 'thao tác này không thể hoàn tác',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Có`,
        denyButtonText: `Không`
    }).then((result) => {
        if (result.isConfirmed) deleteShopHandler(phone);
    });
};
