import { CREATE_ORDER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const addOrderHandler = (crtId: string, delInfor: string, callBackSync: (res: any) => void) => {
    axios
        .post(CREATE_ORDER, {
            cartId: crtId,
            deliveryInformation: delInfor
        })
        .then((res: any) => {
            if (!res.data.isSuccess) {
                message.warning(res.data.errorMessage);
            } else {
                message.success('Đã ghi nhận 1 order mới');
                callBackSync(res.data);
            }
        })
        .catch((err) => {
            message.warning('Đã lỗi: ' + err);
        });
};
