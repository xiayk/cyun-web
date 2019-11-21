<style lang="less">
._flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.bg-pay-fail {
    color: #bbbec4;
}
</style>
<style lang="less" scoped>
#print-main {
    max-width: 750px;
    margin: 30px auto;
    padding: 0 15px;
}
.title {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
}
.ft-18 {
    font-size: 16px;
}
.or-time {
    margin-top: 30px;
}
.mg-tp-15 {
    margin-top: 15px;
}
.border-dashed {
    border-top: 1px dashed #666;
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
                <FormItem label="报告类型">
                    <Select transfer v-model="filter.reportType" clearable>
                        <Option value="1">日报</Option>
                        <Option value="2">周报</Option>
                        <Option value="3">月报</Option>
                    </Select>
                </FormItem>
                <FormItem label="交易时间">
                    <date-range-selector
                        style="width:100%;"
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginTime"
                        :end-date.sync="filter.endTime"
                    ></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <!-- <Button type="primary" :loading="downLoading" @click="downloadExcel">导出</Button> -->
                </FormItem>
            </Form>
        </Card>
        <Table
            :row-class-name="rowClassName"
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
import Cookies from "js-cookie";
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import InstitutionListSelector from "components/institution-list-selector";
import PayTypeSelector from "components/pay-type-selector";
import SettleStateSelector from "components/settle-state-selector";
import xlinkMerchantSelector from "components/xlink-merchant-selector";
import xlinkStoreSelector from "components/xlink-store-selector";
import xlinkOperatorSelector from "components/xlink-operator-selector";
import {
    getSettleTransactionList,
    refundPass,
    searchOrderStatus,
    handleDownTask,
    getQianjinOrderList,
    pushQianjinOrder,
    pushQianjinOrderBatch,
    getStatReport
} from "@/actions/settle";
import { handleCloundPrint } from "@/actions/store";
let timeOuter = "";
export default {
    name: "transaction-jingying-order-flow",
    data() {
        return {
            modalLoading: true,
            firstCheckState: false,
            loading: false,
            downLoading: false,
            printModal: false,
            orderInfo: {},
            printLoading: false,
            columns: [
                {
                    key: "tradeDate",
                    title: "日期",
                    width: 120,
                    align: "center"
                },
                {
                    key: "realAmount",
                    title: "实际到账",
                    align: "center"
                },
                {
                    key: "payAmount",
                    title: "收款金额",
                    align: "center"
                },
                {
                    key: "payCount",
                    title: "收款笔数",

                    align: "center"
                },
                {
                    key: "refundAmount",
                    title: "退款金额",

                    align: "center"
                },
                // 对应的是tradeId

                {
                    key: "refundCount",
                    title: "退款笔数",

                    align: "center"
                },

                {
                    key: "preRateAmount",
                    title: "预期手续费",
                    align: "center"
                },

                {
                    key: "rateAmount",
                    title: "实际手续费",
                    align: "center"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginTime: "",
                endTime: "",
                merchantCode: "",
                storeCode: "",
                storeName: "",
                operatorId: "",
                operatorName: "",
                reportType: "1",
                _reportTypeDesc: "日报",
                offset: 0,
                limit: 10
            },
            takeTime: {
                refundAmount: "",
                remark: "",
                outTradeNo: ""
            },
            defaultCheckObj: {},
            data: [],
            total: 0,
            ruleInline: {
                refundAmount: [
                    {
                        required: true,
                        message: "退款金额不能为空",
                        trigger: "blur"
                    }
                ]
            },
            merchantInfo: {},
            storeInfo: {},
            dowmModal: false,
            pushArray: []
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getStatReport(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        downloadExcel() {
            // this.$util.downloadExcel(
            //     "settle/transaction/export/list",
            //     this.filter
            // );
            this.downLoading = true;
            handleDownTask("/settle/transaction/export/list", this.filter).then(
                res => {
                    this.dowmModal = true;
                    this.downLoading = false;
                    timeOuter = setTimeout(() => {
                        this.handleGoDownCenter();
                    }, 10000);
                },
                () => {
                    this.downLoading = false;
                }
            );
        },

        rowClassName(row, index) {
            // [{"value":"00","desc":"交易成功"},{"value":"01","desc":"交易失败"},{"value":"03","desc":"部分退款"},{"value":"04","desc":"全部退款"},{"value":"05","desc":"退款中"},{"value":"06","desc":"已撤销"},{"value":"09","desc":"待支付"},{"value":"10","desc":"已接收，等待扣款"},{"value":"98","desc":"已关闭"},{"value":"99","desc":"支付超时"},{"value":"20","desc":"预授权"},{"value":"21","desc":"预授权取消"},{"value":"22","desc":"预授权完成"}]
            if (
                row.state == "01" ||
                row.state == "06" ||
                row.state == "98" ||
                row.state == "99" ||
                row.state == "21"
            ) {
                return "bg-pay-fail";
            }
            return "";
        },
        handleSelect(arr) {
            this.pushArray = arr.map(v => v.id);
        },
        handleBatchPush() {
            this.loading = true;
            pushQianjinOrderBatch({
                ids: this.pushArray
            }).then(
                res => {
                    this.loading = false;
                    if (res.data) {
                        this.$Notice.success({
                            title: "更新成功",
                            desc: "更新成功"
                        });
                        this.loadData();
                    } else {
                        this.$Notice.error({
                            title: "更新失败",
                            desc: "更新失败"
                        });
                    }
                },
                () => {
                    this.loading = false;
                }
            );
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        InstitutionListSelector,
        PayTypeSelector,
        SettleStateSelector,
        xlinkMerchantSelector,
        xlinkStoreSelector,
        xlinkOperatorSelector
    }
};
</script>