export const readableTime = (a) => (a ? a.split('T')[0] + ', ' + a.split('T')[1].split('.')[0] : a);
