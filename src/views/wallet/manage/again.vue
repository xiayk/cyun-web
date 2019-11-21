
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
                                <Radio label="1" disabled>个人账户</Radio>
                                <Radio label="2" disabled>企业账户</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="所属代理商" prop="agentCode">
                            <zbAgentSelector all :account="agentObj" v-model="form.agentCode"></zbAgentSelector>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <enterpriseAccount type="edit" v-model="form" :agent-code.sycn="form.agentCode"></enterpriseAccount>
        </Card>
    </div>
</template>

<script>
import {
    getMerchantAutocomplete,
    getWalletAccountDetail,
    handleEntOpenAccount
} from "@/actions/wallet";
import ImagePreview from "components/image-preview";
import privateAccount from "./private-account";
import enterpriseAccount from "./enterprise-account";
import { validateData } from "./validate";
import { getAgentSelectList } from "@/actions/selector";
import { closeCurrentErrPage } from "@/constants/constant";
import zbAgentSelector from "components/zb-agent-selector";
export default {
    name: "account-manage-again",
    data() {
        return {
            merchantId: "",
            showAnchor: true,
            baseInfo: {},
            form: {},
            selectLoad: false,
            currentValue: this.value,
            data: [],
            spinShow: false,
            loading: false,
            readonly: false,
            agentId: "",
            rules: {
                ...validateData
            },
            agentArr: [],
            accountType: "2",
            agentObj: {}
        };
    },
    watch: {
        agentId(val) {}
    },
    activated() {
        let merchantCode = this.$route.params.id;
        this.getWalletAccountDetail(merchantCode);
        this.info();
    },
    methods: {
        handleAgain(val) {
            this.agentArr.filter(v => {
                if (val == v.code) {
                    this.againId = v.id;
                }
            });
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    this.currentValue ? "" : this.handleAccountInfo(formData);
                }
            });
            if (this.currentValue) {
                this.handleEntOpenAccount();
            }
        },
        handleEntOpenAccount() {},
        closeCurrentErrPage() {
            closeCurrentErrPage(this, "account-manage");
        },
        getWalletAccountDetail(val) {
            this.spinShow = true;
            getWalletAccountDetail("ent", val).then(res => {
                this.spinShow = false;
                this.form = res.data;
                // this.form.legalIdNo = Number(res.data.legalIdNo);
                // this.form.servicePhone = Number(res.data.servicePhone);
                // this.form.bankAccountNo = Number(res.data.bankAccountNo);
                // this.form.transactorMobile = Number(res.data.transactorMobile);
                // this.form.transactorIdNo = Number(res.data.transactorIdNo);
            });
        },

        info() {
            getAgentSelectList().then(res => {
                this.agentArr = res.data;
            });
        }
    },
    components: {
        privateAccount,
        ImagePreview,
        // openDetail,
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
</style>

