<template>
    <div>
        <Form
            style="max-width: 800px;"
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
                    <FormItem label="姓名" prop="accountName">
                        <Input v-model="form.accountName" :maxlength="32"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="身份证号" prop="idNo">
                        <Input v-model="form.idNo" :maxlength="18"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="银行卡号" prop="bankAccountNo">
                        <Input
                            v-model="form.bankAccountNo"
                            :maxlength="25"
                            @on-keyup="handleBankAccountNo"
                        ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="开户银行" prop="bankName">
                        <bank-search-selector2
                            v-model="form.bankName"
                            :bankName="''"
                            :callback="handleSelectBank"
                        ></bank-search-selector2>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="银行预留手机号" prop="mobile">
                        <Input v-model="form.mobile" @on-keyup="handleMobile" :maxlength="11"></Input>
                    </FormItem>
                </Col>
            </Row>
            <h5 class="xft-form-title">证照信息</h5>
            <Row>
                <Col span="8">
                    <FormItem label="法人身份证正面" :required="true">
                        <ImageUpload
                            :config="uploadConfig"
                            v-model="form._idFrontUrl"
                            @on-change="idFrontUrl"
                        ></ImageUpload>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="法人身份证反面" :required="true">
                        <ImageUpload
                            :config="uploadConfig"
                            v-model="form._idBackUrl"
                            @on-change="idBackUrl"
                        ></ImageUpload>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="短信验证码" prop="smsCode">
                        <Input
                            :min="0"
                            :max="6"
                            @on-keyup="handleSmsCode"
                            v-model="form.smsCode"
                            style="width:100%;"
                        ></Input>
                    </FormItem>
                </Col>
                <!-- <Col span="4"> -->
                <Button
                    type="ghost"
                    @click="handleValidateNote"
                    style="margin-left:10px;"
                    :disabled="noteShow"
                >{{!noteShow?"获取验证码":noteTime+"秒后重新获取验证码"}}</Button>
                <!-- </Col> -->
            </Row>

            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
                <Button @click="handleCloseCurrentErrPage">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import {
    getZbAdminPersonOPen,
    getZbAdminAccountValidateCode
} from "@/actions/wallet";
import { mapState } from "vuex";
import ImagePreview from "components/image-preview";
import ImageUpload from "../image-upload";
import agentSelector from "components/agent-selector";
import areaSelector from "components/area-selector";
import bankSearchSelector2 from "components/bank-search-selector2";
import {
    closeCurrentErrPage,
    uploadConfig,
    ApiUrl
} from "@/constants/constant";
import { validatePrivate } from "../validate";
export default {
    name: "private-account",
    components: {
        agentSelector,
        ImagePreview,
        ImageUpload,
        areaSelector,
        bankSearchSelector2
    },
    props: {
        agentCode: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            rules: {
                ...validatePrivate
            },
            form: {
                smsCode: null
            },
            uploadConfig: {
                ...uploadConfig,
                serviceUrl: `${ApiUrl}/zb/admin/image/upload/url`,
                type: "drag",
                format: ["jpg", "jpeg", "png"],
                data: { agent_code: "" }
            },
            agentArr: [],
            loading: false,
            list: [],
            disabled: false,
            againId: "",
            noteTime: 360,
            noteShow: false
        };
    },
    mounted() {
        this.form._idBackUrl = "";
        this.form._idFrontUrl = "";
        this.$refs.form.resetFields();
    },
    activated() {
        this.form = { smsCode: null };
        this.$refs.form.resetFields();
    },
    watch: {
        agentCode(val) {
            this.uploadConfig.data.agent_code = val;
        }
    },

    methods: {
        idFrontUrl(val) {
            this.form.idFrontUrl = val.fileId;
        },
        idBackUrl(val) {
            this.form.idBackUrl = val.fileId;
        },
        handleSmsCode() {
            this.form.smsCode = this.form.smsCode.replace(/[^\d]/g, "");
        },
        handleBankAccountNo() {
            this.form.bankAccountNo = this.form.bankAccountNo.replace(
                /[^\d]/g,
                ""
            );
        },
        handleMobile() {
            this.form.mobile = this.form.mobile.replace(/[^\d]/g, "");
        },
        handleCloseCurrentErrPage() {
            closeCurrentErrPage(this, "account-manage");
        },
        handleNotice(type, dsc, til) {
            type({
                title: til || "错误提示",
                desc: dsc
            });
        },
        resetNote() {
            let flag = true;
            let { idNo, accountName, bankAccountNo, mobile } = this.form;
            if (this.userType == "1") {
                if (!this.agentCode) {
                    this.handleNotice(this.$Notice.error, "所属代理商不能为空");
                    return (flag = false);
                }
            }
            if (!idNo) {
                this.handleNotice(this.$Notice.error, "身份证号不能为空");
                return (flag = false);
            }
            if (!accountName) {
                this.handleNotice(this.$Notice.error, "姓名不能为空");
                return (flag = false);
            }
            if (!bankAccountNo) {
                this.handleNotice(this.$Notice.error, "银行卡号不能为空");
                return (flag = false);
            }
            if (!mobile) {
                this.handleNotice(this.$Notice.error, "银行预留手机号不能为空");
                return (flag = false);
            }
            return (flag = true);
        },
        handleValidateNote() {
            let flag = this.resetNote();
            let {
                idNo,
                mobile,
                bankAccountNo,
                accountName,
                bankNo,
                bankName
            } = this.form;
            if (flag) {
                var _this = this;
                getZbAdminAccountValidateCode({
                    idNo,
                    mobile,
                    bankAccountNo,
                    accountName,
                    agentCode: this.agentCode,
                    bankNo,
                    bankName
                }).then(res => {
                    _this.handleNotice(
                        _this.$Notice.success,
                        "发送成功",
                        "提交成功"
                    );
                    var auth_timetimer = setInterval(() => {
                        _this.noteTime--;
                        _this.noteShow = true;
                        // console.log(_this.noteTime);
                        if (_this.noteTime <= 0) {
                            _this.noteShow = false;
                            clearInterval(auth_timetimer);
                        }
                    }, 1000);
                });
            }
        },
        handleSelectBank(val) {
            this.form.bankId = val.licenseCode;
            this.form.bankNo = val.code;
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    formData.agentCode = this.agentCode;
                    getZbAdminPersonOPen(formData).then(
                        res => {
                            let { failure_msg, failure_code, state } = res.data;
                            this.loading = false;
                            if (!failure_msg && !failure_code) {
                                if (state !== "3") {
                                    this.handleNotice(
                                        this.$Notice.success,
                                        "提交成功",
                                        "订单状态：成功提示"
                                    );
                                    this.handleCloseCurrentErrPage();
                                    this.$refs.form.resetFields();
                                }
                            } else {
                                this.handleNotice(
                                    this.$Notice.error,
                                    "订单状态：" + failure_msg,
                                    "错误提示"
                                );
                            }
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    },
    computed: mapState({
        userType: state => state.user.userInfo.userType
    })
};
</script>

<style lang='less' >
</style>
