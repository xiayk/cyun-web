
<template>
    <div class="channel-container">
        <Card>
            <p slot="title">开通钱包账户</p>
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
                <Row>
                    <Col span="12">
                        <FormItem label="开通账户类型">
                            <RadioGroup v-model="accountType">
                                <Radio label="1">个人账户</Radio>
                                <Radio label="2">企业账户</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="所属代理商" :prop="userType=='1'?'agentCode':''">
                            <!-- <Select v-model="form.agentCode" clearable @on-change="handleAgain">
                                <Option
                                    :value="item.code"
                                    v-for="item in agentArr"
                                    :key="item.code"
                                >{{ item.name }}</Option>
                            </Select>-->
                            <zbAgentSelector all :account="agentObj" v-model="form.agentCode"></zbAgentSelector>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <privateAccount v-if="accountType == '1'" :agent-code.sycn="form.agentCode"></privateAccount>
            <enterpriseAccount type="add" v-else :agent-code.sycn="form.agentCode" v-model="form"></enterpriseAccount>
        </Card>
    </div>
</template>

<script>
import privateAccount from "./private-account";
import enterpriseAccount from "./enterprise-account";
import { mapState } from "vuex";
import {
    getMerchantAutocomplete,
    getMerchantBasicInfo,
    handleEntOpenAccount,
    getAccountInfo
} from "@/actions/wallet";
import ImagePreview from "components/image-preview";
import ImageUpload from "./image-upload";
import agentSelector from "components/agent-selector";
import areaSelector from "components/area-selector";
import baseDetail from "./account";
import Cookies from "js-cookie";
import { validateData } from "./validate";
import { closeCurrentErrPage, ApiUrl } from "@/constants/constant";
import idTypeSelector from "components/id-type-selector";
import { getAgentSelectList, getBankInfoList } from "@/actions/selector";
import bankSearchSelector2 from "components/bank-search-selector2";
import zbAgentSelector from "components/zb-agent-selector";
export default {
    name: "account-manage-add",
    data() {
        return {
            merchantId: "",
            showAnchor: true,
            baseInfo: {},
            additinalInfo: {
                h5: "",
                app: "",
                parking: "",
                school: "",
                lite: "",
                officeAccount: "",
                wechatReplenish: ""
            },
            form: {
                agentCode: "",
                legalIdNo: null,
                servicePhone: null,
                bankAccountNo: null,
                transactorMobile: null,
                transactorIdNo: null
            },
            selectLoad: false,
            currentValue: this.value,
            data: [],
            spinShow: false,
            loading: false,
            readonly: false,
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
            loading: false,
            list: [],
            disabled: false,
            againId: "",
            agentObj: {},
            accountType: "1"
        };
    },
    mounted() {
        this.currentValue = "";
        this.form = {};
    },
    activated() {
        this.form = {};
    },
    watch: {},
    methods: {
        handleAgain(val) {
            this.agentArr.filter(v => {
                if (val == v.code) {
                    this.againId = v.id;
                }
            });
        },
        handleSelectBank(val) {
            this.form.bankId = val.licenseCode;
            this.form.bankNo = val.code;
        }
    },
    computed: mapState({
        userType: state => state.user.userInfo.userType
    }),
    components: {
        agentSelector,
        ImagePreview,
        baseDetail,
        ImageUpload,
        areaSelector,
        idTypeSelector,
        bankSearchSelector2,
        privateAccount,
        enterpriseAccount,
        zbAgentSelector
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

