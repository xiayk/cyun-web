<style lang="less">
.xft-div {
    display: block;
    margin-left: 20px;
    margin-top: 5px;
}
.mg {
    margin: 5px 0;
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
                <FormItem label="账户名称">
                    <Input v-model="filter.accountName"></Input>
                </FormItem>
                <FormItem label="账户编号">
                    <Input v-model="filter.accountNo"></Input>
                </FormItem>
                <FormItem label="用户类型">
                    <Select v-model="filter.accountType" placeholder>
                        <Option value>全部</Option>
                        <Option value="3">个人</Option>
                        <Option value="1">企业</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="filter.state" placeholder>
                        <Option value>全部</Option>
                        <Option
                            v-for="item in stateArr"
                            :value="item.value"
                            :key="item.value"
                        >{{item.desc}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间">
                    <date-range-selector
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginDate"
                        :end-date.sync="filter.endDate"
                        placeholder
                    ></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({name: 'account-manage-add'})">创建账户</Button>
            <Button
                @click="handleBatchFreeze('-1')"
                :disabled="!selectedSelection.length"
                :loading="disable"
            >账户冻结</Button>
            <Button
                @click="handleBatchFreeze('1')"
                :disabled="!selectedSelection.length"
                :loading="enable"
            >账户解冻</Button>
            <Button @click="handleReta">自定义费率</Button>
            <Button @click="downloadExcel">导出execl</Button>
            <!-- <Button @click="handleBatchUnfreeze()" >导出</Button> -->
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
        <Modal width="680" v-model="rateModal" title="手续费率">
            <div style="font-size:20px;font-weight:bolder;">提现</div>
            <RadioGroup v-model="feeForm.feeType" style="width:100%;">
                <Radio style="margin-top:10px;" label="1">
                    <span>固定费率</span>
                    <Input style="width:120px;" v-model="feeForm.fee" placeholder="单位：元"></Input>
                </Radio>
                <Radio style="margin-top:10px;" label="2">
                    <span>按比例</span>
                    <Input style="width:120px;" v-model="feeForm.rate" placeholder="万分之"></Input>

                    <span>封顶金额</span>
                    <Input style="width:120px;" v-model="feeForm.maxAmount" placeholder="单位元"></Input>
                </Radio>
            </RadioGroup>
            <div slot="footer">
                <Button type="primary" :loading="modal_loading" @click="handleSave">保存</Button>
                <Button @click="handleCancel">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import merchantStateSelector from "components/merchant-state-selector";
import merchantProcessSelector from "components/merchant-process-selector";
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import storeSelector from "components/store-selector";
import InstitutionListSelector from "components/institution-list-selector";
import institutionSelector from "components/institution-selector";
import {
    getAccountList,
    freeZeLaLaLa,
    getStateAccount,
    getFeeDetail,
    updateFee,
    getOpenResult
} from "@/actions/wallet";
import { mapState } from "vuex";
export default {
    name: "account-manage",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            addModal: false,
            selectedSelection: [],
            storeModal: false,
            apiJinjianModal: false,
            apiJinjianLoading: false,
            insList: [],
            // Common("00", "普通商户(非连锁商户)"), ChainTogether("01", "连锁总店"), ChainSplit("02", "连锁分店"), Together("03", "1+n 总店"), Split("04", "1+n 分店");
            columns: [
                {
                    type: "selection",
                    width: 55,
                    align: "center"
                },
                {
                    key: "accountName",
                    title: "账户名称"
                },
                {
                    key: "accountNo",
                    title: "账户编号"
                },
                {
                    key: "accountTypeDesc",
                    title: "用户类型"
                },
                {
                    key: "agentName",
                    title: "归属代理商"
                },
                {
                    key: "clearInstitution",
                    title: "所属银行"
                },
                {
                    key: "createdAt",
                    title: "创建时间"
                },
                // {
                //     key: "processStateDesc",
                //     title: "最后操作时间"
                // },
                {
                    key: "stateDesc",
                    title: "状态"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 250,
                    render: (h, params) => {
                        let agin =
                            params.row.state == "3" &&
                            params.row.accountType !== "3";
                        return h("div", [
                            params.row.state !== "3" &&
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
                                                    name:
                                                        "account-manage-detail",
                                                    params: {
                                                        id: params.row.accountNo
                                                    },
                                                    query: {
                                                        state:
                                                            params.row
                                                                .accountType
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "账户信息"
                                ),
                            agin &&
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
                                                    name:
                                                        "account-manage-again",
                                                    params: {
                                                        id: params.row.accountNo
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "重新开户"
                                ),
                            params.row.state == "0" &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small",
                                            disabled: this.btnLoad
                                        },
                                        on: {
                                            click: () => {
                                                this.btnLoad = true;
                                                getOpenResult(
                                                    params.row.accountNo
                                                ).then(
                                                    res => {
                                                        this.$Notice.success({
                                                            title: "查询成功",
                                                            desc:
                                                                res.data
                                                                    .failure_msg
                                                        });
                                                        this.btnLoad = false;
                                                        this.loadData();
                                                    },
                                                    err => {
                                                        this.btnLoad = false;
                                                    }
                                                );
                                            }
                                        }
                                    },
                                    "更新状态"
                                ),
                            params.row.state == "4" &&
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
                                                    name: "account-manage-make",
                                                    params: {
                                                        id: params.row.accountNo
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "打款验证"
                                ),
                            (params.row.state == "1" ||
                                params.row.state == "-1") &&
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
                                                    name:
                                                        "account-manage-balance",
                                                    params: {
                                                        id: params.row.accountNo
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "账户余额"
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
                state: "",
                accountNo: "",
                accountName: "",
                accountType: "",
                clearInstitution: ""
            },
            data: [],
            total: 0,
            stateArr: [],
            rateModal: false,
            value: "",
            modal_loading: false,
            feeForm: {
                types: "2",
                feeType: "1",
                fee: "",
                rate: "",
                maxAmount: ""
            },
            btnLoad: false
        };
    },
    methods: {
        handleReta() {
            if (this.selectedSelection.length > 1) {
                this.$lf.message("只能选择一项自定义费率项", "error");
                return;
            }
            let { accountNo } = this.selectedSelection[0];
            getFeeDetail(accountNo).then(res => {
                if (res.data.itemParams.length) {
                    let {
                        types,
                        feeType,
                        fee,
                        rate,
                        maxAmount
                    } = res.data.itemParams[0];
                    this.feeForm = {
                        types,
                        feeType,
                        fee,
                        rate,
                        maxAmount
                    };
                }
                this.rateModal = true;
            });
        },
        handleSave() {
            let { feeType, fee, rate, maxAmount } = this.feeForm;
            if (
                (feeType == 1 && fee) ||
                ((feeType == 2 && rate) || maxAmount)
            ) {
                this.modal_loading = true;
                let accountNoArr = this.selectedSelection.map(v => {
                    return {
                        accountNo: v.accountNo,
                        itemParams: [this.feeForm]
                    };
                });
                updateFee({
                    feeInfos: accountNoArr
                }).then(
                    res => {
                        this.modal_loading = false;
                        this.$lf.message("设置成功", "success");
                        this.handleCancel();
                        this.loadData();
                    },
                    () => {
                        this.modal_loading = false;
                    }
                );
            }
        },
        handleCancel() {
            this.feeForm = {
                types: "2",
                feeType: "1",
                fee: "",
                rate: "",
                maxAmount: ""
            };
            this.selectedSelection = [];
            this.rateModal = false;
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/account/export/list",
                this.filter
            );
        },
        addApiJinJianSubmit() {
            this.$refs.apiForm.validate(valid => {
                if (valid) {
                    this.apiJinjianLoading = true;
                    feedMerchantApi(this.apiForm).then(
                        res => {
                            this.apiJinjianLoading = false;
                            this.$lf.message("进件成功", "success");
                            this.apiJinjianModal = false;
                        },
                        () => {
                            this.apiJinjianLoading = false;
                        }
                    );
                }
            });
        },
        getStoreDataList(id) {
            getMerchantStoreDataList(id).then(res => {
                this.storeData = res.data.rows;
                this.showStoreData(true);
            });
        },
        typesChange(val) {
            this.$forceUpdate();
        },
        loadData() {
            this.loading = true;
            getAccountList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                () => {
                    this.loading = false;
                }
            );
            this.handleState();
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleBatchFreeze(state) {
            let msg = state == "1" ? "解冻" : "冻结";
            if (this.selectedSelection.length > 1) {
                this.$lf.message(`只能选择一项${msg}`, "error");
                return;
            }

            state == "-1" ? (this.disable = true) : (this.enable = true);
            freeZeLaLaLa({
                accountNo: this.selectedSelection[0].accountNo,
                freezeFlag: state
            }).then(
                res => {
                    this.loadData();
                    this.$lf.message(`${msg}成功`, "success");
                    state == "-1"
                        ? (this.disable = false)
                        : (this.enable = false);
                    this.selectedSelection = [];
                },
                err => {
                    state == "-1"
                        ? (this.disable = false)
                        : (this.enable = false);
                }
            );
        },
        handleBatchUnfreeze(selection) {
            let ids = this.selectedSelection.map(item => {
                return item.merchantId;
            });
            if (ids.length > 0) {
                this.enable = true;
                freezeOrUnFreezeMerchant("unfrozen", {
                    merchantIds: ids
                }).then(
                    res => {
                        this.loadData();
                        this.$lf.message("解冻成功", "success");
                        this.enable = false;
                    },
                    err => {
                        this.enable = false;
                    }
                );
            } else {
                this.$lf.message("请选择解冻项", "info");
            }
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        reset() {
            this.$refs.filterForm.resetFields();
        },
        addSecretInfo(e) {
            this.$refs.secretInfo.validate(valid => {
                if (valid) {
                    this.loading = true;
                    saveMerchantSecretInfo(this.secretInfo).then(
                        res => {
                            this.loading = false;
                            this.$lf.message("保存成功", "success");
                            this.showAddProduct(false);
                            this.resetSecretInfo();
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        },
        addStoreFormInfo(e) {
            this.$refs.storeFormInfo.validate(valid => {
                if (valid) {
                    this.loading = true;
                    addSingleStoreForMerchant(this.storeForm).then(
                        res => {
                            this.loading = false;
                            this.$lf.message("保存成功", "success");
                            this.getStoreDataList(this.storeForm.merchantId);
                            this.showAddStoreForm(false);
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        },
        showAddProduct(status) {
            this.addModal = status;
        },
        resetSecretInfo() {
            this.secretInfo = {
                merchantId: "",
                appSecret: "",
                types: "MD5",
                publicKey: "",
                privateKey: ""
            };
        },
        showStoreData(status) {
            this.storeModal = status;
        },
        showAddStoreForm(status) {
            this.storeFormModal = status;
        },
        handleState() {
            getStateAccount().then(res => {
                this.stateArr = res.data;
            });
        }
    },
    watch: {
        addModal(val) {
            if (!val) {
                this.resetSecretInfo();
            }
        }
    },
    computed: mapState({
        userType: state => state.user.userInfo.userType
    }),
    components: {
        merchantStateSelector,
        dateRangeSelector,
        pagination,
        merchantProcessSelector,
        storeSelector,
        InstitutionListSelector,
        institutionSelector
    }
};
</script>
