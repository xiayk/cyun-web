<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="统计时间" >
                    <date-range-selector style="width:100%;" v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="支付成功总笔数" >
                    <InputNumber  :min="0" v-model="filter.minSuccessCount"></InputNumber>
                    -
                    <InputNumber  :min="0" v-model="filter.maxSuccessCount"></InputNumber>
                </FormItem>
                <FormItem label="支付成功总金额" >
                    <InputNumber  :min="0" v-model="filter.minSuccessAmount"></InputNumber>
                    -
                    <InputNumber  :min="0" v-model="filter.maxSuccessAmount"></InputNumber>
                </FormItem>
                <FormItem label="退款成功总金额" >
                    <InputNumber  :min="0" v-model="filter.minRefundAmount"></InputNumber>
                    -
                    <InputNumber  :min="0" v-model="filter.maxRefundAmount"></InputNumber>
                </FormItem>
                <FormItem label="退款成功总笔数" >
                    <InputNumber  :min="0" v-model="filter.minRefundCount"></InputNumber>
                    -
                    <InputNumber  :min="0" v-model="filter.maxRefundCount"></InputNumber>
                </FormItem>
                <FormItem label="交易净额" >
                    <InputNumber  :min="0" v-model="filter.minSettleAmount"></InputNumber>
                    -
                    <InputNumber  :min="0" v-model="filter.maxSettleAmount"></InputNumber>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button type="primary" @click="downloadExcel">导出</Button>                                        
                </FormItem>
            </Form>
        </Card>
        <Table  :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
        <!-- 退款 -->
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import { getSettleInstitutionProduct } from "@/actions/settle";
export default {
    name: "transaction-paytype-order-stat",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "createdAt",
                    title: "统计时间"
                },
                {
                    key: "productName",
                    title: "支付方式"
                },
                {
                    key: "paidCount",
                    title: "支付成功总笔数"
                },
                // 对应的是tradeId
                {
                    key: "paidAmount",
                    title: "支付成功总金额"
                },
                {
                    key: "refundCount",
                    title: "退款成功总笔数"
                },
                {
                    key: "refundAmount",
                    title: "退款成功总金额"
                },
                {
                    key: "settleAmount",
                    title: "交易净额"
                }
                // {
                //     type: "action",
                //     title: "操作",
                //     width: 150,
                //     render: (h, params) => {
                //         return h("div", [
                //             h(
                //                 "Button",
                //                 {
                //                     props: {
                //                         type: "text",
                //                         size: "small"
                //                     },
                //                     on: {
                //                         click: () => {
                //                             this.$router.push({
                //                                 name:
                //                                     "transaction-order-detail",
                //                                 query: {
                //                                     id: params.row.id
                //                                 }
                //                             });
                //                         }
                //                     }
                //                 },
                //                 "详情"
                //             ),
                //             JSON.parse(Cookies.get("user")).userTypes === "3" &&
                //             (params.row.state === "00" ||
                //                 params.row.state === "03")
                //                 ? h(
                //                       "Button",
                //                       {
                //                           props: {
                //                               type: "text",
                //                               size: "small"
                //                           },
                //                           on: {
                //                               click: () => {
                //                                   this.firstCheckState = true;
                //                                   this.takeTime = Object.assign(
                //                                       {},
                //                                       this.defaultCheckObj
                //                                   );
                //                                   this.takeTime.id =
                //                                       params.row.id;
                //                               }
                //                           }
                //                       },
                //                       "申请退款"
                //                   )
                //                 : ""
                //         ]);
                //     }
                // }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                minSuccessAmount: 0,
                maxSuccessAmount: 0,
                minSuccessCount: 0,
                maxSuccessCount: 0,
                minRefundAmount: 0,
                maxRefundAmount: 0,
                minRefundCount: 0,
                maxRefundCount: 0,
                minSettleAmount: 0,
                maxSettleAmount: 0
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSettleInstitutionProduct(this.filter).then(
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
            this.$util.downloadExcel(
                "/settle/statistics/export/institution/product/list",
                this.filter
            );
        }
    },
    components: {
        dateRangeSelector,
        pagination
    }
};
</script>