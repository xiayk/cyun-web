<template>
    <div>
        <Card>
            <div slot="title">账户余额查询</div>
            <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        </Card>
        <Card style="margin-top:5px;">
            <div slot="title">账户冻结明细</div>
            <Form
                @submit.native.prevent="handleFilter"
                :model="filter"
                ref="filterForm"
                label-position="right"
                :label-width="120"
            >
                <FormItem label="起止时间">
                    <date-range-selector
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginDate"
                        :end-date.sync="filter.endDate"
                    ></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
            <Table :loading="infoLoad" border stripe :columns="cum" :data="timeData"></Table>
            <pagination
                :total="total"
                :limit.sync="filter.limit"
                :offset.sync="filter.offset"
                @on-load="loadData"
            ></pagination>
        </Card>
    </div>
</template>

<script>
import pagination from "components/pagination";
import dateRangeSelector from "components/date-range-selector";
import { getBalanceDetail, getFreezeBalanceDetail } from "@/actions/wallet";
export default {
    name: "account-manage-balance",

    data() {
        return {
            data: [],
            loading: false,
            columns: [
                {
                    title: "账户类型",
                    key: "typeDesc",
                    render: (h, params) => {
                        return h("span", params.row.typeDesc);
                    }
                },
                {
                    title: "资金类型",
                    key: "list",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                attrs: {
                                    class: "subCol"
                                }
                            },
                            [
                                h(
                                    "ul",
                                    this.data[params.index].list.map(v => {
                                        return h("li", v.label);
                                    })
                                )
                            ]
                        );
                    }
                },
                {
                    title: "金额(元)",
                    key: "list",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                attrs: {
                                    class: "subCol"
                                }
                            },
                            [
                                h(
                                    "ul",
                                    this.data[params.index].list.map(v => {
                                        return h("li", v.amount, ".");
                                    })
                                )
                            ]
                        );
                    }
                },
                {
                    title: "操作",
                    key: "list",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                attrs: {
                                    class: "subCol"
                                }
                            },
                            [
                                h(
                                    "ul",
                                    this.data[params.index].list.map(item => {
                                        return h("li", {}, ".");
                                    })
                                )
                            ]
                        );
                    }
                }
            ],
            timeData: [],
            cum: [
                {
                    title: "冻结时间",
                    key: "createdAt"
                },
                {
                    title: "交易类型",
                    key: "orderTypeDesc"
                },
                {
                    title: "金额(元)",
                    key: "holdAmount"
                },
                {
                    title: "摘要",
                    key: "remark"
                }
            ],
            infoLoad: false,
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                accountNo: ""
            },
            total: 0
        };
    },

    methods: {
        handleData(data) {
            let amount = "",
                arr = [];
            arr = data.rows.map(v => {
                amount = v.current_bal;
                return {
                    typeDesc: v.type_desc,
                    list: [
                        {
                            label: "可用余额(A1)",
                            amount: v.available_amount
                        },
                        {
                            label: "在途金额(A2)",
                            amount: v.in_transit_amount
                        },
                        {
                            label: "冻结金额(A3)",
                            amount: v.un_available_amount
                        },
                        {
                            label: "账户余额(A=A1+A2+A3)",
                            amount: v.current_bal
                        }
                    ]
                };
            });
            arr.push({
                typeDesc: "合计",
                list: [
                    {
                        label: "总资产",
                        amount
                    }
                ]
            });
            this.data = arr;
        },
        loadAccound() {
            this.loading = true;
            getBalanceDetail(this.$route.params.id).then(
                res => {
                    this.loading = false;
                    this.handleData(res.data);
                },
                err => {
                    this.loading = false;
                }
            );
        },
        loadData() {
            this.infoLoad = true;
            let formData = this.filter;
            formData.accountNo = this.$route.params.id;
            getFreezeBalanceDetail(formData).then(res => {
                this.infoLoad = false;
                this.timeData = res.data.rows;
                this.total = res.data.total;
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        floatAdd(arg1, arg2, arg3, arg4) {
            var r1, r2, r3, r4, m;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            try {
                r3 = arg3.toString().split(".")[1].length;
            } catch (e) {
                r3 = 0;
            }
            try {
                r4 = arg4.toString().split(".")[1].length;
            } catch (e) {
                r4 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m + arg3 * m + arg4 * m) / m;
        },
        GetDateDiff(startDate, endDate) {
            var startTime = new Date(
                Date.parse(startDate.replace(/-/g, "/"))
            ).getTime();
            var endTime = new Date(
                Date.parse(endDate.replace(/-/g, "/"))
            ).getTime();
            var dates = Math.abs(startTime - endTime) / (1000 * 60 * 60 * 24);
            return dates;
        }
    },
    activated() {
        this.loadAccound();
    },
    components: {
        pagination,
        dateRangeSelector
    }
};
</script>

<style lang='less' >
.subCol > ul > li {
    margin: 0 -18px;
    list-style: none;
    text-align: center;
    padding: 9px;
    border-bottom: 1px solid #ccc;
    overflow-x: hidden;
}
.subCol > ul > li:last-child {
    border-bottom: none;
}
</style>

