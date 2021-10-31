import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Button, Space, Alert, Select } from 'antd';
import { cancelOrderHandler, updateStatusOrderHandler } from '../../services/Order/changeStatusOrder';
import { useState, useEffect } from 'react';
import { TagsOutlined, CheckSquareOutlined, ShopOutlined, SendOutlined, ScheduleOutlined } from '@ant-design/icons';

const { Option } = Select;
const MySwal = withReactContent(Swal);

const FormEdit = (props: any) => {
    const [formEdit] = Form.useForm();
    const [status, setStatus] = useState(props.order.status);
    const inputChange = (e: any) => {
        setStatus(e);
    };
    const [OrderStatus, setOrderStatus] = useState([] as any);

    useEffect(() => {
        switch (props.order.status) {
            case 'Confirmed':
                setOrderStatus(['Sent To Kitchen', 'Ready for Pickup', 'Delivered']);
                break;
            case 'Sent To Kitchen':
                setOrderStatus(['Ready for Pickup', 'Delivered']);
                break;
            case 'Ready for Pickup':
                setOrderStatus(['Delivered']);
                break;
            case 'Delivered':
                setOrderStatus([]);
                break;
            default:
                setOrderStatus(['Confirmed', 'Sent To Kitchen', 'Ready for Pickup', 'Delivered']);
        }
    }, []);

    return (
        <Form
            form={formEdit}
            layout="vertical"
            onFinish={() => {
                updateStatusOrderHandler(props.order.orderId, status, props.order.customerId, props.order.shopId, props.callbackSync);
                MySwal.close();
            }}
            autoComplete="off"
        >
            <div style={{ overflow: 'hidden' }}>
                <p style={{ textAlign: 'center' }}>Chọn trạng thái</p>
                <Form.Item name="Đổi trạng thái">
                    <Select style={{ width: 240, zIndex: 2147483647 }} onChange={(e) => inputChange(e)}>
                        {OrderStatus.map((item: any) => (
                            <Option key={item} value={item}>
                                {
                                    {
                                        Confirmed: (
                                            <Alert
                                                style={{ fontWeight: 800 }}
                                                message={item}
                                                type="success"
                                                showIcon
                                                icon={<CheckSquareOutlined />}
                                            />
                                        ),
                                        'Sent To Kitchen': (
                                            <Alert
                                                style={{ fontWeight: 800 }}
                                                message={item}
                                                type="warning"
                                                showIcon
                                                icon={<ShopOutlined />}
                                            />
                                        ),
                                        'Ready for Pickup': (
                                            <Alert
                                                style={{ fontWeight: 800 }}
                                                message={item}
                                                type="info"
                                                showIcon
                                                icon={<SendOutlined />}
                                            />
                                        ),
                                        Delivered: (
                                            <Alert
                                                style={{ fontWeight: 800 }}
                                                message={item}
                                                type="success"
                                                showIcon
                                                icon={<ScheduleOutlined />}
                                            />
                                        )
                                    }[item as string]
                                }
                            </Option>
                        ))}
                    </Select>
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

export const changeStatusOrder = (order: any, callbackSync: (res: any) => void) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'forestgreen' }}>
                <TagsOutlined />
                &nbsp;Chỉnh sửa đơn hàng: <span style={{ color: 'violet' }}>{order.orderId}</span>
            </h5>
        ),
        html: <FormEdit order={order} callbackSync={callbackSync} />,
        showCloseButton: false,
        showConfirmButton: false
    });
};

export const cancelOrder = (order: any, callbackSync: (res: any) => void) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'red' }}>
                <TagsOutlined />
                &nbsp;Bạn có muốn huỷ đơn hàng <span style={{ color: 'violet' }}>{order.orderId}</span> này?
            </h5>
        ),
        text: 'thao tác này không thể hoàn tác',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Có`,
        denyButtonText: `Không`
    }).then((result) => {
        if (result.isConfirmed) cancelOrderHandler(order.orderId, order.customerId, callbackSync);
    });
};

export const approvedOrder = (order: any, callbackSync: (res: any) => void) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'foresgreen' }}>
                <TagsOutlined />
                &nbsp;Bạn có muốn xác nhận đơn hàng <span style={{ color: 'violet' }}>{order.orderId}</span> này?
            </h5>
        ),
        text: 'thao tác này không thể hoàn tác',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Có`,
        denyButtonText: `Không`
    }).then((result) => {
        if (result.isConfirmed) updateStatusOrderHandler(order.orderId, 'Confirmed', order.customerId, order.shopId, callbackSync);
    });
};
