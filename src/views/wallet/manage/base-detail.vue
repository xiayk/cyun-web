<template>
    <div>
        <Card class="ivu-admin__card">
            <div slot="title">账户信息</div>
            <Form
                style="max-width: 800px;"
                ref="form"
                method="post"
                :model="info"
                :label-width="120"
                label-position="right"
                v-if="info"
            >
                <!-- <FormItem label="代理商名称" prop="agentCode">
                    <Select v-model="info.agentCode" clearable disabled>
                        <Option
                            :value="item.code"
                            v-for="item in agentArr"
                            :key="item.code"
                        >{{ item.name }}</Option>
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
                        disabled
                    >
                        <Option
                            :value="item.code"
                            v-for="item in data"
                            :key="item.code"
                        >{{ item.label }}</Option>
                    </Select>
                </FormItem>-->
                <!-- <baseDetail :info="merchant" v-if="currentValue" :base="currentValue?0:1"></baseDetail> -->
                <div class="review-card" v-if="!currentValue">
                    <h5 class="xft-form-title">基本信息</h5>
                    <Row>
                        <Col span="12">
                            <FormItem label="企业名称：" prop="name">
                                <span>{{info.name}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="企业主体类型：" prop="merchantType">
                                <span>{{info.merchantTypeDesc}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="企业证件类型：" prop="merchantIdType">
                                <span>{{info.merchantIdTYpeDesc}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="证件类型：" prop="idType">
                                <span>{{info.idTypeDesc}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="营业执照号：" prop="licenseNo">
                                <span>{{info.licenseNo}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="开户许可证核准号：" prop="openAcctLicenseNo">
                                <span>{{info.openAcctLicenseNo}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="企业法人姓名：" prop="legalName">
                                <span>{{info.legalName}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="企业法人身份证号码：" prop="legalIdNo">
                                <span>{{info.legalIdNo}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="企业联系电话：" prop="servicePhone">
                                <span>{{info.servicePhone}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                    <h5 class="xft-form-title">结算卡信息</h5>
                    <Row>
                        <Col span="12">
                            <FormItem label="账户名称：" prop="bankAccountName">
                                <span>{{info.bankAccountName}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="开户行支行名称：" prop="bankName">
                                <span>{{info.bankName}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="银行账号：" prop="bankAccountNo">
                                <span>{{info.bankAccountNo}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="开户行所在省份：" prop="cityCode" class="area">
                                <span>{{info.province}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="开户行所在城市：" prop="cityCode" class="area">
                                <span>{{info.city}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="联行号：" prop="bankNo">
                                <span>{{info.bankNo}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <h5 class="xft-form-title">经办人信息</h5>
                    <Row>
                        <Col span="12">
                            <FormItem label="经办人名称：" prop="transactorName">
                                <span>{{info.transactorName}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="经办人手机号：" prop="transactorMobile">
                                <span>{{info.transactorMobile}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="经办人身份证号码：" prop="transactorIdNo">
                                <span>{{info.transactorIdNo}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="经办人邮箱：" prop="transactorEmail">
                                <span>{{info.transactorEmail}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <h5 class="xft-form-title">证照信息</h5>
                    <Row>
                        <Col span="8">
                            <FormItem label="营业执照">
                                <ImagePreview :imageUrl.sync="info.licensePhotoUrl" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="开户许可">
                                <ImagePreview :imageUrl.sync="info.openAcctPhotoUrl" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="法人身份证正面">
                                <ImagePreview :imageUrl.sync="info.legalIdFrontUrl" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="经办人身份证正面">
                                <ImagePreview :imageUrl.sync="info.transactorIdFrontUrl" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="经办人身份证反面">
                                <ImagePreview :imageUrl.sync="info.transactorIdBackUrl" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="法人身份证反面">
                                <ImagePreview :imageUrl.sync="info.legalIdBackUrl" />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <slot></slot>
            </Form>
        </Card>
    </div>
</template>

<script>
import ImagePreview from "components/image-preview";
import bankSearchSelector2 from "components/bank-search-selector2";
import agentSelector from "components/agent-selector";
import areaSelector from "components/area-selector";
import idTypeSelector from "components/id-type-selector";
import { getAgentSelectList, getBankInfoList } from "@/actions/selector";
export default {
    name: "account-manage-detail",
    components: {
        ImagePreview,
        idTypeSelector,
        areaSelector,
        agentSelector,
        bankSearchSelector2
    },
    props: {
        info: {
            type: Object,
            default: {}
        }
    },
    mounted() {
        getAgentSelectList().then(res => {
            this.agentArr = res.data;
        });
    },
    data() {
        return {
            account: 0,
            currentValue: "",
            agentArr: [],
            data: [],
            merchant: {},
            selectLoad: false
        };
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
        handleChange(val) {
            this.data.map(v => {
                if (val == v.code) {
                    this.getMerchantBasicInfo(v.code);
                }
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
        getMerchantBasicInfo(val) {
            this.spinShow = true;
            getMerchantBasicInfo(val, this.form.agentCode).then(res => {
                this.spinShow = false;
                this.disabled = true;
                this.merchant = res.data;
            });
        }
    },
    activated() {}
};
</script>

<style lang='less' >
.ivu-admin__card {
    margin-bottom: 5px;
}
.ivu-select-disabled .ivu-select-selection {
    background-color: #fff;
    opacity: 1;
    cursor: not-allowed;
    color: #495060;
}
.ivu-input[disabled] {
    background-color: #fff;
    opacity: 1;
    cursor: not-allowed;
    color: #495060;
}
.ivu-select-input[disabled] {
    cursor: not-allowed;
    color: #495060;
}
.area {
    .ivu-row {
        display: flex;
    }
}
</style>
