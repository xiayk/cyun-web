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
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="真实姓名">
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="提现虚拟账户号">
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="审核状态">
          <Select v-model="filter.start">
            <Option value>全部</Option>
            <Option value>审核通过</Option>
            <Option value="2">审核拒绝</Option>
            <Option value="2">待审核</Option>
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
    name: "finance-audit-manage",
    data() {
        return {
            loading: false,
            selectedSelection: [],
            columns: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    key: "merchantFullName",
                    title: "序号",
                    width: 150,
                    fixed: "left"
                },
                {
                    key: "merchantCode",
                    title: "提现订单号",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "提现申请时间",
                    width: 120
                },
                {
                    key: "processStateDesc",
                    title: "用户名",
                    width: 150
                },
                {
                    key: "stateDesc",
                    title: "真实姓名",
                    width: 120
                },
                {
                    key: "createTime",
                    title: "提现虚拟账号",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "提现金额",
                    width: 120
                },
                {
                    key: "processStateDesc",
                    title: "提现手续费",
                    width: 120
                },
                {
                    key: "stateDesc",
                    title: "实际出账金额",
                    width: 150
                },
                {
                    key: "createTime",
                    title: "收款账户名称",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "收款银行账号",
                    width: 150
                },
                {
                    key: "processStateDesc",
                    title: "审核状态",
                    width: 120
                },
                {
                    key: "",
                    title: "审核人",
                    width: 120
                },
                {
                    type: "action",
                    title: "操作",
                    width: 100,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {}
                                    }
                                },
                                "审核通过"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {}
                                    }
                                },
                                "审核拒绝"
                            )
                        ]);
                    }
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