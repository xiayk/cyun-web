/**
 * 身份证验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const valideCertificateNo = (rule, value, callback) => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(value)) {
        callback(new Error("请输入正确身份证号"));
    } else {
        callback();
    }
};

/**
 * 验证手机号
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validePhone = (rule, value, callback) => {
    if (!/^[1]\d{10}$/.test(value)) {
        callback(new Error("请输入正确手机号"));
    } else {
        callback();
    }
};

/**
 * 验证邮箱
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const valideEmail = (rule, value, callback) => {
    const emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (!emailReg.test(value)) {
        callback(new Error("请输入正确邮箱"));
    } else {
        callback();
    }
};
