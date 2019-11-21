<template>
    <div>
        <Card class="ivu-admin__card">
            <div slot="title">账户信息</div>
            <Form
                style="max-width: 800px;"
                ref="form"
                method="post"
                :model="info"
                :label-width="150"
                label-position="right"
            >
                <h5 class="xft-form-title">基本信息</h5>
                <Row>
                    <Col span="12">
                        <FormItem label="姓名：" prop="fullName">
                            <span>{{info.name}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="身份证号码：" prop="licenseBeginDate">
                            <span>{{info.idNo}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="开户银行：">
                            <span>{{info.bankName}}</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="银行预留手机号：">
                            <span>{{info.mobile}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="银行卡号：" prop="agentId">
                            <span>{{info.bankAccountNo}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <h5 class="xft-form-title">证照信息</h5>
                <Row>
                    <Col span="8">
                        <FormItem label="身份证正面">
                            <ImagePreview :imageUrl.sync="info.idFrontUrl" />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="身份证反面">
                            <ImagePreview :imageUrl.sync="info.idBackUrl" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
    </div>
</template>

<script>
import ImagePreview from "components/image-preview";
export default {
    name: "account-info",
    components: {
        ImagePreview
    },
    props: {
        info: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            account: 0
        };
    },

    methods: {}
};
</script>

<style lang='less' >
.ivu-admin__card {
    margin-bottom: 5px;
}
</style>
