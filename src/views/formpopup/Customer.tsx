import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Input, Button, Space, Upload, Avatar } from 'antd';
import { addCusHandler } from '../../services/Customer/addCustomer';
import { useState } from 'react';
import { UserAddOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import { editCusHandler } from '../../services/Customer/editCustomer';
import { isPhone, isEmpty } from '../../utils/validation';

const MySwal = withReactContent(Swal);

const FormAdd = () => {
    const [formAdd] = Form.useForm();
    const [state, setState] = useState({
        Name: '',
        Phone: '',
        Avatar: ''
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
                addCusHandler(state.Name, state.Phone, state.Avatar);
                MySwal.close();
            }}
            autoComplete="off"
        >
            <div style={{ overflow: 'hidden' }}>
                <Form.Item
                    name="Name"
                    label="Tên người dùng"
                    rules={[
                        {
                            validator: (_, value) =>
                                !isEmpty(state.Name) ? Promise.resolve() : Promise.reject(new Error('Không được để trống'))
                        }
                    ]}
                >
                    <Input placeholder="Nguyễn Văn An" name="Name" value={state.Name} onChange={inputChange} />
                </Form.Item>
                <Form.Item
                    name="Phone Number"
                    label="Số điện thoại"
                    rules={[
                        {
                            validator: (_, value) =>
                                isPhone(state.Phone) ? Promise.resolve() : Promise.reject(new Error('Nhập sđt hợp lệ'))
                        }
                    ]}
                >
                    <Input placeholder="0123456789" name="Phone" value={state.Phone} onChange={inputChange} />
                </Form.Item>
                <Form.Item label="Ảnh avatar">
                    <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => {
                            setState({ ...state, Avatar: e.fileList[0]?.originFileObj });
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
                        Đăng ký
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
        Name: props.cus.name,
        Phone: props.cus.phoneNumber,
        Avatar: props.cus.avatar
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
                editCusHandler(props.cus.customerId, state.Name, state.Phone, state.Avatar);
                MySwal.close();
            }}
            autoComplete="off"
        >
            <div style={{ overflow: 'hidden' }}>
                <Form.Item
                    name="Name"
                    label="Tên người dùng"
                    rules={[
                        {
                            validator: (_, value) =>
                                !isEmpty(state.Name) ? Promise.resolve() : Promise.reject(new Error('Không được để trống'))
                        }
                    ]}
                >
                    <Input
                        placeholder="Nguyễn Văn An"
                        name="Name"
                        value={state.Name}
                        defaultValue={props.cus.name}
                        onChange={inputChange}
                    />
                </Form.Item>
                <Form.Item
                    name="Phone Number"
                    label="Số điện thoại"
                    rules={[
                        {
                            validator: (_, value) =>
                                isPhone(state.Phone) ? Promise.resolve() : Promise.reject(new Error('Nhập sđt hợp lệ'))
                        }
                    ]}
                >
                    <Input
                        placeholder="0123456789"
                        name="Phone"
                        value={state.Phone}
                        defaultValue={props.cus.phoneNumber}
                        onChange={inputChange}
                    />
                </Form.Item>
                <Form.Item label="Ảnh avatar">
                    <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => {
                            setState({ ...state, Avatar: e.fileList[0]?.originFileObj });
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
                            <Avatar src={'data:image/png;base64,' + state.Avatar} shape="square" size={64} />
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

export const addCustomer = () => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'forestgreen' }}>
                <UserAddOutlined />
                &nbsp;Đăng ký người dùng mới
            </h5>
        ),
        html: <FormAdd />,
        showCloseButton: false,
        showConfirmButton: false
    });
};

export const editCustomer = (cus: any) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'forestgreen' }}>
                <UserOutlined />
                &nbsp;Chỉnh sửa thông tin user <span style={{ color: 'violet' }}>{cus.name}</span>
            </h5>
        ),
        html: <FormEdit cus={cus} />,
        showCloseButton: false,
        showConfirmButton: false
    });
};
