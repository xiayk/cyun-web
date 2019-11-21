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
    <!-- <div class="data-control">
      <Button @click="handleBatchFreeze" :loading="disable">账户冻结</Button>
      <Button @click="handleBatchUnfreeze" :loading="enable">账户解冻</Button>
      <Button @click="handleYueFreeze" :loading="disable">余额冻结</Button>
      <Button @click="handleYueUnfreeze" :loading="enable">余额解冻</Button>
    </div>-->
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
  </div>
</template>

<script>
import walletAccountStateSelector from "components/wallet-account-state-selector";
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import { getFinanceAccountList } from "@/actions/wallet";
export default {
    name: "wallet-account-finance",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            showDetail: false,
            selectedSelection: [],
            columns: [
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
                    width: 120,
                    fixed: "right",
                    render: (h, params) => {
                        return h(
                            "Button",
                            {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: "wallet-account-detail",
                                            params: {
                                                id: params.row.accountNo
                                            }
                                        });
                                    }
                                }
                            },
                            "查看账户明细"
                        );
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
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getFinanceAccountList(this.filter).then(res => {
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
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        walletAccountStateSelector
    }
};
</script>
