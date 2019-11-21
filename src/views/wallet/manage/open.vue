
<template>
  <div class="channel-container">
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
      <FormItem label="代理商名称" prop="agentCode">
        <Select v-model="form.agentCode" clearable :disabled="disabled">
          <Option :value="item.code" v-for="item in agentArr" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="用户名称">
        <Select
          v-model="currentValue"
          clearable
          filterable
          remote
          :remote-method="search"
          :loading="selectLoad"
          @on-change="handleChange"
          :disabled="disabled"
        >
          <Option :value="item.code" v-for="item in data" :key="item.code">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <baseDetail :info="merchant" v-if="currentValue" :base="currentValue?0:1"></baseDetail>
      <div class="review-card" v-if="!currentValue">
        <FormItem label="企业名称" prop="name">
          <Input v-model="form.name"></Input>
        </FormItem>
        <FormItem label="企业主体类型" prop="merchantType">
          <Select v-model="form.merchantType" clearable>
            <Option value="1">个体工商户</Option>
            <Option value="2">企业</Option>
          </Select>
        </FormItem>
        <FormItem label="企业证件类型" prop="merchantIdType">
          <Select v-model="form.merchantIdType" clearable>
            <Option value="2">三证合一</Option>
            <Option value="0">个体工商户</Option>
            <Option value="1">三证三号</Option>
          </Select>
        </FormItem>
        <FormItem label="证件类型" prop="idType">
          <Select v-model="form.idType" clearable>
            <Option value="1">营业执照</Option>
          </Select>
        </FormItem>
        <FormItem label="社会统一信用代码/营业执照号" prop="licenseNo">
          <Input v-model="form.licenseNo" placeholder="社会统一信用代码/营业执照号"></Input>
        </FormItem>
        <FormItem label="开户许可证号" prop="openAcctLicenseNo">
          <Input v-model="form.openAcctLicenseNo" placeholder="开户许可证号"></Input>
        </FormItem>
        <FormItem label="企业法人姓名" prop="legalName">
          <Input v-model="form.legalName" placeholder="企业法人姓名"></Input>
        </FormItem>
        <FormItem label="企业法人身份证号码" prop="legalIdNo">
          <Input v-model="form.legalIdNo" placeholder="企业法人身份证号码"></Input>
        </FormItem>
        <FormItem label="企业联系电话" prop="servicePhone">
          <Input v-model="form.servicePhone" placeholder="企业联系电话"></Input>
        </FormItem>
        <h3>结算卡信息</h3>
        <FormItem label="账户名称" prop="bankAccountName">
          <Input v-model="form.bankAccountName" placeholder="账户名称"></Input>
        </FormItem>
        <FormItem label="开户行支行名称" prop="bankName">
          <bank-search-selector2
            v-model="form.bankName"
            :bankName="''"
            :callback="handleSelectBank"
          ></bank-search-selector2>
        </FormItem>
        <FormItem label="银行账号" prop="bankAccountNo">
          <Input v-model="form.bankAccountNo" placeholder="银行账号"></Input>
        </FormItem>
        <FormItem label="开户行所在城市" prop="cityCode" class="area">
          <areaSelector :provinceId.sync="form.provinceCode" :cityId.sync="form.cityCode"></areaSelector>
        </FormItem>
        <FormItem label="联行号" prop="bankNo">
          <Input v-model="form.bankNo" placeholder="联行号"></Input>
        </FormItem>
        <h3>经办人信息</h3>
        <FormItem label="经办人名称" prop="transactorName">
          <Input v-model="form.transactorName" placeholder="经办人名称"></Input>
        </FormItem>
        <FormItem label="经办人手机号码" prop="transactorMobile">
          <Input v-model="form.transactorMobile" placeholder="经办人手机号码"></Input>
        </FormItem>
        <FormItem label="经办人身份证号码" prop="transactorIdNo">
          <Input v-model="form.transactorIdNo" placeholder="经办人身份证号码"></Input>
        </FormItem>
        <FormItem label="经办人邮箱" prop="transactorEmail">
          <Input v-model="form.transactorEmail" placeholder="经办人邮箱"></Input>
        </FormItem>
        <Row>
          <Col span="8">
            <FormItem label="营业执照" :required="true">
              <ImageUpload
                :config="uploadConfig"
                v-model="licensePhotoUrl"
                :file-id="form.licensePhotoUrl"
                @on-change="handleLicensePhotoUrl"
              ></ImageUpload>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="开户许可证" :required="true">
              <ImageUpload
                :config="uploadConfig"
                v-model="openAcctPhotoUrl"
                :file-id="form.openAcctPhotoUrl"
                @on-change="handleOpenAcctPhotoUrl"
              ></ImageUpload>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="法人身份证正面" :required="true">
              <ImageUpload
                :config="uploadConfig"
                v-model="legalIdFrontUrl"
                :file-id="form.legalIdFrontUrl"
                @on-change="handleLegalIdFrontUrl"
              ></ImageUpload>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8">
            <FormItem label="法人身份证反面" :required="true">
              <ImageUpload
                :config="uploadConfig"
                v-model="legalIdBackUrl"
                :file-id="form.legalIdBackUrl"
                @on-change="handleLegalIdBackUrl"
              ></ImageUpload>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="经办人（联系人） 身份证正面" :required="true">
              <ImageUpload
                :config="uploadConfig"
                v-model="transactorIdFrontUrl"
                :file-id="form.transactorIdFrontUrl"
                @on-change="handleTransactorIdFrontUrl"
              ></ImageUpload>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="经办人（联系人） 身份证反面" :required="true">
              <ImageUpload
                :config="uploadConfig"
                v-model="transactorIdBackUrl"
                :file-id="form.transactorIdBackUrl"
                @on-change="handleTransactorIdBackUrl"
              ></ImageUpload>
            </FormItem>
          </Col>
        </Row>
      </div>
      <slot name="formItem"></slot>
      <FormItem v-if="btn">
        <Button type="primary" :loading="loading" html-type="submit">提交</Button>
        <slot></slot>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import baseDetail from "./account";
import ImagePreview from "components/image-preview";
import ImageUpload from "./image-upload";
import bankSearchSelector2 from "components/bank-search-selector2";
import agentSelector from "components/agent-selector";
import areaSelector from "components/area-selector";
import idTypeSelector from "components/id-type-selector";
import { getAgentSelectList, getBankInfoList } from "@/actions/selector";
import Cookies from "js-cookie";
import { closeCurrentErrPage, ApiUrl } from "@/constants/constant";
import { validateData } from "./validate";
import {
    getMerchantAutocomplete,
    getMerchantBasicInfo,
    handleEntOpenAccount,
    getAccountInfo,
    getAdminAccountOpenReopen
} from "@/actions/wallet";
export default {
    name: "account-manage-add",
    props: {
        id: "",
        form: {
            type: Object,
            default: {}
        },
        btn: "",
        readonly: {},
        name: ""
    },
    data() {
        return {
            // form: {},
            selectLoad: false,
            currentValue: this.value,
            spinShow: false,
            loading: false,
            agentCode: "",
            rules: {
                ...validateData
            },
            uploadConfig: {
                accept: "image/*",
                headers: {
                    Authorization: "Bearer " + Cookies.get("token")
                },
                name: "file",
                maxSize: "",
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
            readonly: false,
            data: [],
            merchant: {}
        };
    },
    mounted() {
        getAgentSelectList().then(res => {
            this.agentArr = res.data;
        });
    },
    watch: {
        form(val) {
            this.transactorIdBackUrl = val.transactorIdBackUrl;
            this.transactorIdFrontUrl = val.transactorIdFrontUrl;
            this.legalIdBackUrl = val.legalIdBackUrl;
            this.legalIdFrontUrl = val.legalIdFrontUrl;
            this.openAcctPhotoUrl = val.openAcctPhotoUrl;
            this.licensePhotoUrl = val.licensePhotoUrl;
        },
        "form.agentCode"(val) {
            this.uploadConfig.data = {
                agent_code: val
            };
        }
    },
    methods: {
        handleSelectBank(val) {
            this.form.bankId = val.licenseCode;
            this.form.bankNo = val.code;
        },
        remoteMethod(query) {
            if (query !== "") {
                this.loading = true;
                getBankInfoList({
                    name: query
                }).then(
                    res => {
                        this.loading = false;
                        this.list = res.data.rows.map(v => {
                            return {
                                value: v.code,
                                label: v.name,
                                item: v
                            };
                        });
                    },
                    err => {
                        this.loading = false;
                    }
                );
            } else {
                this.list = [];
            }
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
        handleEntOpenAccount() {
            handleEntOpenAccount(this.currentValue).then(
                res => {
                    this.loading = false; //failure_msg
                    if (res.data.failure_msg) {
                        this.$Notice.error({
                            title: "错误提示",
                            desc: `订单状态：${res.data.failure_msg}`
                        });
                    } else {
                        this.$Notice.success({
                            title: "成功提示",
                            desc: `订单状态：提交成功`
                        });
                    }
                    this.$refs.form.resetFields();
                    this.closeCurrentErrPage();
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleAccountInfo(form) {
            getAccountInfo(form).then(
                res => {
                    this.loading = false; //failure_msg
                    if (res.data.failure_code == "ERROR") {
                        this.$Notice.error({
                            title: "错误提示",
                            desc: `订单状态：${res.data.failure_msg}`
                        });
                    } else {
                        this.$Notice.success({
                            title: "成功提示",
                            desc: `订单状态：提交成功`
                        });
                    }
                    this.$refs.form.resetFields();
                    this.closeCurrentErrPage();
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleAccountOpen(form) {
            let formData = form;
            formData.accountNo = this.$route.params.id;
            getAdminAccountOpenReopen(formData).then(
                res => {
                    this.loading = false; //failure_msg
                    if (res.data.failure_code && res.data.failure_msg) {
                        this.$Notice.error({
                            title: "错误提示",
                            desc: `订单状态：${res.data.failure_msg}`
                        });
                    } else {
                        this.$Notice.success({
                            title: "成功提示",
                            desc: `订单状态：提交成功`
                        });
                    }
                    this.$refs.form.resetFields();
                    this.closeCurrentErrPage();
                },
                err => {
                    this.loading = false;
                }
            );
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    /* this.name == "again"? */

                    this.handleAccountOpen(formData);
                    // this.handleAccountInfo(formData);
                }
            });
            if (this.currentValue) {
                this.handleEntOpenAccount();
            }
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
        getMerchantBasicInfo(val) {
            this.spinShow = true;
            getMerchantBasicInfo(val, this.form.agentCode).then(res => {
                this.spinShow = false;
                this.disabled = true;
                this.merchant = res.data;
            });
        },
        search(query) {
            this.selectLoad = true;
            getMerchantAutocomplete({ value: query || "" }).then(res => {
                this.selectLoad = false;
                if (res.result) {
                    this.data = res.data.rows.map(item => {
                        return {
                            value: item.id,
                            label: item.name,
                            code: item.code
                        };
                    });
                }
            });
        },
        handleChange(val) {
            this.data.map(v => {
                if (val == v.code) {
                    this.getMerchantBasicInfo(v.code);
                }
            });
        },
        addMoreInfo(type) {
            if (this.merchantId) {
                if (!this.additinalInfo[type]) {
                    let obj = {};
                    this.additinalInfo[type] = JSON.stringify(obj);
                }
            } else {
                this.$lf.message("请先完善保存基础资料", "error");
            }
            this.$refs.circleMenu.toggle();
        },
        goInView(id) {
            document.getElementById(id) &&
                document.getElementById(id).scrollIntoView();
        },
        handleTrigger(status) {
            this.showAnchor = status;
        },
        info() {}
    },
    components: {
        agentSelector,
        ImagePreview,
        baseDetail,
        ImageUpload,
        areaSelector,
        idTypeSelector,
        bankSearchSelector2
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
</style>

