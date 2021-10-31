import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Button, Space, Alert, Select, Descriptions, Table, Badge } from 'antd';
import { cancelOrderHandler, updateStatusOrderHandler } from '../../services/Order/changeStatusOrder';
import { getOrderHandler } from '../../services/Order/getOrder';
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

const FormViewOrder = (props: any) => {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key'
          },
        {
          title: 'Tên món',
          dataIndex: 'itemName',
          key: 'itemName'
        },
        {
          title: 'Số lượng',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Giá tiền',
          key: 'price',
          dataIndex: 'price',
        }
      ];
      
      let data = new Array<Object>();
      for(let i=0; i < props.itemsInCart.length; i++){
        let item = props.itemsInCart[i];
        data.push(
          {
              key: i+1,
              itemName: item.itemName,
              amount: item.amount,
              price: item.price,
          }
        )
      }
    return (
        <div>
            <Descriptions layout="horizontal" bordered>
              <Descriptions.Item label="Tên khách hàng" span={12}>{props.customerName}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt hàng" span={12}>{props.orderTime}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={12}>
                  <Badge status="processing" text={props.status==null?"Chưa xác định":props.status} />
              </Descriptions.Item>
              <Descriptions.Item label="Thành tiền" span={12}>{props.totalPrice}</Descriptions.Item>
            </Descriptions>
            <div>
                <br/>
                <h4>Danh sách món hàng</h4>
                <Table columns={columns} dataSource={data} />
            </div>
            
        </div>
        
    );
}

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

export const viewOrder = (props:any) => {
    MySwal.fire({
        title: (
            <h5 style={{ color: 'forestgreen' }}>
                &nbsp;Thông tin đơn hàng
            </h5>
        ),
        width: 800,
        html: <FormViewOrder customerName={props.customerName} orderTime={props.orderTime} status={props.status} totalPrice={props.totalPrice} itemsInCart={props.itemsInCart}/>,
        showCloseButton: true,
        showConfirmButton: false
    });
};
