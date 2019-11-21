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
        <FormItem label="起止时间">
          <date-range-selector
            v-model="filter._dateRange"
            :start-date.sync="filter.beginDate"
            :end-date.sync="filter.endDate"
            placeholder
          ></date-range-selector>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="filter.accountNo" placeholder>
            <Option value>全部</Option>
            <Option value="1">成功</Option>
            <Option value="2">处理中</Option>
            <Option value="3">失败</Option>
          </Select>
        </FormItem>
        <FormItem label="所属银行">
          <institution-selector v-model="filter.clearInstitution"></institution-selector>
        </FormItem>

        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
    <!-- <div slot="title" style="height:32px"> -->
    <Tabs type="card" @on-click="handleTabs">
      <TabPane label="汇总账单">
        <Table
          :loading="loading"
          border
          stripe
          :columns="columns"
          :data="data"
          @on-selection-change="handleSelect"
        ></Table>
        <!-- <pagination
          :total="total"
          :limit.sync="filter.limit"
          :offset.sync="filter.offset"
          @on-load="loadData"
        ></pagination>-->
      </TabPane>
      <TabPane label="明细账单">
        <Table
          :loading="loading"
          border
          stripe
          :columns="columns1"
          :data="data1"
          @on-selection-change="handleSelect"
        ></Table>
        <!-- <pagination
          :total="total1"
          :limit.sync="limit1"
          :offset.sync="offset1"
          @on-load="loadData1"
        ></pagination>-->
      </TabPane>
    </Tabs>
    <!-- </div> -->
  </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import institutionSelector from "components/institution-selector";
import { getChangeCollectList, getChangeCollectDetail } from "@/actions/wallet";
export default {
    name: "account-ledger",
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
            columns: [
                {
                    key: "subAccountTypeDesc",
                    title: "账户类型"
                },
                {
                    key: "initBalance",
                    title: "期初余额(元)"
                },
                {
                    key: "recvRecord",
                    title: "收入笔数"
                },
                {
                    key: "recvAmount",
                    title: "收入金额(元)"
                },
                {
                    key: "payRecord",
                    title: "支出笔数"
                },
                {
                    key: "payAmount",
                    title: "支付金额(元)"
                },
                {
                    key: "lastBalance",
                    title: "期末金额(元)"
                }
            ],
            columns1: [
                {
                    key: "subAccountTypeDesc",
                    title: "账户类型"
                },
                {
                    key: "tradeTypeDesc",
                    title: "交易类型"
                },
                {
                    key: "recvRecord",
                    title: "收入笔数"
                },
                {
                    key: "recvAmount",
                    title: "收入金额(元)"
                },
                {
                    key: "payRecord",
                    title: "支出笔数"
                },
                {
                    key: "payAmount",
                    title: "支付金额(元)"
                }
            ],
            filter: {
                // limit: 10,
                // offset: 0,
                accountNo: "",
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                clearInstitution: ""
            },
            data: [],
            total: 0,
            current: "0",
            total1: 0,
            data1: [],
            limit1: 10,
            offset1: 0
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        handleTabs(name) {
            name == "1" ? this.loadData1() : this.loadData();
        },
        loadData1() {
            let { offset1, limit1 } = this;
            this.loading = true;
            let from = Object.assign(this.filter, {
                offset: offset1,
                limit: limit1
            });
            getChangeCollectDetail(this.filter).then(res => {
                this.loading = false;
                this.data1 = res.data;
                // this.total = res.data.total;
            });
        },
        handleClick() {},
        loadData() {
            this.loading = true;
            getChangeCollectList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data;
                this.total = res.data.total;
            });
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleFilter() {
            this.filter.offset = 0;
            this.offset1 = 0;
            this.loadData1();
            this.loadData();
        }
    },
    watch: {},
    components: {
        dateRangeSelector,
        pagination,
        institutionSelector
    }
};
</script>
