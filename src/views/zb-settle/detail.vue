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
                    ></date-range-selector>
                </FormItem>
                <FormItem label="账户名称">
                    <Input v-model="filter.accountName" clearable></Input>
                </FormItem>
                <FormItem label="账号编号">
                    <Input v-model="filter.accountNo" clearable></Input>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="费用类型">
                    <Select v-model="filter.feeType" clearable>
                        <Option value="1">企业开户</Option>
                        <Option value="2">个人开户</Option>
                        <Option value="3">企业入金</Option>
                        <Option value="4">个人入金</Option>
                        <Option value="5">企业提现</Option>
                        <Option value="6">个人提现</Option>
                    </Select>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button @click="downloadExcel" type="primary">导出</Button>
            总笔数:{{settleBatchDetailCollect.totalRecord}}, 总金额:{{settleBatchDetailCollect.totalAmount}}元
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
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import { getZbSettleBatchList } from "@/actions/wallet";
import institutionSelector from "components/institution-selector";
export default {
    name: "settle-bill-detail",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            selectedSelection: [],
            columns: [
                {
                    key: "tradeTime",
                    title: "支付时间"
                },
                {
                    key: "accountName",
                    title: "账户名称"
                },
                {
                    key: "accountNo",
                    title: "账号编号"
                },
                {
                    key: "feeTypeDesc",
                    title: "费用类型"
                },
                {
                    key: "amount",
                    title: "金额(元)"
                },
                {
                    key: "clearInstitutionDesc",
                    title: "所属银行"
                },
                {
                    key: "transactionCodeDesc",
                    title: "摘要"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                accountName: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                accountNo: "",
                feeType: "",
                clearInstitution: "",
                settleId: this.$route.params.settleId,
                cycle: this.$route.query.cycle
            },
            data: [],
            total: 0,
            settleBatchDetailCollect: {}
        };
    },
    methods: {
        loadData() {
            let { cycle, params } = this.$route.query;
            // {
            //     accountName,
            //     accountNo,
            //     clearInstitution,
            //     feeType
            // } = JSON.parse(params);
            this.loading = true;
            getZbSettleBatchList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.pageResult.rows;
                this.settleBatchDetailCollect =
                    res.data.settleBatchDetailCollect;
                this.total = res.data.pageResult.total;
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/settle/export/bill/batch/detail/list",
                this.filter
            );
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        institutionSelector
    }
};
</script>
