<style lang="less">
.ivu-div {
    width: 100%;
    cursor: pointer;
}
.subCol > .subCol-left > li {
    margin: 0 -18px;
    list-style: none;
    padding: 9px;
    border-left: 1px solid #ccc;
    overflow-x: hidden;
    border-bottom: 1px solid #ccc;
}
.subCol {
    display: flex;
    ul {
        flex: 1;
    }
}
.subCol > ul > li:last-child {
    border-bottom: none;
}
.subCol > .border > li:nth-of-type(1n) {
    border-left: none;
}
.subCol > .border > li:nth-of-type(2) {
    border-left: none;
}
.subCol > .border > li:nth-of-type(3) {
    border-left: none;
}
.ivu-again {
    padding: 5px;
    display: flex;
    align-items: center;
    button {
        margin-left: 5px;
    }
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
          <!-- <Input v-model="filter.payAccountName" clearable></Input> -->
          <completeSelector :account.sync="pay" v-model="filter.payAccountNo"></completeSelector>
        </FormItem>
        <FormItem label="收款方">
          <!-- <Input v-model="filter.recvAccountName" clearable></Input> -->
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
        <FormItem label="对账结果">
          <Select v-model="filter.checkingResultState" placeholder clearable>
            <Option value>全部</Option>
            <Option value="00">银行多账</Option>
            <Option value="09">银行少账</Option>
            <Option value="01">金额差额</Option>
          </Select>
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
    <Modal v-model="correctModal" title="订单明细" @on-ok="handleCorrect" width="650">
      <h3 style="padding:5px">订单信息</h3>
      <Table :show-header="false" :loading="loading" border stripe :columns="cum1" :data="data1"></Table>
      <h3 style="padding:5px">对账明细</h3>
      <Table :loading="loading" border stripe :columns="cum2" :data="data2"></Table>
      <h3 style="padding:5px">处理记录</h3>
      <Table :loading="loading" border stripe :columns="cum3" :data="data3"></Table>
      <h3 style="padding:5px">财务流水</h3>
      <Table :loading="loading" border stripe :columns="cum4" :data="data4"></Table>
    </Modal>
  </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import institutionSelector from "components/institution-selector";
import accountSelector from "components/account-selector";
import {
    getCheckingErrorFlowList,
    getCheckingErrorDisposeDetail
} from "@/actions/accounts";
import moment from "moment-mini";
import completeSelector from "components/complete-selector";

export default {
    name: "account-error-record",
    data() {
        return {
            loading: false,
            selectedSelection: [],
            columns: [
                {
                    key: "billDate",
                    title: "账单日期"
                },
                {
                    key: "chargeDate",
                    title: "支付时间"
                },
                {
                    key: "checkingResultStateDesc",
                    title: "对账结果"
                },
                {
                    key: "payAccountName",
                    title: "付款方"
                },
                {
                    key: "recvAccountName",
                    title: "收款方"
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
                    key: "xftAmount",
                    title: "星富通金额(元)"
                },
                {
                    key: "bankAmount",
                    title: "银行金额(元)"
                },
                {
                    key: "clearInstitutionDesc",
                    title: "所属银行"
                },
                {
                    key: "remark",
                    title: "处理意见"
                },
                {
                    key: "Action",
                    title: "操作",
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
                                            this.correctModal = true;
                                            this.data2 = [];
                                            this.info = [];
                                            this.table1 = params.row;
                                            getCheckingErrorDisposeDetail(
                                                params.row.disposeLogId
                                            ).then(res => {
                                                this.data4 =
                                                    res.data.disposeChargeFlow;
                                                this.data3 = [
                                                    res.data.disposeLog
                                                ];
                                            });
                                        }
                                    }
                                },
                                "查看详情"
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
                clearInstitution: "",
                payAccountNo: "",
                recvAccountNo: "",
                outTradeNo: "",
                tradeType: "",
                billBeginDate: "",
                billEndDate: "",
                _billDateRange: ["", ""],
                checkingResultState: ""
            },
            data: [],
            total: 0,
            correctModal: false,
            cum1: [
                {
                    key: "name",
                    title: "账单日期"
                },
                {
                    key: "key",
                    title: "所属银行"
                }
            ],
            cum2: [
                {
                    title: "星富通",
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
                                    {
                                        attrs: {
                                            class: "subCol-left border"
                                        }
                                    },
                                    this.data2[params.index].list.map(v => {
                                        return h("li", v.title);
                                    })
                                ),
                                h(
                                    "ul",
                                    {
                                        attrs: {
                                            class: "subCol-left"
                                        }
                                    },
                                    this.data2[params.index].list.map(v => {
                                        return h(
                                            "li",
                                            this.table1.checkingResultState ==
                                                "01" ||
                                                this.table1
                                                    .checkingResultState == "03"
                                                ? v.key
                                                : "."
                                        );
                                    })
                                )
                            ]
                        );
                    }
                },
                {
                    title: "银行",
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
                                    {
                                        attrs: {
                                            class: "subCol-left  border"
                                        }
                                    },
                                    this.data2[params.index].list.map(v => {
                                        return h("li", v.bankName);
                                    })
                                ),
                                h(
                                    "ul",
                                    {
                                        attrs: {
                                            class: "subCol-left"
                                        }
                                    },
                                    this.data2[params.index].list.map(v => {
                                        return h(
                                            "li",
                                            this.table1.checkingResultState ==
                                                "02" ||
                                                this.table1
                                                    .checkingResultState == "03"
                                                ? v.bankValue
                                                : "."
                                        );
                                    })
                                )
                            ]
                        );
                    }
                }
            ],
            cum3: [
                {
                    title: "处理人",
                    key: "disposeUserName"
                },
                {
                    title: "处理时间",
                    key: "disposeDate"
                },
                {
                    title: "处理意见",
                    key: "remark"
                },
                {
                    title: "处理状态",
                    key: "disposeStateDesc"
                }
            ],
            data3: [],
            table1: {},
            data4: [],
            cum4: [
                {
                    title: "账户名称",
                    key: "accountName"
                },
                {
                    title: "支付时间",
                    key: "createdAt"
                },
                {
                    title: "交易类型",
                    key: "transactionCodeDesc"
                },
                {
                    title: "收入",
                    key: "recvAmount"
                },
                {
                    title: "支出",
                    key: "payAmount"
                }
            ],
            recv: {},
            pay: {}
        };
    },
    computed: {
        data1: {
            get: function() {
                let data = this.table1;
                return [
                    {
                        name: "账单日期",
                        key: data.billDate
                    },
                    {
                        name: "所属银行",
                        key: data.clearInstitutionDesc
                    },
                    {
                        name: "付款方",
                        key: data.payAccountName
                    },
                    {
                        name: "收款方",
                        key: data.recvAccountName
                    },
                    {
                        name: "交易类型",
                        key: data.tradeTypeDesc
                    },
                    {
                        name: "对账结果",
                        key: data.checkingResultStateDesc
                    }
                ];
            },
            // setter
            set: function() {}
        },
        data2: {
            get: function() {
                let data = this.table1;
                return [
                    {
                        list: [
                            {
                                title: "商户订单号",
                                key: data.outTradeNo,
                                bankName: "渠道订单号",
                                bankValue: data.outTradeNo
                            },
                            {
                                title: "支付时间",
                                key: data.chargeDate,
                                bankName: "支付时间",
                                bankValue: data.chargeDate
                            },
                            {
                                title: "支付金额",
                                key: data.xftAmount || ".",
                                bankName: "支付金额(元)",
                                bankValue: data.bankAmount || "."
                            }
                        ]
                    }
                ];
            },
            set: function() {}
        },
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
    },
    methods: {
        handleDetail(data) {},
        handleCorrect() {},
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
            let form = this.filter;
            form.recvAccountNo = this.recv.accountNo;
            form.payAccountNo = this.pay.accountNo;
            getCheckingErrorFlowList(form).then(res => {
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
