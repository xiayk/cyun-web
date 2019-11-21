<template>
  <div class="review-card">
    <FormItem label="营业执照注册号：" prop="fullName">
      <Input disabled v-model="info.licenseNo" placeholder="营业执照注册号" />
    </FormItem>
    <FormItem label="开户许可证核准号：" prop="licenseBeginDate">
      <Input disabled v-model="info.openAcctLicenseNo" placeholder="开户许可证核准号" />
    </FormItem>
    <FormItem label="企业联系电话">
      <Input disabled v-model="info.servicePhone" placeholder="企业联系电话" />
    </FormItem>
    <FormItem label="经办人姓名">
      <Input disabled v-model="form.transactorName" placeholder="经办人姓名" />
    </FormItem>
    <!-- <FormItem label="所属渠道" prop="agentId">
            <agent-selector :disabled="readonly" v-model="form.agentId" :isNeed="false"></agent-selector>
    </FormItem>-->
    <FormItem label="经办人身份证号">
      <Input disabled v-model="form.transactorIdNo" placeholder="经办人身份证号"></Input>
    </FormItem>
    <FormItem label="经办人联系电话">
      <Input disabled v-model="form.transactorMobile" placeholder="经办人联系电话"></Input>
    </FormItem>
    <FormItem label="经办人电子邮箱">
      <Input disabled v-model="form.transactorEmail" placeholder="经办人电子邮箱"></Input>
    </FormItem>
    <FormItem label="银行账号名称">
      <Input disabled v-model="form.bankAccountName" placeholder="银行账号名称"></Input>
    </FormItem>
    <FormItem label="银行账号">
      <Input disabled v-model="form.bankAccountNo" placeholder="银行账号"></Input>
    </FormItem>
    <FormItem label="开户行支行名称">
      <Input disabled v-model="form.bankName" placeholder="请输入开户行名称，例：浦发银行井湾子支行"></Input>
    </FormItem>
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
  </div>
</template>

<script>
import ImagePreview from "components/image-preview";
export default {
    name: "base-detail",
    components: {
        ImagePreview
    },
    props: {
        info: {
            type: Object,
            default: {}
        },
        base: ""
    },
    data() {
        return {
            form: this.info,
            loading: false
        };
    },
    watch: {
        info(val) {
            this.form = val;
        },
        base(val) {
            console.log(val);
        }
    },
    methods: {}
};
</script>

<style lang='less' >
.review-card {
    .ivu-select-disabled .ivu-select-selection {
        background-color: #fff;
        opacity: 1;
        cursor: not-allowed;
        color: #666;
    }
    .ivu-select-input[disabled] {
        cursor: not-allowed;
        color: #666;
    }
    .ivu-icon-arrow-down-b:before {
        content: "";
    }
    .ivu-input[disabled],
    fieldset[disabled] .ivu-input {
        background-color: #fff;
        opacity: 1;
        cursor: not-allowed;
        color: #666;
    }
}
</style>
