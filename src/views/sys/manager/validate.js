import { valideCertificateNo, validePhone } from "@/constants/validate";

const validePassword = (rule, value, callback) => {
    if (value.length < 6 || value.length > 18) {
        callback(new Error("请输入6-18位密码"));
    } else if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
        callback(new Error("密码格式不正确"));
    } else {
        callback();
    }
};

export let validateData = {
    account: { required: true, message: "请填写登录名称", trigger: "blur" },
    userName: { required: true, message: "请填写员姓名", trigger: "blur" },
    phone: [
        { required: true, message: "请填写手机号", trigger: "blur" },
        { validator: validePhone, trigger: "blur" }
    ],
    certificateNo: [
        { required: true, message: "请填写身份证号", trigger: "blur" },
        { validator: valideCertificateNo, trigger: "blur" }
    ],
    password: [
        { required: true, message: "请填写登录密码", trigger: "blur" },
        { validator: validePassword, trigger: "blur" }
    ],
    status: { required: true, message: "请选择状态", trigger: "change" }
};
