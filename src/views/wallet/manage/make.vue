<template>
  <div>
    <baseDetail :info.sync="form">
      <h3>打款验证信息</h3>
      <FormItem label="打款金额" required>
        <InputNumber v-model="amount" style="width:100%;"></InputNumber>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading" @click="submit">提交</Button>
        <Button @click="closeCurrentErrPage">取消</Button>
      </FormItem>
    </baseDetail>
  </div>
</template>

<script>
import baseDetail from "./base-detail";
import { getAdmitPersonOrEntDetail, getAccountEntAuth } from "@/actions/wallet";
import { closeCurrentErrPage } from "@/constants/constant";

export default {
    name: "account-manage-make",
    components: {
        baseDetail
    },
    data() {
        return {
            form: {},
            spinShow: false,
            loading: false,
            amount: 0
        };
    },

    methods: {
        closeCurrentErrPage() {
            closeCurrentErrPage(this, "account-manage");
        },
        submit() {
            let { amount } = this;
            if (amount == 0) {
                this.$Notice.error({
                    title: "错误提示",
                    desc: "必须输入大于0的整数"
                });
            }
            this.loading = true;
            getAccountEntAuth({
                amount: amount * 100,
                accountNo: this.$route.params.id
            }).then(
                res => {
                    this.loading = false;

                    this.$Notice.success({
                        title: "提交成功",
                        desc: `订单状态：${res.data.failure_msg || "提交成功"}`
                    });
                    closeCurrentErrPage(this, "account-manage");
                },
                err => {
                    this.loading = false;
                }
            );
        },
        getAdmitPersonOrEntDetail() {
            let id = this.$route.params.id;
            this.spinShow = true;
            getAdmitPersonOrEntDetail("ent", id).then(res => {
                this.spinShow = false;
                this.form = res.data;
            });
        }
    },
    activated() {
        this.getAdmitPersonOrEntDetail();
    }
};
</script>

<style lang='less' >
</style>
