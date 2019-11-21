<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="交易时间" >
                    <date-range-selector style="width:100%;" v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="商户订单号" >
                    <Input v-model="filter.outTradeNo"></Input>
                </FormItem>
                <FormItem label="平台订单号">
                    <Input v-model="filter.platTradeNo"></Input>
                </FormItem>
                <FormItem label="第三方流水号">
                    <Input v-model="filter.thirdTradeNo"></Input>
                </FormItem>
                 <FormItem label="商户名称">
                    <Input v-model="filter.fullName"></Input>                                        
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <!-- <Button type="primary" @click="downloadExcel">导出</Button>                                         -->
                </FormItem>
            </Form>
        </Card>
        <Table  :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
       
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import { getSettleBuDanList, handleBuFa } from "@/actions/settle";
export default {
    name: "transaction-reissue-flow",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "createTime",
                    title: "交易时间"
                },
                {
                    key: "outTradeNo",
                    title: "商户订单号"
                },
                // 对应的是tradeId
                {
                    key: "platTradeNo",
                    title: "平台订单号"
                },
                {
                    key: "thirdTradeNo",
                    title: "第三方流水号"
                },
                {
                    key: "fullName",
                    title: "商户名称"
                },
                {
                    type: "action",
                    title: "操作",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            handleBuFa(
                                                params.row.platTradeNo
                                            ).then(res => {
                                                if (res.data) {
                                                    this.$lf.message(
                                                        "补单成功",
                                                        "success"
                                                    );
                                                } else {
                                                    this.$lf.message(
                                                        "补单失败",
                                                        "error"
                                                    );
                                                }
                                            });
                                        }
                                    }
                                },
                                "补发"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                outTradeNo: "",
                platTradeNo: "",
                thirdTradeNo: "",
                fullName: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSettleBuDanList(this.filter).then(
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
        }
    },
    components: {
        dateRangeSelector,
        pagination
    }
};
</script>