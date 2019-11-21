
<style lang="less" scoped>
.bold-title {
    font-size: 18px;
    font-weight: 500;
}
.pd-15 {
    padding: 15px;
}
</style>

<template>
  <Card>
    <div>
      <Spin size="large" fix v-if="loading"></Spin>
      <Card :bordered="false" dis-hover>
        <div slot="title" class="bold-title">基本信息</div>
        <div>
          <Row>
            <Col span="12" class="pd-15">
              <span class="_label">姓名：</span>
              <span>{{form.name}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">证件类型：</span>
              <span>{{form.idTypeDesc}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">身份证号：</span>
              <span>{{form.idNo}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">手机号码：</span>
              <span>{{form.mobile}}</span>
            </Col>
          </Row>
        </div>
      </Card>
      <Card :bordered="false" dis-hover>
        <div slot="title" class="bold-title">众邦账户信息</div>
        <div>
          <Row>
            <Col span="12" class="pd-15">
              <span class="_label">账户名称：</span>
              <span>{{form.accountName}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">账户类型：</span>
              <span>{{form.accountTypeDesc}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">账户号：</span>
              <span>{{form.accountNo}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">开户日期：</span>
              <span>{{form.createAt}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">账户余额：</span>
              <span>{{form.balance}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">可提现金额：</span>
              <span>{{form.withdrawBalance}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">在途金额：</span>
              <span>{{form.currentBalance}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">冻结金额：</span>
              <span>{{form.unAvailableAmount}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">账户状态：</span>
              <span>{{form.stateDesc}}</span>
            </Col>
          </Row>
        </div>
      </Card>
      <Card :bordered="false" dis-hover>
        <div slot="title" class="bold-title">绑定银行卡信息</div>
        <div>
          <Row>
            <Col span="12" class="pd-15">
              <span class="_label">账户名称：</span>
              <span>{{form.bankAccountName}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">开户行名称：</span>
              <span>{{form.bankName}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">银行账号：</span>
              <span>{{form.bankAccountNo}}</span>
            </Col>
          </Row>
        </div>
      </Card>
      <Card :bordered="false" dis-hover>
        <div slot="title" class="bold-title">证照信息</div>
        <div>
          <Row>
            <Col span="12" class="pd-15">
              <span class="_label">身份证正面：</span>
              <image-preview
                v-if="form.idFrontUrl"
                filter
                style="width:100%;height:100%;"
                :imageUrl="form.idFrontUrl"
              ></image-preview>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">身份证反面：</span>
              <image-preview
                v-if="form.idBackUrl"
                filter
                style="width:100%;height:100%;"
                :imageUrl="form.idBackUrl"
              ></image-preview>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  </Card>
</template>

<script>
import { getWalletAccountDetail } from "@/actions/wallet";
import imagePreview from "components/image-preview";
export default {
    name: "wallet-personal-account-detail",
    data() {
        return {
            loading: false,
            form: {
                name: "",
                idType: "",
                idTypeDesc: "",
                idNo: "",
                mobile: "",
                accountName: "",
                accountType: "",
                accountTypeDesc: "",
                accountNo: "",
                createAt: "",
                balance: "",
                withdrawBalance: "",
                currentBalance: "",
                unAvailableAmount: "",
                state: "",
                stateDesc: "",
                bankAccountName: "",
                bankName: "",
                bankAccountNo: "",
                idFrontUrl: "",
                idBackUrl: ""
            }
        };
    },
    activated() {
        this.loading = true;
        getWalletAccountDetail("person", this.$route.params.id).then(
            res => {
                this.loading = false;
                this.form = res.data;
            },
            () => {
                this.loading = false;
            }
        );
    },
    components: {
        imagePreview
    }
};
</script>
