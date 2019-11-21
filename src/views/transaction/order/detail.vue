<style lang="less">
.minWidth {
    min-width: 43.3% !important;
}
.inputWidth {
    min-width: 13rem;
}
</style>
<template>
    <div>
        <Card class="filter-wrap">
            <P>订单流水明细查询</P>
            <Form label-position="right" :label-width="200">
                <FormItem label="商户名称" class="minWidth">
                    <Input v-model="form.merchantFullName" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="商户编号"  class="minWidth">
                    <Input v-model="form.merchantCode" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="平台订单号" class="minWidth">
                    <Input v-model="form.platTradeNo" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="商户订单号"  class="minWidth">
                    <Input v-model="form.outTradeNo" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="支付类型" class="minWidth">
                    <Input v-model="form.payTypeDesc" class="inputWidth" readonly></Input>
                </FormItem>
               <FormItem label="支付状态" class="minWidth">
                    <Input v-model="form.stateDesc" class="inputWidth" readonly></Input>
                </FormItem>  
                <FormItem label="交易金额" class="minWidth">
                    <Input v-model="form.amount" class="inputWidth" readonly></Input>
                </FormItem> 
                <FormItem label="补贴金额" class="minWidth">
                    <Input v-model="form.subsidyAmount" class="inputWidth" readonly></Input>      
                </FormItem> 
                <FormItem label="退款金额" class="minWidth">
                    <Input v-model="form.refundAmount" class="inputWidth" readonly></Input>
                </FormItem>
                <!-- <FormItem label="退还补贴金额" class="minWidth">
                    <Input v-model="form.rfSubsidyAmount" class="inputWidth" readonly></Input>
                </FormItem>  -->
                <FormItem label="手续费金额" class="minWidth">
                    <Input v-model="form.rateAmount" class="inputWidth" readonly></Input>
                </FormItem>
                  <FormItem label="实收金额" class="minWidth">
                    <Input v-model="form.netAmount" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="客户经理工号" class="minWidth">
                    <Input v-model="form.accountManagerId" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="交易时间"  class="minWidth">
                    <Input v-model="form.chargeTime" class="inputWidth" readonly></Input>
                </FormItem>
                  <FormItem label="第三方商户号"  class="minWidth">
                    <Input v-model="form.thirdMerchantCode" class="inputWidth" readonly></Input>      
                </FormItem> 
            </Form>
        </Card>
    </div>
</template>

<script>
import { getSettleTransactionOrderDetail } from "@/actions/settle";
export default {
    name: "transaction-order-detail",
    data() {
        return {
            form: {}
        };
    },
    activated() {
        if (this.form.id != this.$route.query.id) {
            getSettleTransactionOrderDetail(this.$route.query.id).then(res => {
                this.form = res.data;
            });
        }
    },
    components: {}
};
</script>

