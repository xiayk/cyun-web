<style lang="less">
.ac-menu-a {
    display: inline-block;
    min-width: 80px;
    width: 100%;
    text-align: center;
}
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
                        v-model="filter._billBateRange"
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
                    <Select v-model="filter.tradeType" placeholder clearable>
                        <Option value>全部</Option>
                        <Option value="1">转账</Option>
                        <Option value="2">提现</Option>
                        <Option value="3">充值</Option>
                        <Option value="4">退款</Option>
                    </Select>
                </FormItem>
                <FormItem label="对账结果">
                    <Select v-model="filter.checkingResultState" placeholder clearable>
                        <Option value>全部</Option>
                        <Option value="02">银行多账</Option>
                        <Option value="01">银行少账</Option>
                        <Option value="03">金额差额</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>

                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <!-- <Button @click="downloadExcel">导出</Button> -->
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
        <Modal v-model="againModal" title="编辑" @on-ok="handleEdit" width="550">
            <div class="ivu-again">
                <h3>订单信息</h3>
                <Button type="primary" @click="handleClick('1')">编辑</Button>
            </div>
            <Table
                :show-header="false"
                :loading="loading"
                border
                stripe
                :columns="cum"
                :data="info"
            ></Table>
            <div class="ivu-again">
                <h3>对账明细</h3>
                <!-- <Button type="primary" @click="handleClick('2')">编辑</Button> -->
            </div>
            <Table :loading="loading" border stripe :columns="cum2" :data="info2"></Table>
        </Modal>
        <Modal title="编辑" v-model="showForm" :closable="false" :mask-closable="false" width="650">
            <Form ref="form" :model="form" :label-width="80">
                <FormItem label="交易类型">
                    <Select v-model="form.tradeType" clearable placeholder>
                        <!-- <Option value>全部</Option> -->
                        <Option value="1">转账</Option>
                        <Option value="2">提现</Option>
                        <Option value="3">充值</Option>
                        <Option value="4">退款</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector :all="''" v-model="form.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="付款方">
                    <!-- <Input v-model="form.payAccountName" clearable></Input> -->
                    <completeSelector
                        :all="''"
                        :account.sync="payAccountObj"
                        v-model="form.payAccountNo"
                    ></completeSelector>
                </FormItem>
                <FormItem label="收款方">
                    <!-- <Input v-model="form.recvAccountName" clearable></Input> -->
                    <completeSelector
                        :all="''"
                        :account.sync="recvAccountObj"
                        v-model="form.recvAccountNo"
                    ></completeSelector>
                </FormItem>
                <FormItem label="银行金额" prop="amount">
                    <InputNumber :min="0" style="width:100%;" v-model="form.bankAmount"></InputNumber>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="showForm = false">取消</Button>
                <Button type="primary" @click="handleSubmit">确定</Button>
            </div>
        </Modal>
        <Modal v-model="correctModal" :title="errTitle" @on-ok="handleCorrect" width="650">
            <h3 style="padding:5px">订单信息</h3>
            <Table
                :show-header="false"
                :loading="loading"
                border
                stripe
                :columns="cum"
                :data="info"
            ></Table>
            <h3 style="padding:5px">对账明细</h3>
            <Table :loading="loading" border stripe :columns="cum2" :data="info2"></Table>
            <h3 style="padding:5px">财务流水</h3>
            <Table :loading="loading" border stripe :columns="cum3" :data="info3"></Table>
            <h3 style="padding:5px">处理意见</h3>
            <Input v-model="errorForm.remark" type="textarea" :rows="4"></Input>
        </Modal>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import institutionSelector from "components/institution-selector";
import completeSelector from "components/complete-selector";
import {
    getCheckingErrorList,
    getCheckingErrorDelete,
    getCheckingErrorAmendOrRepay,
    getCheckingErrorEdit,
    getCheckingErrorFlowPreload
} from "@/actions/accounts";
import moment from "moment-mini";
export default {
    name: "account-error",
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
                                            this.againModal = true;
                                            this.info2 = [];
                                            this.info = [];
                                            this.rowParams = params.row;
                                            // this.rowParams=params.row
                                            this.form = params.row;
                                            this.recvAccountObj = {
                                                accountName:
                                                    params.row.recvAccountName,
                                                accountNo:
                                                    params.row.recvAccountNo
                                            };
                                            this.payAccountObj = {
                                                accountName:
                                                    params.row.payAccountName,
                                                accountNo:
                                                    params.row.payAccountNo
                                            };
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            params.row.checkingResultState == "03" &&
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
                                                this.errTitle = "修正";
                                                this.info2 = [];
                                                this.info = [];
                                                // this.info3 = [];
                                                this.errorForm.errorFlowId =
                                                    params.row.errorFlowId;
                                                this.rowParams = params.row;
                                                this.handlePreload(
                                                    params.row.errorFlowId
                                                );
                                            }
                                        }
                                    },
                                    "修正"
                                ),
                            params.row.checkingResultState !== "03" &&
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
                                                this.info2 = [];
                                                this.info = [];
                                                this.errTitle = "补账";
                                                // this.info3 = [];
                                                this.errorForm.errorFlowId =
                                                    params.row.errorFlowId;
                                                this.rowParams = params.row;
                                                this.handlePreload(
                                                    params.row.errorFlowId
                                                );
                                            }
                                        }
                                    },
                                    "补账"
                                ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.loading = true;
                                            getCheckingErrorDelete(
                                                params.row.errorFlowId
                                            ).then(
                                                res => {
                                                    this.loading = false;
                                                    this.$Notice.success({
                                                        title: "删除成功"
                                                    });
                                                    this.loadData();
                                                },
                                                err => {
                                                    this.loading = false;
                                                }
                                            );
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                checkingResultState: "",
                beginDate: "",
                endDate: "",
                clearInstitution: "",
                payAccountName: "",
                recvAccountName: "",
                outTradeNo: "",
                tradeType: "",
                _billBateRange: ["", ""],
                billBeginDate: "",
                billEndDate: ""
            },
            data: [],
            total: 0,
            againModal: false,
            // info: [],
            cum: [
                {
                    key: "title",
                    title: "账单日期"
                },
                {
                    key: "key",
                    title: "所属银行",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                on: {
                                    click: () => {
                                        this.infoTable = params.row;
                                        this.index = params.index;
                                        // if (
                                        //     params.row.type !== "chargeDate" &&
                                        //     params.row.type !==
                                        //         "checkingResultStateDesc"
                                        // ) {
                                        //     this.showForm = true;
                                        // }
                                    }
                                },
                                class: "ivu-div"
                            },
                            params.row.key
                        );
                    }
                }
            ],
            cum2: [
                {
                    title: "星富通",
                    key: "title",
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
                                    this.info2[params.index].list.map(v => {
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
                                    this.info2[params.index].list.map(v => {
                                        return h(
                                            "li",
                                            this.rowParams
                                                .checkingResultState == "01" ||
                                                this.rowParams
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
                    key: "key",
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
                                    this.info2[params.index].list.map(v => {
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
                                    this.info2[params.index].list.map(v => {
                                        return h(
                                            "li",
                                            this.rowParams
                                                .checkingResultState == "02" ||
                                                this.rowParams
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
            // info2: [],
            showForm: false,
            form: {
                tradeType: "",
                recvAccountName: "",
                payAccountName: "",
                clearInstitution: "",
                bankAmount: 0,
                errorFlowId: ""
            },
            infoTable: {
                key: ""
            },
            index: "",
            correctModal: false,
            cum3: [
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
            info3: [],
            edit: "",
            errorForm: {
                remark: "",
                errorFlowId: ""
            },
            errTitle: "修正",
            recvAccountObj: {},
            payAccountObj: {},
            recv: {},
            pay: {},
            rowParams: {}
        };
    },
    mounted() {
        this.filter._dateRange = [this.startDate, this.endDate];
        this.filter._billBateRange = [this.startDate, this.endDate];
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
        },
        info: {
            get: function() {
                let data = this.rowParams;
                return [
                    {
                        title: "账单日期",
                        key: data.chargeDate,
                        type: "chargeDate"
                    },
                    {
                        title: "所属银行",
                        key: data.clearInstitutionDesc,
                        type: "clearInstitution",
                        value: data.clearInstitution
                    },
                    {
                        title: "付款方",
                        key: data.payAccountName,
                        type: "payAccountName",
                        value: data.payAccountNo
                    },
                    {
                        title: "收款方",
                        key: data.recvAccountName,
                        type: "recvAccountName",
                        value: data.recvAccountNo
                    },
                    {
                        title: "交易类型",
                        key: data.tradeTypeDesc,
                        type: "tradeType",
                        value: data.tradeType
                    },
                    {
                        title: "对账结果",
                        key: data.checkingResultStateDesc,
                        type: "checkingResultStateDesc"
                    }
                ];
            },
            // setter
            set: function() {}
        },
        info2: {
            get: function() {
                let data = this.rowParams;
                return [
                    {
                        list: [
                            {
                                title: "商户订单号",
                                key: data.outTradeNo,
                                bankName: "渠道订单号",
                                bankValue: data.outTradeNo,
                                state: data.checkingResultState
                            },
                            {
                                title: "支付时间",
                                key: data.createTime,
                                bankName: "支付时间",
                                bankValue: data.createTime,
                                state: data.checkingResultState
                            },
                            {
                                title: "支付金额",
                                key: data.xftAmount,
                                bankName: "支付金额(元)",
                                bankValue: data.bankAmount,
                                state: data.checkingResultState
                            }
                        ]
                    }
                ];
            },
            set: function() {}
        }
    },
    methods: {
        handlePreload(id) {
            getCheckingErrorFlowPreload(id).then(res => {
                this.info3 = res.data;
            });
        },
        handleClick(type) {
            this.edit = type;
            this.showForm = true;
        },
        handleCorrect() {
            let type = this.errTitle == "修正" ? "amend" : "repay";
            this.loading = true;
            getCheckingErrorAmendOrRepay(type, this.errorForm).then(
                res => {
                    this.loading = false;
                    this.$Notice.success({
                        title: `${this.errTitle}成功`
                    });
                    this.loadData();
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleEdit() {},
        handleDetail(data) {
            // let title = [

            // ];
            // title.map(v => {
            //     this.info.push({
            //         name: v.title,
            //         key: v.key,
            //         type: v.type,
            //         value: v.value
            //     });
            // });

            let cum2 = {
                list: []
            };
            this.info2 = [cum2];
        },
        handleSubmit() {
            let { recvAccountObj, payAccountObj } = this;
            let {
                errorFlowId,
                tradeType,
                clearInstitution,
                bankAmount
            } = this.form;
            let formData = {
                errorFlowId,
                tradeType,
                clearInstitution,
                bankAmount: bankAmount * 100,
                payAccountNo: payAccountObj.accountNo,
                payAccountName: payAccountObj.accountName,
                recvAccountNo: recvAccountObj.accountNo,
                recvAccountName: recvAccountObj.accountName
            };
            this.loading = true;
            getCheckingErrorEdit(formData).then(
                res => {
                    this.loading = false;
                    this.$Notice.success({
                        title: `编辑成功`
                    });
                    this.loadData();
                    this.showForm = false;
                    this.againModal = false;
                },
                err => {
                    this.showForm = false;
                    this.loading = false;
                    this.againModal = false;
                }
            );
        },
        handleDate(date) {
            this.filter.beginDate = date[0];
            this.filter.endDate = date[1];
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/checking/export/list",
                this.filter
            );
        },
        loadData() {
            this.loading = true;
            let form = this.filter;
            form.recvAccountName = this.recv.accountName;
            form.payAccountName = this.pay.accountName;
            getCheckingErrorList(form).then(res => {
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
        completeSelector
    }
};
</script>
