export const isPhone = (a) => {
    try {
        return a.match(/^\d{10}$/);
    } catch (exception_var) {
        return false;
    }
};
export const isNumber = (a) => {
    try {
        return !isNaN(parseFloat(a)) && isFinite(a);
    } catch (exception_var) {
        return false;
    }
};
export const isEmpty = (a) => {
    return a.trim() === '';
};
