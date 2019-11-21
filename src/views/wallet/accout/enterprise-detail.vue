
<style lang="less" scoped>
.bold-title {
    font-size: 18px;
    font-weight: 500;
}
.pd-15 {
    padding: 15px;
    img {
        width: 100%;
    }
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
              <span class="_label">企业名称：</span>
              <span>{{form.name}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">企业主体类型：</span>
              <span>{{form.merchantTypeDesc}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">企业证件类型：</span>
              <span>{{form.merchantIdTYpeDesc}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">证件类型：</span>
              <span>{{form.idTypeDesc}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">社会统一信用代码/营业执照号：</span>
              <span>{{form.licenseNo}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">开户许可证号：</span>
              <span>{{form.openAcctLicenseNo}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">企业法人姓名：</span>
              <span>{{form.legalName}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">企业法人身份证号码：</span>
              <span>{{form.legalIdNo}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">企业联系电话：</span>
              <span>{{form.servicePhone}}</span>
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
            <Col span="12" class="pd-15">
              <span class="_label">开户行所在省份：</span>
              <span>{{form.province}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">开户行所在城市：</span>
              <span>{{form.city}}</span>
            </Col>
          </Row>
        </div>
      </Card>
      <Card :bordered="false" dis-hover>
        <div slot="title" class="bold-title">经办人信息</div>
        <div>
          <Row>
            <Col span="12" class="pd-15">
              <span class="_label">经办人姓名：</span>
              <span>{{form.transactorName}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">经办人手机号码：</span>
              <span>{{form.transactorMobile}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">经办人身份证号码：</span>
              <span>{{form.transactorIdNo}}</span>
            </Col>
            <Col span="12" class="pd-15">
              <span class="_label">经办人邮箱：</span>
              <span>{{form.transactorEmail}}</span>
            </Col>
          </Row>
        </div>
      </Card>
      <Card :bordered="false" dis-hover>
        <div slot="title" class="bold-title">证照信息</div>
        <div>
          <Row type="flex" justify="start">
            <Col span="6" class="pd-15">
              <span class="_label">营业执照：</span>
              <image-preview
                filter
                style="width:100%;height:100%;"
                :imageUrl="form.licensePhotoUrl"
              ></image-preview>
            </Col>
            <Col span="6" class="pd-15">
              <span class="_label">开户许可证：</span>
              <image-preview
                filter
                style="width:100%;height:100%;"
                :imageUrl="form.openAcctPhotoUrl"
              ></image-preview>
            </Col>
            <Col span="6" class="pd-15">
              <span class="_label">法人身份证正面：</span>
              <image-preview
                filter
                style="width:100%;height:100%;"
                :imageUrl="form.legalIdFrontUrl"
              ></image-preview>
            </Col>
            <Col span="6" class="pd-15">
              <span class="_label">法人身份证反面：</span>
              <image-preview filter style="width:100%;height:100%;" :imageUrl="form.legalIdBackUrl"></image-preview>
            </Col>
            <Col span="6" class="pd-15">
              <span class="_label">经办人身份证正面：</span>
              <image-preview
                filter
                style="width:100%;height:100%;"
                :imageUrl="form.transactorIdFrontUrl"
              ></image-preview>
            </Col>
            <Col span="6" class="pd-15">
              <span class="_label">经办人身份证反面：</span>
              <image-preview
                filter
                style="width:100%;height:100%;"
                :imageUrl="form.transactorIdBackUrl"
              ></image-preview>
            </Col>
            <!-- <Col span="8" class="pd-15">
              <span class="_label">委托授权书：</span>
              <img :src="form.idBackUrl" alt>
            </Col>-->
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
    name: "wallet-enterprise-account-detail",
    data() {
        return {
            loading: false,
            form: {
                name: "",
                merchantType: "",
                merchantTypeDesc: "",
                merchantIdType: "",
                merchantIdTYpeDesc: "",
                idType: "",
                idTypeDesc: "",
                licenseNo: "",
                openAcctLicenseNo: "",
                legalName: "",
                legalIdNo: "",
                servicePhone: "",
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
                province: "",
                city: "",
                transactorName: "",
                transactorMobile: "",
                transactorIdNo: "",
                transactorEmail: "",
                licensePhotoUrl: "",
                openAcctPhotoUrl: "",
                legalIdFrontUrl: "",
                legalIdBackUrl: "",
                transactorIdFrontUrl: "",
                transactorIdBackUrl: ""
            }
        };
    },
    activated() {
        this.loading = true;
        getWalletAccountDetail("ent", this.$route.params.id).then(
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
