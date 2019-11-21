
<template>
    <div class="channel-container">
        <Card>
            <p slot="title">创建代理商</p>
            <Form
                style="max-width: 900px;"
                ref="form"
                method="post"
                @submit.prevent.native="submit"
                :model="form"
                :label-width="120"
                label-position="right"
                :rules="rules"
            >
                <h5 class="xft-form-title">基本信息</h5>
                <Row>
                    <Col span="12">
                        <FormItem label="企业名称" prop="name">
                            <Input v-model="form.name" :maxlength="50" clearable></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="企业主体类型" prop="merchantType">
                            <Select v-model="form.merchantType" clearable>
                                <Option value="2">商业公司</Option>
                                <Option value="1">个体工商户</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="企业证件类型" prop="merchantIdType">
                            <Select v-model="form.merchantIdType" clearable>
                                <Option value="2">三证合一</Option>
                                <!-- <Option value="0">个体工商户</Option>
                                <Option value="1">三证三号</Option>-->
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="证件类型" prop="idType">
                            <Select v-model="form.idType" clearable>
                                <Option value="1">营业执照</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="营业执照号" prop="licenseNo">
                            <Input v-model="form.licenseNo" :maxlength="18" clearable></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开户许可证核准号" prop="openAcctLicenseNo">
                            <Input v-model="form.openAcctLicenseNo" :maxlength="18" clearable></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="企业法人姓名" prop="legalName">
                            <Input v-model="form.legalName" :maxlength="32" clearable></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="企业法人身份证号" prop="legalIdNo">
                            <Input
                                style="width:100%;"
                                v-model="form.legalIdNo"
                                :maxlength="18"
                                clearable
                            ></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="企业联系电话" prop="servicePhone">
                            <Input
                                v-model="form.servicePhone"
                                :maxlength="11"
                                clearable
                                @on-keyup="handleServicePhone"
                            ></Input>
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">结算卡信息</h5>
                <Row>
                    <Col span="12">
                        <FormItem label="账户名称" prop="bankAccountName">
                            <Input v-model="form.bankAccountName" :maxlength="50" clearable></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开户行支行名称" prop="bankName">
                            <bank-search-selector2
                                v-model="form.bankName"
                                :bankName="''"
                                :callback="handleSelectBank"
                                :splices="20"
                            ></bank-search-selector2>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="银行账号" prop="bankAccountNo">
                            <Input
                                v-model="form.bankAccountNo"
                                :maxlength="50"
                                clearable
                                @on-keyup="handleBankAccountNo"
                            ></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开户行所在城市" prop="cityCode" class="area">
                            <areaSelector
                                :provinceId.sync="form.provinceCode"
                                :cityId.sync="form.cityCode"
                            ></areaSelector>
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">经办人信息</h5>
                <Row>
                    <Col span="12">
                        <FormItem label="经办人姓名" prop="transactorName">
                            <Input v-model="form.transactorName" :maxlength="32" clearable></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="经办人手机号码" prop="transactorMobile">
                            <Input
                                style="width:100%;"
                                v-model="form.transactorMobile"
                                :maxlength="11"
                                clearable
                                @on-keyup="handleTransactorMobile"
                            ></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="经办人身份证号码" prop="transactorIdNo">
                            <Input v-model="form.transactorIdNo" :maxlength="18" clearable></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="经办人邮箱" prop="transactorEmail">
                            <Input v-model="form.transactorEmail" :maxlength="64" clearable></Input>
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">证照信息</h5>
                <Row>
                    <Col span="8">
                        <FormItem label="营业执照" :required="true">
                            <ImageUpload :config="uploadConfig" v-model="form.licensePhotoUrl"></ImageUpload>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="开户许可证" :required="true">
                            <ImageUpload :config="uploadConfig" v-model="form.openAcctPhotoUrl"></ImageUpload>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="法人身份证正面" :required="true">
                            <ImageUpload :config="uploadConfig" v-model="form.legalIdFrontUrl"></ImageUpload>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="8">
                        <FormItem label="法人身份证反面" :required="true">
                            <ImageUpload :config="uploadConfig" v-model="form.legalIdBackUrl"></ImageUpload>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="经办人（联系人） 身份证正面" :required="true">
                            <ImageUpload :config="uploadConfig" v-model="form.transactorIdFrontUrl"></ImageUpload>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="经办人（联系人） 身份证反面" :required="true">
                            <ImageUpload :config="uploadConfig" v-model="form.transactorIdBackUrl"></ImageUpload>
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">费率信息</h5>
                <div class="xft-form-table">
                    <Button type="primary" class="xft-btn" @click="handleFeeAdd">新增</Button>
                    <Table :loading="tableLoad" border stripe :columns="columns" :data="data"></Table>
                </div>

                <FormItem>
                    <Button type="primary" :loading="loading" html-type="submit">提交</Button>
                    <Button @click="handleSettleState(false)">取消</Button>
                </FormItem>
            </Form>
        </Card>
        <Modal v-model="feeShow" title="费率信息">
            <Form
                ref="feeData"
                method="post"
                @submit.prevent.native="handleFeeInfo"
                :model="feeData"
                :label-width="120"
                label-position="right"
                :rules="feeRules"
            >
                <FormItem label="费用类型" prop="feeType">
                    <Select v-model="feeData.feeType" clearable @on-change="handleFeeType">
                        <Option
                            :value="item.value"
                            v-for="item in feeType"
                            :key="item.value"
                        >{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="费用扣除方式" prop="deductType" v-if="feeData.feeType">
                    <Select v-model="feeData.deductType" clearable>
                        <Option v-if="openShow" value="1">实时扣除</Option>
                        <Option value="2">记账后收</Option>
                    </Select>
                </FormItem>
                <FormItem label="收费方式" prop="feeMethod" v-if="feeData.feeType">
                    <Select v-model="feeData.feeMethod" clearable>
                        <Option value="1">按笔</Option>
                        <Option value="2" v-if="openShow">按比例</Option>
                    </Select>
                </FormItem>

                <FormItem label="结算周期" prop="cycle">
                    <Select v-model="feeData.cycle" clearable>
                        <Option
                            :value="item.value"
                            v-for="item in cycle"
                            :key="item.value"
                        >{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="收费策略" prop="gradientType" v-if="feeData.feeType">
                    <Select v-model="feeData.gradientType" clearable @on-change="handleChange">
                        <Option value="1">固定收费</Option>
                        <Option value="2" v-if="openShow">按阶梯收费</Option>
                    </Select>
                </FormItem>
                <FormItem label="封顶金额" v-if="feeData.feeMethod && feeData.feeMethod !== '1'">
                    <InputNumber v-model="feeData.maxAmount" clearable style="width:100%;"></InputNumber>
                </FormItem>
                <FormItem label="收费金额" required v-show="feeData.gradientType">
                    <template v-for="(item,index) in gradient" class="flex_between">
                        <feeInfo
                            ref="feeItem"
                            :key="index"
                            v-model="gradient[index]"
                            :gradientType.sync="feeData.gradientType"
                            :feeMethod.sync="feeData.feeMethod"
                            :itemIndex.sync="index"
                            @on-click="deleteItem"
                            :callback="handleItem"
                            :type.sync="disabObj"
                        ></feeInfo>
                    </template>
                </FormItem>
                <Row
                    type="flex"
                    justify="end"
                    class="code-row-bg"
                    v-if="feeData.gradientType == '2'"
                >
                    <Button type="dashed" @click="addItem">添加阶梯收费规则</Button>
                </Row>

                <FormItem>
                    <Button type="primary" :loading="loading" html-type="submit">提交</Button>
                    <Button @click="handleSettleState(false)">取消</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { getZbAgentCreateOrEdit } from "@/actions/wallet";
import ImagePreview from "components/image-preview";
import ImageUpload from "components/image-upload";
import agentSelector from "components/agent-selector";
import areaSelector from "components/area-selector";
import Cookies from "js-cookie";
import {
    validateData,
    validateFee,
    cycle,
    feeType,
    cumTalbe
} from "./validate";
import { closeCurrentErrPage, uploadConfig } from "@/constants/constant";
import idTypeSelector from "components/id-type-selector";
import { getAgentSelectList, getBankInfoList } from "@/actions/selector";
import bankSearchSelector2 from "components/bank-search-selector2";
import feeInfo from "./less";
export default {
    name: "account-manage-agent-add",
    data() {
        let vaildName = (rule, value, callback) => {
            if (value !== this.form.name) {
                callback(new Error("账户名称有误"));
            } else {
                callback();
            }
        };
        return {
            form: {},
            data: [],
            loading: false,
            readonly: false,
            rules: {
                ...validateData,
                bankAccountName: [
                    {
                        required: true,
                        message: "账户名称不能为空",
                        trigger: "blur"
                    },
                    {
                        validator: vaildName,
                        trigger: "blur"
                    }
                ]
            },
            uploadConfig: {
                ...uploadConfig,
                type: "drag",
                format: ["jpeg", "jpg", "bmp", "png"],
                data: {}
            },
            disabled: false,
            tableLoad: false,
            columns: [
                ...cumTalbe,
                {
                    title: "操作",
                    type: "action",
                    width: 180,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.tableLoad = true;
                                            this.data.splice(params.index, 1);
                                            this.tableLoad = false;
                                            this.$Notice.success({
                                                title: "成功提示",
                                                desc: "删除成功"
                                            });
                                        }
                                    }
                                },
                                "删除"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.feeTitle = "edit";
                                            this.tableIndex = params.index;
                                            this.feeData = Object.assign(
                                                {},
                                                params.row
                                            );
                                            this.gradient = JSON.parse(
                                                JSON.stringify(
                                                    params.row.gradient
                                                        .gradients
                                                )
                                            );
                                            this.handleSettleState(true);
                                        }
                                    }
                                },
                                "编辑"
                            )
                        ]);
                    }
                }
            ],
            tableIndex: 0,
            data: [],
            feeShow: false,
            feeData: {
                fee: null,
                maxAmount: 0.01
            },
            feeTitle: "add",
            feeRules: {
                ...validateFee
            },
            gradient: [
                {
                    type: "",
                    value: null,
                    intervalValue: [null, null],
                    fee: null
                }
            ],
            openShow: false,
            disabObj: {}
        };
    },
    watch: {
        "feeData.feeType"(val) {
            val == "1"
                ? (this.openShow = false)
                : val == "2"
                ? (this.openShow = false)
                : (this.openShow = true);
        }
    },
    computed: {
        feeType() {
            return feeType;
        },
        cycle() {
            return cycle;
        }
    },
    mounted() {},
    methods: {
        handleFeeType(val) {
            if (val == "1" || val == "2") {
                this.openShow = false;
                this.feeData.deductType = "";
                this.feeData.feeMethod = "";
                this.feeData.gradientType = "";
            } else {
                this.openShow = true;
            }
            // val == "1"
            //     ? (this.openShow = false)
            //     : val == "2"
            //     ? (this.openShow = false)
            //     : (this.openShow = true);
        },
        handleItem(item) {
            if (item.type == "unlimit") {
                this.feeData.fee = item.fee;
            } else {
                this.feeData.fee = 0;
            }
        },
        handleChange(value) {
            this.gradient = [
                {
                    type: "",
                    value: null,
                    intervalValue: [null, null],
                    fee: null
                }
            ];
        },
        deleteItem(index) {
            this.gradient.splice(index, 1);
            this.gradient &&
                this.gradient.map(v => {
                    if (v.type == "less") {
                        this.disabObj.less = true;
                    } else {
                        this.disabObj.less = false;
                    }
                    if (v.type == "more") {
                        this.disabObj.more = true;
                    } else {
                        this.disabObj.more = false;
                    }
                });
        },
        feeInfoToast() {
            this.$Modal.error({
                title: "配置费率错误",
                content: `<p class="toastTitle">费率配置错误</p> 
                <p class="err">请配置正确的费率后或再次提交</p> `
            });
        },
        handleCheck(state) {
            let flag = true,
                { type, intervalValue, value, fee } = this.gradient[
                    this.gradient.length - 1
                ],
                { feeData, data, feeTitle, tableIndex } = this;
            if (!type) {
                this.feeInfoToast();
                return (flag = false);
            }
            if (type == "less" && !value) {
                this.feeInfoToast();
                return (flag = false);
            }
            if (type == "less" && !fee) {
                this.feeInfoToast();
                return (flag = false);
            }
            if (type == "more" && !value) {
                this.feeInfoToast();
                return (flag = false);
            }

            if (type == "more" && !fee) {
                this.feeInfoToast();
                return (flag = false);
            }

            if (type == "unlimit" && !fee) {
                this.feeInfoToast();
                return (flag = false);
            }

            if (type == "interval" && !fee) {
                this.feeInfoToast();
                return (flag = false);
            }
            if (type == "interval") {
                if (!intervalValue[0] && !intervalValue[1]) {
                    this.feeInfoToast();
                    return (flag = false);
                }
            }
            if (state == "add" && feeTitle !== "edit") {
                data.map(v => {
                    if (v.feeType.includes(feeData.feeType)) {
                        this.feeInfoToast();
                        return (flag = false);
                    }
                });
            } else {
                let newArr = Object.assign([], data);
                newArr.slice(0, tableIndex).map(v => {
                    if (v.feeType.includes(feeData.feeType)) {
                        this.feeInfoToast();
                        return (flag = false);
                    }
                });
                return flag;
            }

            return (flag = true);
        },
        addItem() {
            let flag = this.handleCheck();
            if (flag) {
                this.gradient.push({
                    type: "",
                    value: null,
                    intervalValue: [null, null],
                    fee: null
                });
            }
            this.gradient.forEach(v => {
                if (v.type == "less") {
                    this.disabObj.less = true;
                }
                if (v.type == "more") {
                    this.disabObj.more = true;
                }
            });
        },
        handleFeeInfo(item) {},
        /**
         * 银行账号  限制只能输入数字;
         */
        handleBankAccountNo() {
            this.form.bankAccountNo = this.form.bankAccountNo.replace(
                /[^\d]/g,
                ""
            );
        },
        handleServicePhone() {
            this.form.servicePhone = this.form.servicePhone.replace(
                /[^\d]/g,
                ""
            );
        },
        handleTransactorMobile() {
            this.form.transactorMobile = this.form.transactorMobile.replace(
                /[^\d]/g,
                ""
            );
        },
        handleSelectBank(val) {
            this.form.bankId = val.licenseCode;
            this.form.bankNo = val.code;
        },
        handleSettleState(state) {
            this.feeShow = state;
        },
        // 提交费率信息
        handleFeeInfo() {
            let { feeTitle, gradient, feeData, tableIndex } = this;
            let flag = this.handleCheck("add"),
                _this = this;
            this.$refs.feeData.validate(valid => {
                if (valid && flag) {
                    var form = feeData;
                    form.feeMethod == "1"
                        ? (form.maxAmount = 0)
                        : form.maxAmount;
                    form.gradient.gradients = gradient;
                    if (feeTitle == "add") {
                        _this.data.push(form);
                    } else {
                        // _this.data[tableIndex] = form;
                        this.$set(_this.data, tableIndex, form);
                    }
                    this.handleSettleState(false);
                    this.disabObj = {};
                }
            });
        },
        handleFeeAdd() {
            this.handleSettleState(true);
            this.feeTitle = "add";
            this.resetFields();
        },
        resetFields() {
            this.feeData = {
                cycle: "",
                deductType: "",
                gradient: {},
                feeMethod: "",
                feeType: "",
                maxAmount: 0.01,
                fee: null
            };
            this.gradient = [
                {
                    type: "",
                    value: null,
                    intervalValue: [null, null],
                    fee: null
                }
            ];
        },

        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // if (!this.data.length) {
                    //     this.$Notice.error({
                    //         title: "错误信息",
                    //         desc: "费率信息不能为空"
                    //     });
                    //     return;
                    // }
                    this.loading = true;
                    let formData = this.form;
                    formData.actAgentRates = JSON.parse(
                        JSON.stringify(this.data)
                    );
                    formData.actAgentRates.map(v => {
                        v.fee == null ? 0 : v.fee;
                        v.maxAmount == null ? (v.maxAmount = 0) : v.maxAmount;
                        if (v.gradientType == "1") {
                            v.fee = v.gradient.gradients[0].fee;
                            v.gradient.gradients = [];
                        }
                        v.gradient.gradients &&
                            v.gradient.gradients.filter(v1 => {
                                v1.type == "interval"
                                    ? (v1.intervalValue = v1.intervalValue.join())
                                    : (v1.intervalValue = "");
                            });
                    });
                    getZbAgentCreateOrEdit("create", formData).then(
                        res => {
                            this.loading = false;
                            this.$Notice.success({
                                title: "提示信息",
                                desc: "代理商创建成功"
                            });
                            this.$refs.form.resetFields();
                            this.handlePageBack();
                        },
                        err => {
                            this.loading = false;
                        }
                    );
                }
            });
        },
        handlePageBack() {
            this.form = {};
            this.data = [];
            closeCurrentErrPage(this, "account-manage-agent");
        }
    },
    components: {
        agentSelector,
        ImagePreview,
        ImageUpload,
        areaSelector,
        idTypeSelector,
        bankSearchSelector2,
        feeInfo
    }
};
</script>
<style lang="less">
.channel-container {
    position: relative;
}
.channel-anchor {
    position: fixed;
    top: 120px;
    right: 10px;
    z-index: 9999;
}
.oy-menu-group {
    float: none;
    text-align: center;
}
.ft-c-white {
    color: #fff;
    cursor: pointer;
}
.area {
    .ivu-row {
        display: flex;
    }
}
// .xft-form-title {
//     height: 45px;
//     line-height: 45px;
//     background: #eee;
//     padding-left: 25px;
//     margin: 25px 0 25px 25px;
// }

.xft-form-table {
    margin: 25px;
    .xft-btn {
        margin: 0 15px 15px 15px;
    }
}
.ivu-row-icon {
    align-items: center;
    display: flex;
    width: 19px;
}
.p {
    padding: 0 5px;
}

.flex_between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.m-10 {
    margin: 0 10px;
}
.toastTitle {
    font-size: 16px;
    font-weight: 900;
}
.err {
    color: red;
}
</style>

