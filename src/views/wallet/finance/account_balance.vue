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
        <FormItem label="用户登录账号">
          <Input v-model="filter.merchantFullName"></Input>
        </FormItem>
        <FormItem label="虚拟账户名称">
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="虚拟账户号">
          <Input v-model="filter.agentFullName"></Input>
        </FormItem>
        <FormItem label="账户类型">
          <Select v-model="filter.start">
            <Option value>企业账户</Option>
            <Option value>个人账户</Option>
          </Select>
        </FormItem>
        <FormItem label="账户状态">
          <Select v-model="filter.start">
            <Option value>正常</Option>
            <Option value>冻结</Option>
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

export default {
    name: "transaction-refund-record",
    data() {
        return {
            loading: false,
            selectedSelection: [],
            columns: [
                {
                    key: "merchantFullName",
                    title: "序号",
                    width: 150,
                    fixed: "left"
                },
                {
                    key: "merchantCode",
                    title: "用户ID",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "账户类型",
                    width: 120
                },
                {
                    key: "processStateDesc",
                    title: "虚拟账户名称",
                    width: 150
                },
                {
                    key: "stateDesc",
                    title: "虚拟账号",
                    width: 120
                },
                {
                    key: "createTime",
                    title: "账户余额",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "账户可用余额",
                    width: 120
                },
                {
                    key: "processStateDesc",
                    title: "账户可提现余额",
                    width: 120
                },
                {
                    key: "",
                    title: "摘要",
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