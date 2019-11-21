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
                <FormItem label="账单日期">
                    <date-range-selector
                        v-model="filter._billDateRange"
                        :start-date.sync="filter.billBeginDate"
                        :end-date.sync="filter.billEndDate"
                        placeholder
                    ></date-range-selector>
                </FormItem>
                <FormItem label="支付时间">
                    <date-range-selector
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginDate"
                        :end-date.sync="filter.endDate"
                        placeholder
                    ></date-range-selector>
                </FormItem>
                <FormItem label="付款方">
                    <completeSelector :account.sync="pay" v-model="filter.payAccountNo"></completeSelector>
                </FormItem>
                <FormItem label="收款方">
                    <completeSelector :account.sync="recv" v-model="filter.recvAccountNo"></completeSelector>
                </FormItem>
                <FormItem label="商户订单号">
                    <Input v-model="filter.outTradeNo" clearable></Input>
                </FormItem>
                <FormItem label="交易类型">
                    <Select v-model="filter.tradeType" placeholder>
                        <Option value>全部</Option>
                        <Option value="1">转账</Option>
                        <Option value="2">提现</Option>
                        <Option value="3">充值</Option>
                        <Option value="4">退款</Option>
                    </Select>
                </FormItem>

                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>

                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button @click="downloadExcel">导出</Button>
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination
            :total="total"
            :limit.sync="filter.limit"
            :offset.sync="filter.offset"
            @on-load="loadData"
        ></pagination>
        <Modal v-model="againModal" title="重新对账" @on-ok="handleAgain">
            <p>确定要重新对账吗？</p>
            <p>请谨慎操作是否要重新对账</p>
        </Modal>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import institutionSelector from "components/institution-selector";
import accountSelector from "components/account-selector";
import { getCheckingDetailList } from "@/actions/accounts";
import moment from "moment-mini";
import completeSelector from "components/complete-selector";
export default {
    name: "account-detailed",
    data() {
        return {
            loading: false,
            selectedSelection: [],
            columns: [
                {
                    key: "chargeDate",
                    title: "账单日期"
                },
                {
                    key: "createTime",
                    title: "支付时间"
                },
                {
                    key: "outTradeNo",
                    title: "商户订单号"
                },
                {
                    key: "tradeTypeDesc",
                    title: "交易类型"
                },
                {
                    key: "payAccountName",
                    title: "付款方"
                },
                {
                    key: "payAccountNo",
                    title: "付款账号"
                },
                {
                    key: "recvAccountName",
                    title: "收款方"
                },
                {
                    key: "recvAccountNo",
                    title: "收款账号"
                },
                {
                    key: "amount",
                    title: "金额(元)"
                },
                {
                    key: "clearInstitution",
                    title: "所属银行"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                clearInstitution: "",
                payAccountName: "",
                recvAccountName: "",
                outTradeNo: "",
                tradeType: "",
                billBeginDate: "",
                billEndDate: "",
                _billDateRange: ["", ""]
            },
            data: [],
            total: 0,
            againModal: false,
            recv: {},
            pay: {}
        };
    },
    computed: {
        startDate() {
            return (
                moment()
                    .subtract(30, "days")
                    .format("YYYY-MM-DD") +
                " " +
                "00:00:00"
            );
        },
        endDate() {
            return moment().format("YYYY-MM-DD") + " " + "23:59:59";
        }
    },
    mounted() {
        this.filter._dateRange = [this.startDate, this.endDate];
        this.filter._billDateRange = [this.startDate, this.endDate];
        let params = JSON.parse(this.$route.query.params);
        if (params) {
            this.filter._billDateRange = params._billDateRange;
            this.filter.clearInstitution = params.clearInstitution;
        }
    },
    methods: {
        handleAgain() {},
        handleDate(date) {
            this.filter.beginDate = date[0];
            this.filter.endDate = date[1];
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/checking/export/detail/list",
                this.filter
            );
        },
        loadData() {
            this.loading = true;
            this.filter.recvAccountNo = this.recv.accountNo;
            this.filter.payAccountNo = this.pay.accountNo;
            getCheckingDetailList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
            // console.log(Object.assign(this.filter,this.filter2))
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    watch: {
        addModal(val) {
            if (!val) {
                this.resetSecretInfo();
            }
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        institutionSelector,
        accountSelector,
        completeSelector
    }
};
</script>
