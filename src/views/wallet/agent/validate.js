import {
    valideCertificateNo,
    validePhone,
    valideEmail
} from "@/constants/validate";

let vaildName = (rule, value, callback) => {
    if (value < 50) {
        callback(new Error("企业名称最多50个汉字或字符"));
    } else {
        callback();
    }
};


let zbValideEmail = (rule, value, callback) => {
    let reg = /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)+$/
    if (!reg.test(value)) {
        callback(new Error("经办人电子邮箱格式有误"));
    } else {
        callback();
    }
}


let zbValidePhone = (rule, value, callback) => {
    if (!/(^\d{5}$)|(^\d{15}$)/.test(value)) {
        callback(new Error("企业联系电话格式有误"))
    } else {
        callback();
    }
}


export let validateData = {
    name: [{
        required: true,
        message: "企业名称不能空",
        trigger: "blur"
    }],
    merchantType: {
        required: true,
        message: "企业主体类型不能为空",
        trigger: "blur"
    },
    merchantIdType: {
        required: true,
        message: "企业证件类型不能为空",
        trigger: "blur"
    },
    idType: {
        required: true,
        message: "证件类型不能为空",
        trigger: "blur"
    },
    licenseNo: {
        required: true,
        message: "营业执照号不能为空",
        trigger: "blur"
    },
    openAcctLicenseNo: {
        required: true,
        message: "开户许可证核准号不能为空",
        trigger: "blur"
    },
    legalName: {
        required: true,
        message: "企业法人姓名不能空",
        trigger: "blur"
    },
    legalIdNo: [{
            required: true,
            message: "企业法人身份证号码不能为空",
            trigger: "blur"
        },
        {
            validator: valideCertificateNo,
            message: "企业法人身份证号码格式有误",
            trigger: "blur"
        }
    ],
    servicePhone: [{
            required: true,
            message: "企业联系电话不能为空",
            trigger: "blur"
        },
        // {
        //     validator: zbValidePhone,
        //     trigger: "blur"
        // }
    ],

    bankName: {
        required: true,
        message: "开户行支行名称不能为空",
        trigger: "blur"
    },
    bankAccountNo: {
        required: true,
        message: "银行账号不能为空",
        trigger: "blur"
    },

    cityCode: {
        required: true,
        message: "开户行所在城市不能为空",
        trigger: "blur"
    },
    transactorName: {
        required: true,
        message: "经办人姓名不能为空",
        trigger: "blur"
    },
    transactorMobile: [{
            required: true,
            message: "经办人手机号码不能为空",
            trigger: "blur"
        },
        {
            validator: validePhone,
            message: "经办人手机号码格式有误",
            trigger: "blur"
        }
    ],
    transactorIdNo: [{
            required: true,
            message: "经办人身份证号不能为空",
            trigger: "blur"
        },
        {
            validator: valideCertificateNo,
            message: "经办人身份证号格式有误",
            trigger: "blur"
        }
    ],
    transactorEmail: [{
            required: true,
            message: "经办人电子邮箱不能为空",
            trigger: "blur"
        },
        {
            validator: zbValideEmail,
            trigger: "blur"
        }
    ],
    licensePhotoUrl: {
        required: true,
        message: "营业执照不能为空"
    }
};

export let validateFee = {
    feeType: {
        required: true,
        message: "费率类型不能为空",
        trigger: "chage"
    },
    feeMethod: {
        required: true,
        message: "收费方式不能空",
        trigger: "chage"
    },
    deductType: {
        required: true,
        message: "费用扣除方式不能空",
        trigger: "chage"
    },
    cycle: {
        required: true,
        message: "结算周期不能空",
        trigger: "chage"
    },
    fee: {
        required: true,
        message: "费率不能空"
    },
    gradientType: {
        required: true,
        message: "收费策略不能为空",
        trigger: "chage"
    }
}
export let feeType = [{
        label: "企业开户",
        value: "1"
    },
    {
        label: "个人开户",
        value: "2"
    },
    {
        label: "企业入金",
        value: "3"
    },
    {
        label: "个人入金",
        value: "4"
    },
    {
        label: "企业提现",
        value: "5"
    },
    {
        label: "个人提现",
        value: "6"
    }
];

export let cycle = [{
        label: "按月",
        value: "1"
    },
    {
        label: "按季度",
        value: "2"
    },
    {
        label: "按年",
        value: "3"
    }
];

export let cumTalbe = [{
        title: "费用类型",
        key: "typeDesc",
        render: (h, params) => {
            let label = "";
            feeType.map(v => {
                if (v.value == params.row.feeType) {
                    label = v.label;
                }
            });
            return h("span", label);
        }
    },
    {
        title: "收费方式",
        key: "feeMethodDesc",
        render: (h, params) => {
            let label = params.row.feeMethod == "1" ? "按笔" : "按比例"
            return h("span", label);
        }
    },
    {
        title: "费率",
        key: "fee",
        render: (h, params) => {
            let unit =
                params.row.feeMethod == "1" ? "元/笔" : "万分之";
            let less = "";
            let more = "";
            let interval = [];
            let arr = [];
            params.row.gradient &&
                params.row.gradient.gradients.map(v => {
                    v.type == "less" ?
                        less = `小于${v.value}; ${unit=='元/笔'?v.fee+unit:unit+v.fee}` :
                        "";
                    v.type == "more" ?
                        more = `大于${v.value}; ${unit=='元/笔'?v.fee+unit:unit+v.fee}` :
                        "";
                    v.type == "interval" ?
                        interval.push(h("p", {
                            slot: "content"
                        }, `${v.intervalValue[0] +
                            "-" +
                            v.intervalValue[1]};${unit=='元/笔'?v.fee+unit:unit+v.fee}`)) :
                        "";
                });
            arr.push(
                h("p", {
                    slot: "content"
                }, less),
                h("p", {
                    slot: "content"
                }, more),
                interval
            );
            return h("div", [
                params.row.gradientType == "1" &&
                h("span", params.row.gradient.gradients !== [] ? params.row.gradient.gradients.map(v => {
                    if (v.type == "unlimit") {
                        return v.fee
                    }
                }) : params.row.fee),
                params.row.gradientType == "2" &&
                h(
                    "Tooltip", {
                        props: {
                            placement: "top",
                            transfer: true
                        }
                    },
                    ["详情", arr]
                )
            ]);
        }
    },
    {
        title: "封顶金额(元)",
        key: "maxAmount",
        render: (h, params) => {
            return h(
                "span",
                params.row.feeMethod == "2" ?
                params.row.maxAmount :
                ""
            );
        }
    },
    {
        title: "费用扣除方式",
        key: "deductTypeDesc",
        render: (h, params) => {
            return h(
                "span",
                params.row.deductType == "1" ?
                "实时扣除" :
                "记账后收"
            );
        }
    },
    {
        title: "结算周期",
        key: "cycleDesc",
        render: (h, params) => {
            let label = "";
            cycle.map(v => {
                if (v.value == params.row.cycle) {
                    label = v.label;
                }
            });
            return h("span", label);
        }
    }
]