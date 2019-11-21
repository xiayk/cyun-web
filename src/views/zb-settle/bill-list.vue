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
                <FormItem label="结算单号">
                    <Input v-model="filter.settleNo" clearable></Input>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="filter.state" clearable>
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
            <Button type="primary" @click="downloadExcel">导出</Button>
        </div>
        <Tabs value="1" @on-click="handleTab">
            <TabPane label="按月结算" name="1">
                <template v-if="filter.cycle == '1'">
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
                <template v-if="filter.cycle == '2'">
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
                <template v-if="filter.cycle == '3'">
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

            <h3 style="padding:5px">付款凭证</h3>
            <!-- cashTitle !== '确认结算单' -->
            <template v-if="false">
                <div v-for="item in uploadList" class="demo-upload-list">
                    <ImagePreview :imageUrl="item"></ImagePreview>
                </div>
            </template>
            <ImageUpload
                v-else
                :config="uploadConfig"
                v-model="tableForm.credentialUrl"
                @on-change="handleUploadList"
                ref="imageUpload"
            ></ImageUpload>

            <template v-if="data2.length">
                <h3 style="padding:5px">审核记录</h3>
                <Table :loading="cashLoading" border stripe :columns="cum2" :data="data2"></Table>
            </template>
            <template slot="footer">
                <template v-if="cashTitle == '确认结算单'">
                    <Button type="primary" :loading="loadUpload" @click="handleToExamine('1')">确定</Button>
                    <Button @click="handleSettle(false)">取消</Button>
                </template>
                <template v-else>
                    <Button type="primary" @click="handleSettle(false)">确定</Button>
                </template>
            </template>
        </Modal>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import {
    getZbAdminSettleList,
    getZbSettleBatch,
    getZbSettleSave
} from "@/actions/wallet";
import institutionSelector from "components/institution-selector";
import ImagePreview from "components/image-preview";
import ImageUpload from "./image-upload/index";
import { closeCurrentErrPage, uploadConfig } from "@/constants/constant";
export default {
    name: "settle-acccount-bill",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            selectedSelection: [],
            columns: [
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
                    key: "settleAmount",
                    title: "结算金额(元)"
                },
                {
                    key: "settleTime",
                    title: "结算时间"
                },
                // {
                //     key: "clearInstitutionDesc",
                //     title: "所属银行",
                //     width: 200,
                //     align: "center"
                // },
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
                    render: (h, params) => {
                        let text =
                            params.row.state == "0" ||
                            params.row.state == "3" ||
                            params.row.state == "4"
                                ? "确认结算单"
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
                                            // if(text == "查看结算单"){
                                            this.uploadList = params.row.credentialUrl.split(
                                                ","
                                            );
                                            this.$refs.imageUpload.handleCleanUrl();
                                            getZbSettleBatch(
                                                params.row.settleNo
                                            ).then(res => {
                                                this.data2 = res.data;
                                            });
                                            this.settleShow = true;
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
                                                    cycle: this.filter.cycle,
                                                    params: JSON.stringify(
                                                        params.row
                                                    )
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看明细"
                            )

                            // h(
                            //     "Button",
                            //     {
                            //         props: {
                            //             type: "text",
                            //             size: "small"
                            //         },
                            //         on: {
                            //             click: () => {

                            //             }
                            //         }
                            //     },
                            //     "审核"
                            // )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                clearInstitution: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                state: "",
                settleNo: "",
                cycle: "1"
            },
            data: [],
            remark: "",
            total: 0,
            cashLoading: false,
            settleShow: false,
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
            // data1:[],
            tableForm: {},
            cashTitle: "",
            batch: false,
            data2: [],
            uploadConfig: {
                ...uploadConfig,
                type: "drag",
                format: ["jpg", "jpeg", "png"]
            },
            img: "",
            uploadList: [],
            credentialUrl: "",
            loadUpload: false
        };
    },
    watch: {
        credentialUrl(val) {}
    },
    computed: {
        data1() {
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
                    title: "结算时间",
                    key: _this.settleTime
                },
                {
                    title: "状态",
                    key: _this.stateDesc
                }
            ];
        }
    },
    methods: {
        handleTab(name) {
            this.filter.cycle = name;
            this.loadData();
        },
        handleToExamine(state) {
            if (!this.credentialUrl) {
                this.$Notice.error({
                    title: "提示信息",
                    desc: "请上传付款凭证"
                });
                return;
            }

            this.handleUploadImg();
        },
        handleUploadImg() {
            let { tableForm, filter, credentialUrl } = this;
            this.loadUpload = true;
            getZbSettleSave({
                settleId: tableForm.settleId,
                cycle: filter.cycle,
                credentialUrl
            }).then(
                res => {
                    this.loadUpload = false;
                    this.loadData();
                    this.settleShow = false;
                    this.$Notice.success({
                        title: "成功提示",
                        desc: "操作成功"
                    });
                },
                () => {
                    this.loadUpload = false;
                }
            );
        },
        handleUploadList(val) {
            this.credentialUrl = val.join(",");
        },
        handleSettle(state) {
            this.settleShow = state;
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/settle/export/bill/list",
                this.filter
            );
        },
        handleCorrect() {},
        loadData() {
            this.loading = true;
            getZbAdminSettleList(this.filter).then(
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
    components: {
        dateRangeSelector,
        pagination,
        institutionSelector,
        ImageUpload,
        ImagePreview
    }
};
</script>
