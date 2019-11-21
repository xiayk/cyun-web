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
          <Input v-model="filter.outTradeNo"></Input>
        </FormItem>
        <!-- <FormItem label="交易类型">
          <Select v-model="filter.orderType">
            <Option value>全部</Option>
            <Option value="3">个人</Option>
            <Option value="1">企业</Option>
          </Select>
        </FormItem>-->
        <FormItem label="状态">
          <Select v-model="filter.state" placeholder>
            <Option value>全部</Option>
            <Option value="1">成功</Option>
            <Option value="2">处理中</Option>
            <Option value="3">失败</Option>
          </Select>
        </FormItem>
        <FormItem label="所属银行">
          <institution-selector v-model="filter.clearInstitution"></institution-selector>
        </FormItem>
        <FormItem label="付款方">
          <Input v-model="filter.sourceAccountName"></Input>
        </FormItem>
        <FormItem label="收款方">
          <Input v-model="filter.targetAccountName"></Input>
        </FormItem>
        <FormItem label="支付时间">
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
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import institutionSelector from "components/institution-selector";
import { getRoyaltyList } from "@/actions/wallet";
export default {
    name: "account-finance",
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
                // {
                //     type: "selection",
                //     width: 55,
                //     align: "center"
                // },
                {
                    key: "outTradeNo",
                    title: "商户订单号"
                },
                {
                    key: "createdAt",
                    title: "支付时间"
                },
                {
                    key: "sourceAccountName",
                    title: "付款方"
                },
                {
                    key: "targetAccountName",
                    title: "收款方"
                },
                {
                    key: "amount",
                    title: "分账金额(元)"
                },
                {
                    key: "clearInstitution",
                    title: "所属银行"
                },
                {
                    key: "stateDesc",
                    title: "状态"
                },
                {
                    key: "attach",
                    title: "摘要"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                outTradeNo: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                accountName: "",
                beginDate: "",
                endDate: "",
                orderType: "",
                subAccountType: "",
                clearInstitution: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getRoyaltyList(this.filter).then(res => {
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
        institutionSelector
    }
};
</script>
