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
        <h3 style="padding:5px">对账汇总</h3>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination
            :total="total"
            :limit.sync="filter.limit"
            :offset.sync="filter.offset"
            @on-load="loadData"
        ></pagination>
        <h3 style="padding:5px">对账批次</h3>
        <Table :loading="loading" border stripe :columns="columns2" :data="data2"></Table>
        <pagination
            :total="total2"
            :limit.sync="filter2.limit"
            :offset.sync="filter2.offset"
            @on-load="loadData2"
        ></pagination>
        <Modal v-model="againModal" title="重新对账">
            <p>确定要重新对账吗？</p>
            <p>请谨慎操作是否要重新对账</p>
            <div slot="footer">
                <div class="ivu-poptip_">
                    <!-- <Poptip confirm title="您确定要重新对账" ok-text="重新对账" cancel-text="不允许对账" @on-ok="handleAgain"> -->
                    <Button type="primary" @click="handleClick">确定</Button>
                    <!-- </Poptip> -->
                    <Button type="text" @click="againModal = false">取消</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import institutionSelector from "components/institution-selector";
import accountSelector from "components/account-selector";
import {
    getCollectOrBatchList,
    getCollectChargeDate
} from "@/actions/accounts";
import moment from "moment-mini";
export default {
    name: "account-summary",
    data() {
        return {
            loading: false,
            selectedSelection: [],
            columns: [
                {
                    key: "clearInstitution",
                    title: "所属银行"
                },
                {
                    title: "星富通",
                    children: [
                        {
                            title: "平台总笔数(A1)",
                            key: "xftCount"
                        },
                        {
                            title: "平台总金额(元)(B1)",
                            key: "xftAmountCollect"
                        }
                    ]
                },
                {
                    title: "银行",
                    children: [
                        {
                            title: "银行总笔数(A2)",
                            key: "bankCount"
                        },
                        {
                            title: "银行总金额(元)(B2)",
                            key: "bankAmountCollect"
                        }
                    ]
                },
                {
                    title: "差额",
                    children: [
                        {
                            title: "差额笔数(A3=A2-A1)",
                            key: "errorCount"
                        },
                        {
                            title: "差额金额(元)(B3=B2-B1)",
                            key: "errorAmountCollect"
                        }
                    ]
                }
            ],
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
            filter2: {
                offset: 0,
                limit: 10
            },
            data2: [],
            total2: 0,
            columns2: [
                {
                    key: "checkingBatchNo",
                    title: "对账批次号"
                },
                {
                    key: "chargeDate",
                    title: "对账日期"
                },
                {
                    key: "clearInstitution",
                    title: "所属银行"
                },
                {
                    key: "checkingResultStateDesc",
                    title: "对账结果"
                },
                {
                    title: "星富通",
                    children: [
                        {
                            title: "平台总笔数",
                            key: "xftCount"
                        },
                        {
                            title: "平台总金额(元)",
                            key: "xftAmountCollect"
                        }
                    ]
                },
                {
                    title: "银行",
                    children: [
                        {
                            title: "银行总笔数",
                            key: "bankCount"
                        },
                        {
                            title: "银行总金额(元)",
                            key: "bankAmountCollect"
                        }
                    ]
                },
                {
                    title: "差额",
                    children: [
                        {
                            title: "差额笔数",
                            key: "errorCount"
                        },
                        {
                            title: "差额金额(元)",
                            key: "errorAmountCollect"
                        }
                    ]
                },
                {
                    title: "操作",
                    key: "action",
                    // fixed: "right",
                    render: (h, params) => {
                        let date = moment().format("YYYY-MM-DD");
                        let day = this.datedifference(
                            params.row.chargeDate,
                            date
                        );
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        backgroundColor: day > 30 ? "#ccc" : ""
                                    },
                                    on: {
                                        click: () => {
                                            this.againModal = true;
                                            this.chargeDate =
                                                params.row.checkingBatchNo;
                                        }
                                    }
                                },
                                "重新对账"
                            )
                        ]);
                    }
                }
            ],
            againModal: false,
            chargeDate: ""
        };
    },
    computed: {
        startDate() {
            return (
                moment()
                    .subtract(7, "days")
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
                "/zb/admin/checking/export/list",
                this.filter
            );
        },
        loadData() {
            this.loading = true;
            getCollectOrBatchList("collect", this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
            // console.log(Object.assign(this.filter,this.filter2))
        },
        loadData2() {
            this.loading = true;
            getCollectOrBatchList(
                "batch",
                Object.assign(this.filter, this.filter2)
            ).then(res => {
                this.loading = false;
                this.data2 = res.data.rows;
                this.total2 = res.data.total;
            });
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleFilter() {
            this.filter.offset = 0;
            this.filter2.offset = 0;
            this.loadData();
            this.loadData2();
        },
        datedifference(sDate1, sDate2) {
            //sDate1和sDate2是2006-12-18格式
            var dateSpan, tempDate, iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays;
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
        accountSelector
    }
};
</script>
