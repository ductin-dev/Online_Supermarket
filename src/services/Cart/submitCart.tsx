import { SUBMIT_CART } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const submitCartHandler = (
    itms: [amount: number, itemId: string, isDeleted: false],
    cusId: string,
    carId: string,
    callback: (res: any) => void
) => {
    axios
        .post(SUBMIT_CART, {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                items: itms,
                customerId: cusId,
                cartId: carId
            }
        })
        .then((res: any) => {
            message.success('Đã submit đơn hàng');
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
