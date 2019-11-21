<style lang="less">
.ac-menu-a {
    display: inline-block;
    min-width: 80px;
    width: 100%;
    text-align: center;
}
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form
                @submit.native.prevent="handleFilter"
                :model="filter"
                ref="filterForm"
                label-position="right"
                :label-width="120"
            >
                <FormItem label="支付时间">
                    <date-range-selector
                        style="width:100%"
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginDate"
                        :end-date.sync="filter.endDate"
                        placeholder
                    ></date-range-selector>
                </FormItem>
                <FormItem label="商户订单号">
                    <Input v-model="filter.outTradeNo"></Input>
                </FormItem>
                <FormItem label="付款方">
                    <completeSelector :account.sync="pay" v-model="filter.payAccountNo"></completeSelector>
                </FormItem>
                <FormItem label="付款方编号">
                    <Input v-model="filter.payAccountNo" clearable></Input>
                </FormItem>
                <FormItem label="收款方">
                    <completeSelector :account.sync="recv" v-model="filter.recvAccountNo"></completeSelector>
                </FormItem>
                <FormItem label="收款方编号">
                    <Input v-model="filter.recvAccountNo" clearable></Input>
                    <!-- <completeSelector :account.sync="recv" v-model="filter.recvAccountNo"></completeSelector> -->
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="状态">
                    <wallet-transaction-state-selector placeholder v-model="filter.state" />
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="downloadExcel">导出execl</Button>
        </div>
        <Table
            :loading="loading"
            border
            stripe
            :columns="columns"
            :data="data"
            @on-selection-change="handleSelect"
        ></Table>
        <pagination
            :total="total"
            :limit.sync="filter.limit"
            :offset.sync="filter.offset"
            @on-load="loadData"
        ></pagination>
    </div>
</template>

<script>
import walletTransactionStateSelector from "components/wallet-transaction-state-selector";
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import completeSelector from "components/complete-selector";
import institutionSelector from "components/institution-selector";
import { transferOrDrawListOrRecharge } from "@/actions/wallet";
export default {
    name: "wallet-transfer-transaction",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            selectedSelection: [],
            columns: [
                {
                    key: "outTradeNo",
                    title: "商户订单号"
                },
                {
                    key: "createdAt",
                    title: "支付时间"
                },
                {
                    key: "payAccountName",
                    title: "付款方"
                },
                {
                    key: "payAccountNo",
                    title: "付款方编号"
                },
                {
                    key: "recvAccountName",
                    title: "收款方"
                },
                {
                    key: "recvAccountNo",
                    title: "收款方编号"
                },
                {
                    key: "amount",
                    title: "金额(元)"
                },
                {
                    key: "feeAmount",
                    title: "手续费(元)"
                },
                {
                    key: "clearInstitutionDesc",
                    title: "所属银行"
                },
                {
                    key: "stateDesc",
                    title: "状态"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                outTradeNo: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                payAccountNo: "",
                beginDate: "",
                endDate: "",
                recvAccountNo: "",
                state: "",
                clearInstitution: ""
            },
            data: [],
            total: 0,
            recv: {},
            pay: {}
        };
    },
    methods: {
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/transaction/export/transfer/list",
                this.filter
            );
        },
        loadData() {
            this.loading = true;
            transferOrDrawListOrRecharge("transfer", this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleBatchFreeze(selection) {
            // let ids = this.selectedSelection.map(item => {
            //     return item.merchantId;
            // });
            // if (ids.length > 0) {
            //     this.disable = true;
            //     freezeOrUnFreezeMerchant("frozen", {
            //         merchantIds: ids
            //     }).then(
            //         res => {
            //             this.loadData();
            //             this.$lf.message("冻结成功", "success");
            //             this.disable = false;
            //         },
            //         err => {
            //             this.disable = false;
            //         }
            //     );
            // } else {
            //     this.$lf.message("请选择冻结项", "info");
            // }
        },
        handleBatchUnfreeze(selection) {
            // let ids = this.selectedSelection.map(item => {
            //     return item.merchantId;
            // });
            // if (ids.length > 0) {
            //     this.enable = true;
            //     freezeOrUnFreezeMerchant("unfrozen", {
            //         merchantIds: ids
            //     }).then(
            //         res => {
            //             this.loadData();
            //             this.$lf.message("解冻成功", "success");
            //             this.enable = false;
            //         },
            //         err => {
            //             this.enable = false;
            //         }
            //     );
            // } else {
            //     this.$lf.message("请选择解冻项", "info");
            // }
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        walletTransactionStateSelector,
        institutionSelector,
        completeSelector
    }
};
</script>
