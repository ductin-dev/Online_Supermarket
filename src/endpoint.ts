const domain = 'http://localhost:8080/';

//Cart
const GET_CART = domain + 'api/Cart/';
const CREATE_CART = domain + 'api/Cart/create';
const ADD_ITEM_TO_CART = domain + 'api/Cart/add/item';
const SUBMIT_CART = domain + 'api/Cart/submit';
const UNSUBMIT_CART = domain + 'api/Cart/unsubmit';
const GET_CART_BY_CUSTOMER = domain + 'api/Cart/exist/shop/customer';
const REMOVE_CART_CUSTOMER = domain + 'api/Cart/remove/customer';
//Customer
const ADD_CUSTOMER = domain + 'api/Customer/register';
const UPDATE_CUSTOMER = domain + 'api/Customer';
const LOGIN_CUSTOMER = domain + 'api/Customer/login';
const DELETE_CUSTOMER = domain + 'api/Customer/delete';
//Item
const CREATE_ITEM = domain + 'api/Item/create';
const UPDATE_ITEM = domain + 'api/Item';
const ACTIVE_ITEM = domain + 'api/Item/active';
const DELETE_ITEM = domain + 'api/Item';
const GET_ITEM = domain + 'api/Item/';
//Shop
const CREATE_SHOP = domain + 'api/Shop/register';
const LOGIN_SHOP = domain + 'api/Shop/login';
const UPDATE_SHOP = domain + 'api/Shop';
const DELETE_SHOP = domain + 'api/Shop/delete';
const GET_SHOP = domain + 'api/Shop/';
//Order
const GET_ORDER = domain + 'api/Order/';
const CREATE_ORDER = domain + 'api/Order';
const CANCEL_ORDER = domain + 'api/Order/cancel';
const UPDATE_STATUS_ORDER = domain + 'api/Order/status';
const GET_ALL_ORDER_BY_CUSTOMER = domain + 'api/Order/{}/customer/all';
const GET_ALL_ORDER_BY_SHOP = domain + 'api/Order/{}/shop/all';

//SIGNR
const REALTIME_SHOP = domain + 'hubs/shop?shop='; ///shop?shop=acd839
const REALTIME_CART = domain + 'hubs/cart?cart='; ///cart?cart=103ba8
const REALTIME_ORDER = domain + 'hubs/order?order='; ///order?order=acd839

export { domain };
export {
    GET_CART,
    CREATE_CART,
    ADD_ITEM_TO_CART,
    SUBMIT_CART,
    UNSUBMIT_CART,
    GET_CART_BY_CUSTOMER,
    REMOVE_CART_CUSTOMER,
    ADD_CUSTOMER,
    UPDATE_CUSTOMER,
    LOGIN_CUSTOMER,
    DELETE_CUSTOMER,
    CREATE_ITEM,
    UPDATE_ITEM,
    ACTIVE_ITEM,
    DELETE_ITEM,
    GET_ITEM,
    CREATE_SHOP,
    LOGIN_SHOP,
    UPDATE_SHOP,
    DELETE_SHOP,
    GET_SHOP,
    GET_ORDER,
    CREATE_ORDER,
    CANCEL_ORDER,
    UPDATE_STATUS_ORDER,
    GET_ALL_ORDER_BY_CUSTOMER,
    GET_ALL_ORDER_BY_SHOP
};
export { REALTIME_CART, REALTIME_ORDER, REALTIME_SHOP };
