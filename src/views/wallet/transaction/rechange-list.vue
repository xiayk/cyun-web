<style lang="less">
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
                <FormItem label="账号名称">
                    <Input v-model="filter.accountName"></Input>
                </FormItem>
                <FormItem label="账户编号">
                    <Input v-model="filter.accountNo"></Input>
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
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
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
import institutionSelector from "components/institution-selector";
import { transferOrDrawListOrRecharge } from "@/actions/wallet";
export default {
    name: "wallet-rechange-transaction",
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
                    key: "accountName",
                    title: "账户名称"
                },
                {
                    key: "accountNo",
                    title: "账户编号"
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
                accountNo: "",
                beginDate: "",
                endDate: "",
                accountName: "",
                state: "",
                clearInstitution: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/transaction/export/recharge/list",
                this.filter
            );
        },
        loadData() {
            this.loading = true;
            transferOrDrawListOrRecharge("recharge", this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
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
        institutionSelector
    }
};
</script>
