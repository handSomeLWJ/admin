export const checkMobile = (rule, value, callback) => {
    const reg = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
    if (!reg.test(value)) return callback(new Error("请输入正确的手机号"));
    callback();
};