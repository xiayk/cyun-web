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
        <FormItem label="申请时间">
          <date-range-selector
            v-model="filter._dateRange"
            :start-date.sync="filter.beginDate"
            :end-date.sync="filter.endDate"
          ></date-range-selector>
        </FormItem>
        <FormItem label="提现订单号">
          <Input v-model="filter.merchantFullName"></Input>
        </FormItem>
        <FormItem label="账户号">
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="提现虚拟账户号">
          <Input v-model="filter.agentFullName"></Input>
        </FormItem>
        <FormItem label="交易状态">
          <Select v-model="filter.start">
            <Option value>交易成功</Option>
            <Option value="2">交易失败</Option>
          </Select>
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
import { getMerchantList } from "@/actions/merchant";
import { getInstitutionList } from "@/actions/selector";
export default {
    name: "transaction-withdrawal-record",
    data() {
        return {
            loading: false,
            selectedSelection: [],
            columns: [
                {
                    key: "",
                    title: "序号",
                    width: 100
                },
                {
                    key: "merchantFullName",
                    title: "提现订单号",
                    width: 150,
                    fixed: "left"
                },
                {
                    key: "merchantCode",
                    title: "提现申请时间",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "提现处理时间",
                    width: 120
                },
                {
                    key: "processStateDesc",
                    title: "账户名",
                    width: 150
                },
                {
                    key: "stateDesc",
                    title: "提现账号",
                    width: 120
                },
                {
                    key: "createTime",
                    title: "提现金额",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "提现手续费",
                    width: 120
                },
                {
                    key: "processStateDesc",
                    title: "实际出账金额",
                    width: 120
                },
                {
                    key: "stateDesc",
                    title: "交易状态",
                    width: 150
                },
                {
                    key: "createTime",
                    title: "备注",
                    width: 120
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                merchantFullName: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                merchantCode: "",
                beginDate: "",
                endDate: "",
                state: "",
                agentFullName: "",
                processState: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantList(this.filter).then(res => {
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
        },
        reset() {
            this.$refs.filterForm.resetFields();
        }
    },
    mounted() {
        this.loadData();
    },
    components: {
        dateRangeSelector,
        pagination
    }
};
</script>