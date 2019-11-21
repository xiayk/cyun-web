import {
    valideCertificateNo,
    validePhone,
    valideEmail
} from "@/constants/validate";

export let validateData = {
    name: {
        required: true,
        message: "企业名称不可为空",
        trigger: "blur"
    },
    merchantType: {
        required: true,
        message: "企业主体类型不可为空",
        trigger: "blur"
    },
    merchantIdType: {
        required: true,
        message: "企业证件类型不可为空",
        trigger: "blur"
    },
    idType: {
        required: true,
        message: "证件类型不可为空",
        trigger: "blur"
    },
    licenseNo: {
        required: true,
        message: "营业执照号不可为空",
        trigger: "blur"
    },
    openAcctLicenseNo: {
        required: true,
        message: "开户许可证核准号不可为空",
        trigger: "blur"
    },
    legalName: {
        required: true,
        message: "企业法人姓名不可为空",
        trigger: "blur"
    },
    legalIdNo: [{
            required: true,
            message: "企业法人身份证号码不可为空",
            trigger: "blur"
        },
        {
            validator: valideCertificateNo,
            trigger: "blur"
        }
    ],
    servicePhone: {
        required: true,
        message: "企业联系电话不可为空",
        trigger: "blur"
    },
    bankAccountNo: {
        required: true,
        message: "银行账号不可为空",
        trigger: "blur"
    },
    bankName: {
        required: true,
        message: "开户行支行名称不可为空",
        trigger: "blur"
    },
    cityCode: {
        required: true,
        message: "开户行所在城市不可为空",
        trigger: "blur"
    },
    bankNo: {
        required: true,
        message: "联行号不可为空"
    },
    transactorName: {
        required: true,
        message: "经办人姓名不可为空",
        trigger: "blur"
    },
    transactorIdNo: [{
            required: true,
            message: "经办人身份证号不可为空",
            trigger: "blur"
        },
        {
            validator: valideCertificateNo,
            trigger: "blur"
        }
    ],
    transactorMobile: [{
            required: true,
            message: "经办人手机号码不可为空",
            trigger: "blur"
        },
        {
            validator: validePhone,
            trigger: "blur"
        }
    ],
    transactorEmail: [{
            required: true,
            message: "经办人电子邮箱不可为空",
            trigger: "blur"
        },
        {
            validator: valideEmail,
            trigger: "blur"
        }
    ],
    agentCode: {
        required: true,
        message: "所属代理商不可为空",
        trigger: "blur"
    }
};

export let validatePrivate = {
    accountName: {
        required: true,
        message: "姓名不能为空",
        trigger: "blur"
    },
    idNo: [{
            required: true,
            message: "身份证号不能空",
            trigger: "blur"
        },
        {
            validator: valideCertificateNo,
            trigger: "blur"
        }
    ],
    mobile: {
        required: true,
        message: "银行预留手机号不能空"
    },
    bankAccountNo: {
        required: true,
        message: "银行卡号不能空"
    },
    bankName: {
        required: true,
        message: "银行卡号不能空",
        trigger: "blur"
    },
    smsCode: {
        required: true,
        message: "短信验证码不能空"
    }
}