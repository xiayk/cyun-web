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
                <FormItem label="商户订单号">
                    <Input v-model="filter.outTradeNo" clearable></Input>
                </FormItem>
                <FormItem label="账号名称">
                    <Input v-model="filter.name" clearable></Input>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="申请时间">
                    <date-range-selector
                        style="width:100%"
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginDate"
                        :end-date.sync="filter.endDate"
                    ></date-range-selector>
                </FormItem>
                <FormItem label="审核状态">
                    <Select v-model="filter.auditState" clearable>
                        <Option value="1">审核通过</Option>
                        <Option value="2">审核拒绝</Option>
                        <Option value="0">待审核</Option>
                    </Select>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button @click="handleBatchAudit" type="primary" :loading="disable">批量审核</Button>
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
        <Modal v-model="withdrawal" :title="cashTitle" width="650">
            <h3 style="padding:5px">提现详情</h3>
            <Table
                :show-header="false"
                :loading="cashLoading"
                border
                stripe
                :columns="cum1"
                :data="data1"
            ></Table>
            <template v-if="cashTitle == '提现审核'">
                <h3 style="padding:5px">处理意见</h3>
                <Input v-model="remark" type="textarea" :rows="4"></Input>
            </template>
            <template slot="footer">
                <template v-if="cashTitle == '提现审核'">
                    <Button type="primary" :loading="loadPass" @click="handleBatch('1')">审核通过</Button>
                    <Button @click="handleBatch('2')" :loading="loadNotPass">审核不通过</Button>
                </template>
                <template v-else>
                    <Button type="primary" @click="withdrawal = false">确定</Button>
                </template>
            </template>
        </Modal>
        <Modal v-model="batch" title="批量提现审核" width="650">
            <Alert type="error" show-icon>
                批量提现属资金操作，请谨慎操作
                <span
                    slot="desc"
                >本次批量提现共{{selectedSelection.length}}笔，提现总额{{account}}元</span>
            </Alert>

            <h3 style="padding:5px">处理意见</h3>
            <Input v-model="remark" type="textarea" :rows="4"></Input>
            <template slot="footer">
                <Button type="primary" :loading="loadPass" @click="handleBatch('1')">确定</Button>
                <Button @click="batch = false">取消</Button>
            </template>
        </Modal>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import {
    getFinanceCashAuditList,
    handleShWithDraw,
    getZbAdminWithdrawBatch
} from "@/actions/wallet";
import institutionSelector from "components/institution-selector";
export default {
    name: "wallet-cash-audit",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            selectedSelection: [],
            columns: [
                {
                    type: "selection",
                    width: 55,
                    align: "center"
                },
                {
                    key: "outTradeNo",
                    title: "商户订单号"
                },
                {
                    key: "createdAt",
                    title: "申请时间"
                },
                {
                    key: "accountName",
                    title: "账号名称"
                },
                {
                    key: "amount",
                    title: "提现金额(元)"
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
                    key: "auditStateDesc",
                    title: "审核状态"
                },
                {
                    key: "auditName",
                    title: "处理意见"
                },
                {
                    type: "action",
                    title: "操作",
                    align: "center",
                    render: (h, params) => {
                        return params.row.auditState == 0
                            ? h("div", [
                                  h(
                                      "Button",
                                      {
                                          props: {
                                              type: "text",
                                              size: "small"
                                          },
                                          on: {
                                              click: () => {
                                                  this.cashTitle = "提现审核";
                                                  this.tableForm = params.row;
                                                  this.withdrawal = true;
                                                  this.remark = "";
                                              }
                                          }
                                      },
                                      "审核"
                                  )
                              ])
                            : h("div", [
                                  h(
                                      "Button",
                                      {
                                          props: {
                                              type: "text",
                                              size: "small"
                                          },
                                          on: {
                                              click: () => {
                                                  this.cashTitle = "提现详情";
                                                  this.tableForm = params.row;
                                                  this.withdrawal = true;
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
                name: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                auditState: "",
                outTradeNo: "",
                accountNo: ""
            },
            data: [],
            remark: "",
            total: 0,
            cashLoading: false,
            withdrawal: false,
            cum1: [
                {
                    key: "title"
                },
                {
                    key: "key"
                }
            ],
            // data1:[],
            tableForm: {},
            cashTitle: "提现详情",
            batch: false,
            account: 0,
            loadPass: false,
            loadNotPass: false
        };
    },
    computed: {
        data1() {
            let _this = this.tableForm;
            return [
                {
                    title: "所属银行",
                    key: _this.clearInstitutionDesc
                },
                {
                    title: "交易类型",
                    key: "提现"
                },
                {
                    title: "商户订单号",
                    key: _this.outTradeNo
                },
                {
                    title: "付款方",
                    key: _this.accountName
                },
                {
                    title: "收款方",
                    key: _this.accountName
                },
                {
                    title: "提现金额",
                    key: _this.amount
                },
                {
                    title: "申请时间",
                    key: _this.createdAt
                }
            ];
        }
    },
    methods: {
        handleBatch(auditState) {
            let { remark, selectedSelection, tableForm, cashTitle } = this;
            let form = "";
            if (cashTitle == "提现审核") {
                form = [
                    {
                        outTradeNo: tableForm.outTradeNo,
                        remark,
                        auditState
                    }
                ];
            } else {
                let formData = selectedSelection.map(v => {
                    return {
                        outTradeNo: v.outTradeNo,
                        remark,
                        auditState
                    };
                });
                form = formData;
            }
            auditState == "1"
                ? (this.loadPass = true)
                : (this.loadNotPass = true);
            getZbAdminWithdrawBatch(form).then(
                res => {
                    if (res.data) {
                        this.$Notice.success({
                            title: "操作成功"
                        });
                    } else {
                        this.$Notice.success({
                            title: "操作失败"
                        });
                    }
                    this.withdrawal = false;
                    this.batch = false;
                    auditState == "1"
                        ? (this.loadPass = false)
                        : (this.loadNotPass = false);
                    this.loadData();
                },
                () => {
                    auditState == "1"
                        ? (this.loadPass = false)
                        : (this.loadNotPass = false);
                }
            );
            this.selectedSelection = [];
        },
        handleCorrect() {},
        handleBatchAudit() {
            if (!this.selectedSelection.length) {
                this.$Notice.error({
                    title: "错误提示",
                    desc: "请选择需要批量审核的项目"
                });
                return;
            }
            this.selectedSelection.map(v => {
                this.account += v.amount;
            });
            this.batch = true;
            this.remark = "";
        },
        loadData() {
            this.loading = true;
            getFinanceCashAuditList(this.filter).then(
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
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        institutionSelector
    }
};
</script>
