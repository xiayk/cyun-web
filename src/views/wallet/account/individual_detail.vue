<style lang="less" >
.xft__flex_align {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.xft_box_width {
    width: 550px;
}
</style>


<template>
  <div>
    <Card>
      <p slot="title">基本信息</p>
      <div class="xft_box_width">
        <div class="xft__flex_align">
          <span>
            姓名:
            <span>张三中</span>
          </span>
          <span>
            证件类型:
            <span>居民身份证</span>
          </span>
        </div>
        <div class="xft__flex_align">
          <span>
            身份证号码:
            <span>43010319830541258895</span>
          </span>
          <span>
            手机号码:
            <span>13598745623</span>
          </span>
        </div>
      </div>
    </Card>

    <Card>
      <p slot="title">众邦账户信息</p>
      <div class="xft_box_width">
        <div class="xft__flex_align">
          <span>
            账号名称:
            <span>张三中</span>
          </span>
          <span>
            账户类型:
            <span>个人账户</span>
          </span>
        </div>
        <div class="xft__flex_align">
          <span>
            账户号:
            <span>1865233336654987964</span>
          </span>
          <span>
            开户日期:
            <span>2019-03-04</span>
          </span>
        </div>
        <div class="xft__flex_align">
          <span>
            账户余额:
            <span>12585.22元</span>
          </span>
          <span>
            可提现金额:
            <span>12585.22元</span>
          </span>
        </div>
        <div class="xft__flex_align">
          <span>
            在途金额:
            <span>12582.22元</span>
          </span>
          <span>
            冻结金额:
            <span>12582.50元</span>
          </span>
        </div>
        <div class="xft__flex_align">
          <span>
            账户状态:
            <span>正常</span>
          </span>
          <span>
            账户名称:
            <span>张三中</span>
          </span>
        </div>
      </div>
    </Card>
    <Card>
      <p slot="title">绑定银行卡信息</p>
      <div class="xft_box_width">
        <div class="xft__flex_align">
          <span>
            开户行名称:
            <span>居民身份证</span>
          </span>
          <span>
            银行账号:
            <span>43010319830541258895</span>
          </span>
        </div>
      </div>
    </Card>
    <!--  <Card>
    <p slot="title">证照信息</p>
    </Card>-->
  </div>
</template>
<script>
import { closeCurrentErrPage } from "@/constants/constant";
import {
    addOrUpdateCustomerManager,
    getCustomerManagerDetail
} from "@/actions/merchant";
export default {
    name: "account-individual-detail",
    data() {
        const validatePhone = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("手机号不能为空"));
            } else if (!/^[1]\d{10}$/.test(value)) {
                callback(new Error("请输入正确手机号"));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            formItem: {
                code: "",
                phone: "",
                name: "",
                sex: "1"
            },
            rules: {
                code: [
                    {
                        required: true,
                        message: "客户经理工号不能为空",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        validator: validatePhone,
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "客户经理名称不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.formItem;
                    addOrUpdateCustomerManager(formData).then(
                        res => {
                            this.loading = false;
                            this.$lf.message("更新成功", "success");
                            closeCurrentErrPage(this, "marketing-customer");
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        },
        getCustomerDetail(id) {
            getCustomerManagerDetail(id).then(
                res => {
                    this.formItem = res.data;
                },
                err => {
                    closeCurrentErrPage(this, "marketing-customer");
                }
            );
        }
    },
    activated() {
        // this.getCustomerDetail(this.$route.params.id);
    }
};
</script>
