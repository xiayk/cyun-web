<template>
    <div>
        <Card>
            <p slot="title">代理商{{$route.query.title}}</p>
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
                        <FormItem label="企业名称：" prop="name">
                            <span>{{form.name}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="企业主体类型：" prop="merchantType">
                            <span>{{form.merchantTypeDesc}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="企业证件类型：" prop="merchantIdType">
                            <span>{{form.merchantIdTypeDesc}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="证件类型：" prop="idType">
                            <span>{{form.idTypeDesc}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="营业执照号：" prop="name">
                            <span>{{form.licenseNo}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开户许可证核准号：" prop="openAcctLicenseNo">
                            <span>{{form.openAcctLicenseNo}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="企业法人姓名：" prop="legalName">
                            <span>{{form.legalName}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="企业法人身份证号：" prop="legalIdNo">
                            <span>{{form.legalIdNo}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="企业联系电话：" prop="servicePhone">
                            <span>{{form.servicePhone}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">结算卡信息</h5>
                <Row>
                    <Col span="12">
                        <FormItem label="账户名称：" prop="bankAccountName">
                            <span>{{form.bankAccountName}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开户行支行名称：" prop="bankName">
                            <span>{{form.bankName}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="银行账号：" prop="bankAccountNo">
                            <span>{{form.bankAccountNo}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开户行所在城市：" prop="cityCode" class="area">
                            <span>{{form.province+form.city}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">经办人信息</h5>
                <Row>
                    <Col span="12">
                        <FormItem label="经办人姓名：" prop="transactorName">
                            <span>{{form.transactorName}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="经办人手机号码：" prop="transactorMobile">
                            <span>{{form.transactorMobile}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="经办人身份证号码：" prop="transactorIdNo">
                            <span>{{form.transactorIdNo}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="经办人邮箱：" prop="transactorEmail">
                            <span>{{form.transactorEmail}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">证照信息</h5>
                <Row>
                    <Col span="8">
                        <FormItem label="营业执照" :required="true">
                            <ImagePreview :imageUrl.sync="form.licensePhotoUrl" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="开户许可证" :required="true">
                            <ImagePreview :imageUrl.sync="form.openAcctPhotoUrl" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="法人身份证正面" :required="true">
                            <ImagePreview :imageUrl.sync="form.legalIdFrontUrl" />
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="8">
                        <FormItem label="法人身份证反面" :required="true">
                            <ImagePreview :imageUrl.sync="form.legalIdBackUrl" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="经办人（联系人） 身份证正面" :required="true">
                            <ImagePreview :imageUrl.sync="form.transactorIdFrontUrl" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="经办人（联系人） 身份证反面" :required="true">
                            <ImagePreview :imageUrl.sync="form.transactorIdBackUrl" />
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">费率信息</h5>
                <Table
                    style="margin: 25px;"
                    :loading="tableLoad"
                    border
                    stripe
                    :columns="columns"
                    :data="data"
                ></Table>
                <div style="margin: 25px;" v-if="$route.query.title == '审核'">
                    <Button type="primary" :loading="loading" @click="handleVerify('1')">审核通过</Button>
                    <Button class="mg" :loading="verifyLoading" @click="handleVerify('-1')">审核不通过</Button>
                    <Button @click="handleClosePage">取消</Button>
                </div>
            </Form>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </Card>
    </div>
</template>

<script>
import { getZbAgentAudit, getZbAgentDtail } from "@/actions/wallet";
import ImagePreview from "components/image-preview";
import agentSelector from "components/agent-selector";
import areaSelector from "components/area-selector";
import bankSearchSelector2 from "components/bank-search-selector2";
import { validateData, validateFee, cumTalbe } from "./validate";
import {
    closeCurrentErrPage,
    uploadConfig,
    ApiUrl
} from "@/constants/constant";
import { getAgentSelectList, getBankInfoList } from "@/actions/selector";
import { mapState } from "vuex";
export default {
    name: "account-manage-agent-detail",
    components: {
        agentSelector,
        ImagePreview,
        areaSelector,
        bankSearchSelector2
    },
    data() {
        return {
            form: {},
            uploadConfig: {
                ...uploadConfig,
                serviceUrl: `${ApiUrl}/zb/admin/image/upload/url`,
                type: "drag",
                format: ["jpg", "jpeg", "png"],
                data: {}
            },
            loading: false,
            list: [],
            disabled: false,
            verifyLoading: false,
            rules: {
                ...validateData
            },
            data: [],
            tableLoad: false,
            columns: [...cumTalbe],
            spinShow: true
        };
    },
    created() {
        this.getDetail();
    },
    activated() {
        this.getDetail();
    },
    watch: {},

    methods: {
        getDetail() {
            this.spinShow = true;
            let { id } = this.$route.params;
            getZbAgentDtail(id).then(
                res => {
                    let newArr = res.data.actAgentRates;
                    this.form = res.data;
                    newArr.filter(v => {
                        v.gradient !== null
                            ? v.gradient.gradients.filter(v1 => {
                                  v1.type == "interval"
                                      ? (v1.intervalValue = v1.intervalValue.split(
                                            ","
                                        ))
                                      : (v1.intervalValue = [null, null]);
                              })
                            : (v.gradient = {
                                  gradients: [
                                      {
                                          type: "unlimit",
                                          value: null,
                                          intervalValue: [null, null],
                                          fee: v.fee
                                      }
                                  ]
                              });
                    });
                    this.data = newArr;
                    this.spinShow = false;
                },
                err => {
                    this.spinShow = false;
                }
            );
        },
        handleClosePage() {
            closeCurrentErrPage(this, "account-manage-agent");
        },
        handleVerify(type) {
            let id = this.$route.params.id;
            type == "1" ? (this.loading = true) : (this.verifyLoading = true);
            getZbAgentAudit({ id, auditState: type }).then(
                res => {
                    type == "1"
                        ? (this.loading = false)
                        : (this.verifyLoading = false);
                    this.$Notice.success({
                        title: "成功提示",
                        desc: `审核状态：提交成功`
                    });
                    closeCurrentErrPage(this, "account-manage-agent");
                },
                () => {
                    type == "1"
                        ? (this.loading = false)
                        : (this.verifyLoading = false);
                }
            );
        }
    },
    computed: mapState({
        userType: state => state.user.userInfo.userType
    })
};
</script>

<style lang='less' >
.mg {
    margin: 0 5px;
}
</style>
