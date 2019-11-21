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
        <FormItem label="登录账号">
          <Input v-model="filter.userName"></Input>
        </FormItem>
        <FormItem label="真实姓名">
          <Input v-model="filter.name"></Input>
        </FormItem>
        <FormItem label="身份证号码">
          <Input v-model="filter.idNo"></Input>
        </FormItem>
        <FormItem label="注册时间">
          <date-range-selector
            style="width:100%"
            v-model="filter._dateRange"
            :start-date.sync="filter.beginDate"
            :end-date.sync="filter.endDate"
          ></date-range-selector>
        </FormItem>
        <FormItem label="账户状态">
          <wallet-account-state-selector v-model="filter.state"/>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
    <div class="data-control">
      <!-- <Button @click="handleBatchFreeze" :loading="disable">账户冻结</Button>
      <Button @click="handleBatchUnfreeze" :loading="enable">账户解冻</Button>
      <Button @click="handleYueFreeze" :loading="disable">余额冻结</Button>
      <Button @click="handleYueUnfreeze" :loading="enable">余额解冻</Button>-->
      <Button :disabled="selectedSelection.length==0" @click="handleShowFeeModal">自定义费率</Button>
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
    <Modal width="680" v-model="feeModal" title="设置手续费率">
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
    <Modal title="余额冻结" v-model="yueModal">
      金额(元)：
      <InputNumber style="width:100%;" v-model="yueNum" :min="0"></InputNumber>
      <div slot="footer">
        <Button
          type="primary"
          :disabled="yueNum<=0"
          :loading="yue_modal_loading"
          @click="handleFreeYue"
        >冻结</Button>
        <Button @click="handleYueCancel">取消</Button>
      </div>
    </Modal>
    <Modal title="余额解冻" v-model="yueJdModal">
      金额(元)：
      <InputNumber style="width:100%;" v-model="yueJDNum" :min="0"></InputNumber>
      <div slot="footer">
        <Button
          type="primary"
          :disabled="yueJDNum<=0"
          :loading="yuejd_modal_loading"
          @click="handleJDYue"
        >解冻</Button>
        <Button @click="handleYueJdCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import walletAccountStateSelector from "components/wallet-account-state-selector";
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import {
    getWalletAccountList,
    updateFee,
    getFeeDetail,
    freeZeLaLaLa,
    freeYueLaLaLa
} from "@/actions/wallet";
export default {
    name: "wallet-personal-account",
    data() {
        return {
            yueModal: false,
            yue_modal_loading: false,
            yueJdModal: false,
            yuejd_modal_loading: false,
            loading: false,
            enable: false,
            disable: false,
            feeModal: false,
            modal_loading: false,
            selectedSelection: [],
            feeForm: {
                types: "2",
                feeType: "1",
                fee: "",
                rate: "",
                maxAmount: ""
            },
            columns: [
                {
                    type: "selection",
                    width: 55,
                    align: "center",
                    fixed: "left"
                },
                {
                    key: "userName",
                    title: "登录账号",
                    width: 200,
                    align: "center",
                    fixed: "left"
                },
                {
                    key: "name",
                    title: "真实姓名",
                    width: 100,
                    align: "center"
                },
                {
                    key: "idNo",
                    title: "身份证号",
                    width: 160,
                    align: "center"
                },
                {
                    key: "mobile",
                    title: "手机号",
                    width: 120,
                    align: "center"
                },
                {
                    key: "accountName",
                    title: "账户名称",
                    width: 120,
                    align: "center"
                },
                {
                    key: "accountNo",
                    title: "账户号",
                    width: 200,
                    align: "center"
                },
                {
                    key: "currentBalance",
                    title: "账户可用余额",
                    width: 80,
                    align: "center"
                },
                {
                    key: "withdrawBalance",
                    title: "可提现余额",
                    width: 80,
                    align: "center"
                },
                {
                    key: "unAvailableAmount",
                    title: "账号冻结余额",
                    width: 180,
                    align: "center"
                },
                {
                    key: "createdAt",
                    title: "开户时间",
                    width: 160,
                    align: "center"
                },
                {
                    key: "stateDesc",
                    title: "账号状态",
                    width: 100,
                    align: "center"
                },
                {
                    key: "accountTypeDesc",
                    title: "账户类型",
                    width: 100,
                    align: "center"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 400,
                    fixed: "right",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name:
                                                    "wallet-personal-account-detail",
                                                params: {
                                                    id: params.row.accountNo
                                                }
                                            });
                                        }
                                    }
                                },
                                "账户详情"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: "8px"
                                    },
                                    on: {
                                        click: () => {
                                            this.selectedSelection = [
                                                params.row
                                            ];
                                            this.loading = true;
                                            getFeeDetail(
                                                params.row.accountNo
                                            ).then(
                                                res => {
                                                    this.loading = false;
                                                    if (
                                                        res.data.itemParams
                                                            .length
                                                    ) {
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
                                                    this.feeModal = true;
                                                },
                                                () => {
                                                    this.loading = false;
                                                }
                                            );
                                        }
                                    }
                                },
                                "自定义费率"
                            ),
                            params.row.state == 1 &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginLeft: "8px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Modal.confirm({
                                                    title: "冻结",
                                                    content:
                                                        "<p>是否确定冻结当前选定的账户</p>",
                                                    onOk: () => {
                                                        this.loading = true;
                                                        freeZeLaLaLa({
                                                            accountNo:
                                                                params.row
                                                                    .accountNo,
                                                            freezeFlag: "-1"
                                                        }).then(
                                                            res => {
                                                                this.loadData();
                                                                this.$lf.message(
                                                                    "冻结成功",
                                                                    "success"
                                                                );
                                                            },
                                                            err => {
                                                                this.loading = false;
                                                            }
                                                        );
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "冻结"
                                ),
                            params.row.state == -1 &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginLeft: "8px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Modal.confirm({
                                                    title: "解冻",
                                                    content:
                                                        "<p>是否确定解冻当前选定的账户</p>",
                                                    onOk: () => {
                                                        this.loading = true;
                                                        freeZeLaLaLa({
                                                            accountNo:
                                                                params.row
                                                                    .accountNo,
                                                            freezeFlag: "1"
                                                        }).then(
                                                            res => {
                                                                this.loadData();
                                                                this.$lf.message(
                                                                    "解冻成功",
                                                                    "success"
                                                                );
                                                            },
                                                            err => {
                                                                this.loading = false;
                                                            }
                                                        );
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "解冻"
                                ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: "8px"
                                    },
                                    on: {
                                        click: () => {
                                            this.yueAccountNo =
                                                params.row.accountNo;
                                            this.yueModal = true;
                                        }
                                    }
                                },
                                "余额冻结"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: "8px"
                                    },
                                    on: {
                                        click: () => {
                                            this.yueJdAccountNo =
                                                params.row.accountNo;
                                            this.yueJdModal = true;
                                        }
                                    }
                                },
                                "余额解冻"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                userName: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                name: "",
                beginDate: "",
                endDate: "",
                idNo: "",
                state: "",
                accountNo: ""
            },
            data: [],
            total: 0,
            yueNum: 0,
            yueJDNum: 0,
            yueAccountNo: "",
            yueJdAccountNo: ""
        };
    },
    methods: {
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
        handleShowFeeModal() {
            this.feeModal = true;
        },
        handleCancel() {
            this.feeForm = {
                types: "2",
                feeType: "1",
                fee: "",
                rate: "",
                maxAmount: ""
            };
            this.feeModal = false;
        },
        loadData() {
            this.loading = true;
            getWalletAccountList("person", this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleBatchFreeze(selection) {
            // let ids = this.selectedSelection.map(item => {
            //     return item.merchantId;
            // });
            // if (ids.length > 0) {
            //     this.disable = true;
            //     freezeOrUnFreezeMerchant("frozen", {
            //         merchantIds: ids
            //     }).then(
            //         res => {
            //             this.loadData();
            //             this.$lf.message("冻结成功", "success");
            //             this.disable = false;
            //         },
            //         err => {
            //             this.disable = false;
            //         }
            //     );
            // } else {
            //     this.$lf.message("请选择冻结项", "info");
            // }
        },
        handleBatchUnfreeze(selection) {
            // let ids = this.selectedSelection.map(item => {
            //     return item.merchantId;
            // });
            // if (ids.length > 0) {
            //     this.enable = true;
            //     freezeOrUnFreezeMerchant("unfrozen", {
            //         merchantIds: ids
            //     }).then(
            //         res => {
            //             this.loadData();
            //             this.$lf.message("解冻成功", "success");
            //             this.enable = false;
            //         },
            //         err => {
            //             this.enable = false;
            //         }
            //     );
            // } else {
            //     this.$lf.message("请选择解冻项", "info");
            // }
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        handleFreeYue() {
            let { yueAccountNo, yueNum } = this;
            this.yue_modal_loading = true;
            freeYueLaLaLa({
                accountNo: yueAccountNo,
                amount: yueNum * 100,
                freezeFlag: -1
            }).then(
                res => {
                    this.yue_modal_loading = false;
                    if (res.data.state) {
                        this.$lf.message("余额冻结成功", "success");
                        this.handleYueCancel();
                        this.loadData();
                    } else {
                        this.$lf.message(res.data.failureMsg, "error");
                    }
                },
                () => {
                    this.yue_modal_loading = false;
                }
            );
        },
        handleJDYue() {
            let { yueJdAccountNo, yueJDNum } = this;
            this.yuejd_modal_loading = true;
            freeYueLaLaLa({
                accountNo: yueJdAccountNo,
                amount: yueJDNum * 100,
                freezeFlag: 1
            }).then(
                res => {
                    this.yuejd_modal_loading = false;
                    if (res.data.state) {
                        this.$lf.message("余额解冻成功", "success");
                        this.handleYueJdCancel();
                        this.loadData();
                    } else {
                        this.$lf.message(res.data.failureMsg, "error");
                    }
                },
                () => {
                    this.yuejd_modal_loading = false;
                }
            );
        },
        handleYueCancel() {
            this.yueModal = false;
            this.yueNum = 0;
            this.yueAccountNo = "";
        },
        handleYueJdCancel() {
            this.yueJdModal = false;
            this.yueJDNum = 0;
            this.yueJdAccountNo = "";
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        walletAccountStateSelector
    }
};
</script>
