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
        <FormItem label="交易时间">
          <date-range-selector
            style="width:100%"
            v-model="filter._dateRange"
            :start-date.sync="filter.beginDate"
            :end-date.sync="filter.endDate"
          ></date-range-selector>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
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
import { getFinanceAccountDetailList } from "@/actions/wallet";
export default {
    name: "wallet-account-detail",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            selectedSelection: [],
            columns: [
                {
                    key: "outTradeNo",
                    title: "交易流水号",
                    width: 200,
                    align: "center",
                    fixed: "left"
                },
                {
                    key: "name",
                    title: "平台订单号",
                    width: 100,
                    align: "center"
                },
                {
                    key: "idNo",
                    title: "记账时间",
                    width: 160,
                    align: "center"
                },
                {
                    key: "amount",
                    title: "交易金额",
                    width: 120,
                    align: "center"
                },
                {
                    key: "feeAmount",
                    title: "手续费",
                    width: 120,
                    align: "center"
                },
                {
                    key: "recvAccountNo",
                    title: "对方账号",
                    width: 200,
                    align: "center"
                },
                {
                    key: "recvAccountName",
                    title: "对方账户名称",
                    width: 80,
                    align: "center"
                },
                {
                    key: "recvBankName",
                    title: "对方账户开户行名称",
                    width: 80,
                    align: "center"
                },
                {
                    key: "walletTransType",
                    title: "交易类型",
                    width: 180,
                    align: "center"
                },
                {
                    key: "stateDesc",
                    title: "交易状态",
                    width: 160,
                    align: "center"
                },
                {
                    key: "attach",
                    title: "摘要",
                    width: 100,
                    align: "center"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                accountNo: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            let formData = this.filter;
            formData.accountNo = this.$route.params.id;
            getFinanceAccountDetailList(formData).then(res => {
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
