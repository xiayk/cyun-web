<style lang="less">
.ac-menu-a {
    display: inline-block;
    min-width: 80px;
    width: 100%;
    text-align: center;
}
.ivu-poptip_ .ivu-poptip-confirm {
    text-align: left;
}
.subBtn {
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
                <FormItem label="对账结果">
                    <Select v-model="filter.checkingResultState" placeholder clearable>
                        <Option value>全部</Option>
                        <Option value="00">对平</Option>
                        <Option value="09">对账中</Option>
                        <Option value="01">未对平</Option>
                        <Option value="10">对账失败</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="账单日期">
                    <date-range-selector
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginDate"
                        :end-date.sync="filter.endDate"
                        placeholder
                    ></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button @click="downloadExcel">导出</Button>
                </FormItem>
            </Form>
        </Card>
        <Table
            :loading="loading"
            border
            stripe
            :columns="userType == '7'?column2:column1"
            :data="data"
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
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import institutionSelector from "components/institution-selector";
import accountSelector from "components/account-selector";
import {
    getZbAdminColleList,
    getZbAdminColleAgentList,
    getCollectChargeDate
} from "@/actions/accounts";
import moment from "moment-mini";
import { mapState } from "vuex";
import { cumArr1, cumArr2 } from "./validate";
export default {
    name: "account-batch-manage",
    data() {
        return {
            loading: false,
            selectedSelection: [],

            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                checkingResultState: "",
                beginDate: "",
                endDate: "",
                clearInstitution: ""
            },
            data: [],
            total: 0,
            column1: [
                ...cumArr1,
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
                                            let {
                                                _dateRange,
                                                clearInstitution
                                            } = this.filter;
                                            this.$router.push({
                                                name: "account-detailed",
                                                query: {
                                                    params: JSON.stringify({
                                                        // checkingResultState,
                                                        // beginDate,
                                                        // endDate,
                                                        clearInstitution,
                                                        _billDateRange: [
                                                            params.row
                                                                .chargeDate +
                                                                " 00:00:00",
                                                            params.row
                                                                .chargeDate +
                                                                " 23:59:59"
                                                        ]
                                                    })
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
            column2: [
                ...cumArr2,
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
                                            let {
                                                _dateRange,
                                                clearInstitution
                                            } = this.filter;
                                            this.$router.push({
                                                name: "account-detailed",
                                                query: {
                                                    params: JSON.stringify({
                                                        // checkingResultState,
                                                        // beginDate,
                                                        // endDate,
                                                        clearInstitution,
                                                        _billDateRange: [
                                                            params.row
                                                                .checkingDaily +
                                                                " 00:00:00",
                                                            params.row
                                                                .checkingDaily +
                                                                " 23:59:59"
                                                        ]
                                                    })
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
            ]
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
        this.filter._dateRange = [
            moment()
                .subtract(30, "days")
                .format("YYYY-MM-DD") +
                " " +
                "00:00:00",
            moment().format("YYYY-MM-DD") + " " + "23:59:59"
        ];
    },
    methods: {
        handleClick() {
            this.loading = true;
            getCollectChargeDate(this.chargeDate).then(
                res => {
                    this.loading = false;
                    if (!res.data) {
                        this.$Notice.error({
                            title: "重新开户失败",
                            desc: res.data.message
                        });
                    }
                    this.loadData();
                    this.loadData2();
                    this.againModal = false;
                },
                err => {
                    this.loading = false;
                    this.againModal = false;
                }
            );
        },
        handleAgain() {
            this.loading = true;
            getCollectChargeDate(this.chargeDate).then(
                res => {
                    this.loading = false;
                    if (!res.data) {
                        this.$Notice.error({
                            title: "重新对账失败"
                        });
                    }

                    this.loadData();
                    this.loadData2();
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleDate(date) {
            this.filter.beginDate = date[0];
            this.filter.endDate = date[1];
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/checking/export/collect/agent/list",
                this.filter
            );
        },
        loadData() {
            this.loading = true;
            let url =
                this.userType == "7"
                    ? "/zb/admin/checking/collect/agent/list"
                    : "/zb/admin/checking/batch/list";
            getZbAdminColleList(url, this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    computed: mapState({
        userType: state => state.user.userInfo.userType
    }),
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
        accountSelector
    }
};
</script>
