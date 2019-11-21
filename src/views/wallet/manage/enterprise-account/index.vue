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
                    <FormItem label="企业名称" prop="name">
                        <Input v-model="form.name" :maxlength="50" placeholder="企业名称"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="企业主体类型" prop="merchantType">
                        <Select v-model="form.merchantType" clearable>
                            <Option value="1">个体工商户</Option>
                            <Option value="2">企业</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="企业证件类型" prop="merchantIdType">
                        <Select v-model="form.merchantIdType" clearable>
                            <Option value="2">三证合一</Option>
                            <Option value="0">个体工商户</Option>
                            <Option value="1">三证三号</Option>
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
                        <Input v-model="form.licenseNo" :maxlength="18" placeholder="营业执照号"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="开户许可证核准号" prop="openAcctLicenseNo">
                        <Input
                            v-model="form.openAcctLicenseNo"
                            :maxlength="18"
                            placeholder="开户许可证核准号"
                        ></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="企业法人姓名" prop="legalName">
                        <Input v-model="form.legalName" :maxlength="32" placeholder="企业法人姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="企业法人身份证号" prop="legalIdNo">
                        <Input v-model="form.legalIdNo" placeholder="企业法人身份证号" :maxlength="18"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="企业联系电话" prop="servicePhone">
                        <Input
                            @on-keyup="handleServicePhone"
                            :maxlength="11"
                            v-model="form.servicePhone"
                            placeholder="企业联系电话"
                        ></Input>
                    </FormItem>
                </Col>
            </Row>
            <h5 class="xft-form-title">结算卡信息</h5>
            <Row>
                <Col span="12">
                    <FormItem label="账户名称" prop="bankAccountName">
                        <Input v-model="form.bankAccountName" :maxlength="50" placeholder="账户名称"></Input>
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
                            @on-keyup="handleBankAccountNo"
                            v-model="form.bankAccountNo"
                            :maxlength="25"
                            placeholder="银行账号"
                        ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="开户行所在城市" prop="cityCode" class="area">
                        <areaSelector
                            :provinceId.sync="form.provinceCode"
                            :cityId.sync="form.cityCode"
                            class="xft-area"
                        ></areaSelector>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="联行号" prop="bankNo">
                        <Input v-model="form.bankNo" placeholder="联行号"></Input>
                    </FormItem>
                </Col>
            </Row>
            <h5 class="xft-form-title">经办人信息</h5>
            <Row>
                <Col span="12">
                    <FormItem label="经办人姓名" prop="transactorName">
                        <Input v-model="form.transactorName" :maxlength="32" placeholder="经办人姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="经办人手机号码" prop="transactorMobile">
                        <Input
                            @on-keyup="transactorMobile"
                            :maxlength="11"
                            v-model="form.transactorMobile"
                            placeholder="经办人手机号码"
                        ></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="经办人身份证号码" prop="transactorIdNo">
                        <Input :maxlength="18" v-model="form.transactorIdNo" placeholder="经办人身份证号码"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="经办人邮箱" prop="transactorEmail">
                        <Input v-model="form.transactorEmail" :maxlength="64" placeholder="经办人邮箱"></Input>
                    </FormItem>
                </Col>
            </Row>
            <h5 class="xft-form-title">证照信息</h5>
            <Row>
                <Col span="8">
                    <FormItem label="营业执照" :required="true">
                        <ImageUpload
                            :config="uploadConfig"
                            v-model="form._licensePhotoUrl"
                            :file-id="form.licensePhotoUrl"
                            @on-change="handleLicensePhotoUrl"
                            :type.sync="type"
                        ></ImageUpload>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="开户许可证" :required="true">
                        <ImageUpload
                            :config="uploadConfig"
                            v-model="form._openAcctPhotoUrl"
                            :file-id="form.openAcctPhotoUrl"
                            @on-change="handleOpenAcctPhotoUrl"
                            :type.sync="type"
                        ></ImageUpload>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="法人身份证正面" :required="true">
                        <ImageUpload
                            :config="uploadConfig"
                            v-model="form._legalIdFrontUrl"
                            :file-id="form.legalIdFrontUrl"
                            @on-change="handleLegalIdFrontUrl"
                            :type.sync="type"
                        ></ImageUpload>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <FormItem label="法人身份证反面" :required="true">
                        <ImageUpload
                            :config="uploadConfig"
                            v-model="form._legalIdBackUrl"
                            :file-id="form.legalIdBackUrl"
                            @on-change="handleLegalIdBackUrl"
                            :type.sync="type"
                        ></ImageUpload>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="经办人（联系人） 身份证正面" :required="true">
                        <ImageUpload
                            :config="uploadConfig"
                            v-model="form._transactorIdFrontUrl"
                            :file-id="form.transactorIdFrontUrl"
                            @on-change="handleTransactorIdFrontUrl"
                            :type.sync="type"
                        ></ImageUpload>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="经办人（联系人） 身份证反面" :required="true">
                        <ImageUpload
                            :config="uploadConfig"
                            v-model="form._transactorIdBackUrl"
                            :file-id="form.transactorIdBackUrl"
                            @on-change="handleTransactorIdBackUrl"
                            :type.sync="type"
                        ></ImageUpload>
                    </FormItem>
                </Col>
            </Row>

            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
                <Button @click="closeCurrentErrPage">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import {
    getMerchantAutocomplete,
    getMerchantBasicInfo,
    handleEntOpenAccount,
    getAccountInfo,
    getAdminAccountOpenReopen
} from "@/actions/wallet";
import { validateData } from "../validate";
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
import { getAgentSelectList, getBankInfoList } from "@/actions/selector";

export default {
    name: "enterprise-account",
    components: {
        agentSelector,
        ImagePreview,
        ImageUpload,
        areaSelector,
        bankSearchSelector2
    },
    props: {
        value: {
            type: Object,
            default: {}
        },
        agentCode: {
            type: String,
            default: ""
        },
        type: ""
    },
    data() {
        const bankNameVildate = (rule, value, callback) => {
            if (this.form.name !== value) {
                callback(new Error("账户名称有误"));
            } else {
                callback();
            }
        };
        return {
            rules: {
                ...validateData,
                bankAccountName: [
                    {
                        required: true,
                        message: "账户名称不能为空",
                        trigger: "blur"
                    },
                    {
                        validator: bankNameVildate,
                        trigger: "blur"
                    }
                ]
            },
            form: this.value,
            uploadConfig: {
                ...uploadConfig,
                serviceUrl: `${ApiUrl}/zb/admin/image/upload/url`,
                type: "drag",
                format: ["jpg", "jpeg", "png"],
                data: {}
            },
            agentArr: [],
            transactorIdBackUrl: "",
            transactorIdFrontUrl: "",
            legalIdBackUrl: "",
            legalIdFrontUrl: "",
            openAcctPhotoUrl: "",
            licensePhotoUrl: "",
            loading: false,
            currentValue1: "",
            list: [],
            disabled: false,
            againId: ""
        };
    },
    mounted() {
        this.form = {};
        // if (this.agentCode) {
        this.uploadConfig.data.agent_code = this.agentCode;
        // }
    },
    activated() {},
    watch: {
        value(val) {
            this.form = val;
            this.form._transactorIdBackUrl = val.transactorIdBackUrl;
            this.form._transactorIdFrontUrl = val.transactorIdFrontUrl;
            this.form._legalIdBackUrl = val.legalIdBackUrl;
            this.form._legalIdFrontUrl = val.legalIdFrontUrl;
            this.form._openAcctPhotoUrl = val.openAcctPhotoUrl;
            this.form._licensePhotoUrl = val.licensePhotoUrl;
        },
        agentCode(val) {
            this.uploadConfig.data.agent_code = val;
        }
    },
    methods: {
        handleServicePhone() {
            this.form.servicePhone = this.form.servicePhone.replace(
                /[^\d]/g,
                ""
            );
        },
        handleBankAccountNo() {
            this.form.bankAccountNo = this.form.bankAccountNo.replace(
                /[^\d]/g,
                ""
            );
        },
        transactorMobile() {
            this.form.transactorMobile = this.form.transactorMobile.replace(
                /[^\d]/g,
                ""
            );
        },
        handleSelectBank(val) {
            this.form.bankId = val.licenseCode;
            this.form.bankNo = val.code;
        },
        handleLicensePhotoUrl(val) {
            this.licensePhotoUrl = val.publicUrl;
            this.form.licensePhotoUrl = val.fileId;
        },
        handleOpenAcctPhotoUrl(val) {
            this.openAcctPhotoUrl = val.publicUrl;
            this.form.openAcctPhotoUrl = val.fileId;
        },
        handleLegalIdFrontUrl(val) {
            this.legalIdFrontUrl = val.publicUrl;
            this.form.legalIdFrontUrl = val.fileId;
        },
        handleLegalIdBackUrl(val) {
            this.legalIdBackUrl = val.publicUrl;
            this.form.legalIdBackUrl = val.fileId;
        },
        handleTransactorIdFrontUrl(val) {
            this.transactorIdFrontUrl = val.publicUrl;
            this.form.transactorIdFrontUrl = val.fileId;
        },
        handleTransactorIdBackUrl(val) {
            this.transactorIdBackUrl = val.publicUrl;
            this.form.transactorIdBackUrl = val.fileId;
        },
        closeCurrentErrPage() {
            this.form.provinceCode = "";
            this.form.cityCode = "";
            this.transactorIdBackUrl = "";
            this.transactorIdFrontUrl = "";
            this.legalIdBackUrl = "";
            this.legalIdFrontUrl = "";
            this.openAcctPhotoUrl = "";
            this.licensePhotoUrl = "";
            closeCurrentErrPage(this, "account-manage");
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let formData = this.form;
                    formData.agentCode = this.agentCode;
                    this.type == "edit"
                        ? (formData.accountNo = this.$route.params.id)
                        : "";
                    this.loading = true;
                    getAdminAccountOpenReopen(formData).then(
                        res => {
                            this.loading = false;
                            if (res.data.state == 3) {
                                this.$Notice.error({
                                    title: "错误提示",
                                    desc: `订单状态：${res.data.failure_msg}`
                                });
                            } else {
                                this.$Notice.success({
                                    title: "成功提示",
                                    desc:
                                        res.data.failure_msg ||
                                        "订单状态：提交成功"
                                });
                            }
                        },
                        err => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    }
};
</script>

<style lang='less' >
.xft-area {
    display: flex;
}
</style>
