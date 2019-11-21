<template>
    <div>
        <Card>
            <p slot="title">支付参数</p>
            <Form
                style="max-width: 800px;"
                ref="form"
                method="post"
                @submit.prevent.native="submit"
                :model="form"
                :label-width="120"
                label-position="right"
            >
                <Row>
                    <Col span="12">
                        <FormItem>
                            <RadioGroup v-model="form.clearInstitution">
                                <Radio label="ZB">众邦银行</Radio>
                                <!-- <Radio label="2">三湘银行</Radio> -->
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="zb_private_key" prop="bankAccountName">
                    <Input v-model="form.config.zb_private_key" clearable></Input>
                </FormItem>
                <FormItem label="zb_sign_type" prop="bankAccountName">
                    <Input v-model="form.config.zb_sign_type" clearable></Input>
                </FormItem>
                <FormItem label="zb_key_id" prop="bankAccountName">
                    <Input v-model="form.config.zb_key_id" clearable></Input>
                </FormItem>
                <FormItem label="zb_mch_no" prop="bankAccountName">
                    <Input v-model="form.config.zb_mch_no" clearable></Input>
                </FormItem>
                <FormItem label="zb_pay_tenant_id" prop="bankAccountName">
                    <Input v-model="form.config.zb_pay_tenant_id" clearable></Input>
                </FormItem>
                <FormItem label="zb_sm2_public_key" prop="bankAccountName">
                    <Input v-model="form.config.zb_sm2_public_key" clearable></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" html-type="submit">保存</Button>
                    <Button @click="handleClear">取消</Button>
                </FormItem>
            </Form>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </Card>
        <div class="demo-spin-container"></div>
    </div>
</template>

<script>
import { closeCurrentErrPage } from "@/constants/constant";
import {
    getZbAdminAgentConfig,
    getZbAdminXftAgentConfig
} from "@/actions/wallet";
export default {
    name: "account-manage-agent-payment",

    data() {
        return {
            form: {
                clearInstitution: "ZB",
                id: "",
                config: {
                    zb_private_key: "",
                    zb_sign_type: "",
                    zb_key_id: "",
                    zb_mch_no: "",
                    zb_pay_tenant_id: "",
                    zb_sm2_public_key: ""
                }
            },
            loading: false,
            spinShow: false
        };
    },
    activated() {
        this.getDetail();
    },
    methods: {
        submit() {
            this.loading = true;
            let formData = this.form;
            formData.id = this.$route.params.id;
            formData.config = JSON.stringify(formData.config);
            getZbAdminAgentConfig(formData).then(
                res => {
                    this.loading = false;
                    this.$Notice.success({
                        title: "提示信息",
                        desc: "支付参数配置成功"
                    });
                    this.handleClear();
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleClear() {
            this.handleReset();
            closeCurrentErrPage(this, "account-manage-agent");
        },
        handleReset() {
            this.form.config = {
                zb_private_key: "",
                zb_sign_type: "",
                zb_key_id: "",
                zb_mch_no: "",
                zb_pay_tenant_id: "",
                zb_sm2_public_key: ""
            };
        },
        getDetail() {
            this.spinShow = true;
            getZbAdminXftAgentConfig(this.$route.params.id).then(
                res => {
                    this.spinShow = false;
                    this.from = res.data;
                    if (!res.data.config) return;
                    this.form.config = JSON.parse(res.data.config);
                },
                () => {
                    this.spinShow = false;
                }
            );
        }
    }
};
</script>

<style lang='less' >
.demo-spin-container {
    display: inline-block;
    width: 200px;
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
