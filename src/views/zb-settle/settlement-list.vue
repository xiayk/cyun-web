<style lang="less">
.ac-menu-a {
    display: inline-block;
    min-width: 80px;
    width: 100%;
    text-align: center;
}

.demo-upload-list {
    display: inline-block;
    margin-right: 4px;
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
                <FormItem label="账单生成时间">
                    <date-range-selector
                        style="width:100%"
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginDate"
                        :end-date.sync="filter.endDate"
                    ></date-range-selector>
                </FormItem>
                <FormItem label="代理商名称">
                    <zbAgentSelector :account="agentObj" v-model="filter.agentCode"></zbAgentSelector>
                </FormItem>
                <FormItem label="代理商编号">
                    <zbAgentSelector :account="agentObj" :code="true" v-model="filter.agentCode"></zbAgentSelector>
                </FormItem>
                <FormItem label="结算单号">
                    <Input v-model="filter.settleNo" clearable></Input>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="费用扣除方式">
                    <Select v-model="filter.deductType" clearable>
                        <Option value>全部</Option>
                        <Option value="1">实时扣除</Option>
                        <Option value="2">记账后收</Option>
                    </Select>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="filter.state" clearable>
                        <Option value>全部</Option>
                        <Option value="0">待结算</Option>
                        <Option value="1">待初审</Option>
                        <Option value="2">待复核</Option>
                        <Option value="5">已结算</Option>
                        <Option value="3">初审不通过</Option>
                        <Option value="4">复核不通过</Option>
                    </Select>
                </FormItem>

                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button
                @click="handleBatchAudit"
                :disabled="!selectedSelection.length"
                type="primary"
                :loading="disable"
            >批量审核</Button>
            <Button @click="downloadExcel" type="primary">导出</Button>
        </div>
        <Tabs value="1" @on-click="handleTab">
            <TabPane label="按月结算" name="1">
                <template v-if="filter.cycle=='1'">
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
                </template>
            </TabPane>
            <TabPane label="按季度结算" name="2">
                <template v-if="filter.cycle=='2'">
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
                </template>
            </TabPane>
            <TabPane label="按年结算" name="3">
                <template v-if="filter.cycle=='3'">
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
                </template>
            </TabPane>
        </Tabs>

        <Modal v-model="settleShow" title="结算信息" width="650">
            <h3 style="padding:5px">账单详情</h3>
            <Table
                :show-header="false"
                :loading="cashLoading"
                border
                stripe
                :columns="cum1"
                :data="data1"
            ></Table>
            <template v-if="uploadList.length">
                <h3 style="padding:5px">付款凭证</h3>
                <div v-for="item in uploadList" class="demo-upload-list">
                    <ImagePreview :imageUrl="item"></ImagePreview>
                </div>
            </template>
            <template v-if="data2.length">
                <h3 style="padding:5px">审核记录</h3>
                <Table :loading="cashLoading" border stripe :columns="cum2" :data="data2"></Table>
            </template>
            <template v-if="cashTitle!=='查看结算单'">
                <h3 style="padding:5px">处理意见</h3>
                <Input v-model="remark" type="textarea" :rows="4"></Input>
            </template>
            <div slot="footer">
                <template v-if="cashTitle == '审核'">
                    <Button type="primary" :loading="notPass" @click="handleToExamine('1')">审核通过</Button>
                    <Button type="primary" :loading="notPass" @click="handleToExamine('-2')">审核不通过</Button>
                    <Button @click="handleSettle(false)">取消</Button>
                </template>
                <template v-else>
                    <Button type="primary" @click="handleSettle(false)">确定</Button>
                </template>
            </div>
        </Modal>
        <Modal v-model="batch" :title="cashTitle" width="650">
            <Alert type="error" show-icon>
                批量提现属资金操作，请谨慎操作
                <span
                    slot="desc"
                >本次批量提现共{{selectedSelection.length}}笔，提现总额{{account}}元</span>
            </Alert>

            <h3 style="padding:5px">处理意见</h3>
            <Input v-model="remark" type="textarea" :rows="4"></Input>
            <template slot="footer">
                <Button type="primary" :loading="notPass" @click="handleToExamine('1')">确定</Button>
                <Button @click="batch = false">取消</Button>
            </template>
        </Modal>
    </div>
</template>

<script>
import zbAgentSelector from "components/zb-agent-selector";
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import {
    getZbAdminSettleManagerList,
    getZbSettleBatch,
    getZbSettleAudit
} from "@/actions/wallet";
import institutionSelector from "components/institution-selector";
import { mapState } from "vuex";
import Cookies from "js-cookie";
import ImagePreview from "components/image-preview";
export default {
    name: "settle-account-settlement",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            selectedSelection: [],
            columns: [
                {
                    type: "selection",
                    width: 55
                },
                {
                    key: "dailyTime",
                    title: "账单时间"
                },
                {
                    key: "createdAt",
                    title: "账单生成时间"
                },
                {
                    key: "settleNo",
                    title: "结算单号"
                },
                {
                    key: "agentName",
                    title: "代理商名称"
                },
                {
                    key: "agentCode",
                    title: "代理商编号"
                },
                {
                    key: "settleAmount",
                    title: "结算金额(元)"
                },
                {
                    key: "settleTime",
                    title: "结算时间"
                },

                // {
                //     key: "clearInstitutionDesc",
                //     title: "所属银行"
                // },
                {
                    key: "deductTypeDesc",
                    title: "费用扣除方式"
                },
                {
                    key: "stateDesc",
                    title: "状态"
                },
                {
                    key: "attach",
                    title: "摘要"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 200,
                    render: (h, params) => {
                        let role = JSON.parse(Cookies.get("roleId"));
                        var isFinance = false;
                        role.forEach(v => {
                            isFinance = v == "30024" ? true : false;
                        });
                        let text =
                            params.row.state == 1 && this.userType == 1
                                ? "审核"
                                : params.row.state == 2 && isFinance
                                ? "审核"
                                : "查看结算单";
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
                                            this.cashTitle = text;
                                            this.tableForm = params.row;
                                            this.cashLoading = true;
                                            getZbSettleBatch(
                                                params.row.settleNo
                                            ).then(res => {
                                                this.data2 = res.data;
                                            });
                                            this.settleShow = true;
                                            this.cashLoading = false;
                                            this.withdrawal = true;
                                            this.remark = "";
                                            this.uploadList = params.row.credentialUrl.split(
                                                ","
                                            );
                                        }
                                    }
                                },
                                text
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
                                            this.$router.push({
                                                name: "settle-bill-detail",
                                                params: {
                                                    settleId:
                                                        params.row.settleId
                                                },
                                                query: {
                                                    cycle: this.filter.cycle
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看明细"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                settleNo: "",
                clearInstitution: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                state: "",
                deductType: "",
                agentCode: "",
                cycle: "1"
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
            cum2: [
                {
                    title: "处理人",
                    key: "auditName"
                },
                {
                    title: "处理时间",
                    key: "auditTime"
                },
                {
                    title: "处理意见",
                    key: "remark"
                },
                {
                    title: "处理状态",
                    key: "auditStateDesc"
                }
            ],
            data2: [],
            // data1: [],
            tableForm: {},
            cashTitle: "查看结算单",
            batch: false,
            agentObj: {},
            settleShow: false,
            notPass: false,
            pass: false,
            account: 0,
            uploadList: []
        };
    },
    methods: {
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/settle/export/bill/manager/list",
                this.filter
            );
        },
        handleTab(name) {
            this.filter.cycle = name;
            this.loadData();
        },
        handleSettle(state) {
            this.settleShow = state;
            this.notPass = false;
            this.pass = false;
        },
        handleToExamine(state) {
            let type = this.userType == 1 ? "first" : "second",
                _this = this;
            this.$Modal.confirm({
                title: `确定审核${
                    type == "first" && state == "1" ? "" : "不"
                }通过吗?`,
                content: "请再次核查信息，你还要继续吗？",
                loading: true,
                onOk() {
                    _this.audit(state);
                },
                onCancel() {
                    _this.$Modal.remove();
                }
            });
        },
        audit(state) {
            let {
                remark,
                filter,
                selectedSelection,
                tableForm,
                cashTitle
            } = this;
            let form = [],
                isFinance = this.roleType ? "second" : "first",
                first = isFinance == "first" && state == "1" ? "2" : "3",
                second = isFinance == "second" && state == "1" ? "5" : "4";
            if (cashTitle == "审核") {
                form = [
                    {
                        settleId: tableForm.settleId,
                        cycle: filter.cycle,
                        auditState: isFinance == "first" ? first : second,
                        attach: remark
                    }
                ];
            } else {
                form = selectedSelection.map(v => {
                    return {
                        settleId: v.settleId,
                        cycle: filter.cycle,
                        auditState: isFinance == "first" ? first : second,
                        attach: remark
                    };
                });
            }

            this.notPass = true;
            getZbSettleAudit(isFinance, form).then(
                res => {
                    this.notPass = false;
                    if (res.data) {
                        this.$Notice.success({
                            title: "成功提示",
                            desc: "审核成功"
                        });
                    } else {
                        this.$Notice.success({
                            title: "错误提示",
                            desc: "审核失败"
                        });
                    }
                    this.settleShow = false;
                    this.batch = false;
                    this.loadData();
                    this.$Modal.remove();
                    this.selectedSelection = [];
                },
                () => {
                    this.notPass = false;
                    this.$Modal.remove();
                }
            );
        },
        handleBatchAudit() {
            if (!this.selectedSelection.length) {
                this.$Notice.error({
                    title: "错误提示",
                    desc: "请选择需要批量审核的项目"
                });
                return;
            }
            this.selectedSelection.map(v => {
                this.account += v.settleAmount;
            });
            this.batch = true;
            this.remark = "";
            this.tableForm = {};
            this.cashTitle = "批量提现审核";
        },
        handleCorrect() {},

        loadData() {
            this.loading = true;
            getZbAdminSettleManagerList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                () => {
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

    computed: {
        data1: {
            get: function() {
                let _this = this.tableForm;
                return [
                    // {
                    //     title: "所属银行",
                    //     key: _this.clearInstitutionDesc
                    // },
                    {
                        title: "代理商名称",
                        key: _this.agentName
                    },
                    {
                        title: "代理商编号",
                        key: _this.agentCode
                    },
                    {
                        title: "费用扣除方式",
                        key: _this.deductTypeDesc
                    },
                    {
                        title: "结算金额",
                        key: _this.settleAmount
                    },
                    {
                        title: "账单时间",
                        key: _this.dailyTime
                    },
                    {
                        title: "状态",
                        key: _this.stateDesc
                    }
                ];
            },
            set: function() {}
        },
        userType() {
            return this.$store.state.user.userInfo.userType;
        },
        roleType() {
            let role = JSON.parse(Cookies.get("roleId"));
            var isFinance = false;
            role.forEach(v => {
                isFinance = v == "30024" ? true : false;
            });
            return isFinance;
        }
    },

    components: {
        dateRangeSelector,
        pagination,
        institutionSelector,
        zbAgentSelector,
        ImagePreview
    }
};
</script>
