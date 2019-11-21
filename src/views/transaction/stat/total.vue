<style lang="less">
._flex {
    display: flex;
    align-items: center;
    justify-content: center;
}
.pd-30 {
    padding: 30px;
}
.stat-total-row {
    background-color: #fff;
    margin: 15px 0;
    padding: 30px 0;
}
.flex-col {
    flex-direction: column;
}
.rt-border {
    border-right: 1px solid #f2f2f2;
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
            style="width:100%;"
            v-model="filter._dateRange"
            :start-date.sync="filter.beginDate"
            :end-date.sync="filter.endDate"
          ></date-range-selector>
        </FormItem>
        <FormItem label="所属银行">
          <institution-list-selector v-model="filter.institutionCode" mode="code"></institution-list-selector>
        </FormItem>
        <FormItem label="支付类型">
          <pay-type-selector v-model="filter.productCode"></pay-type-selector>
        </FormItem>
        <FormItem label="所属渠道" v-if="!operatorType">
          <agent-selector v-model="filter.agentId"></agent-selector>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
    <Row class-name="stat-total-row">
      <Spin size="large" fix v-if="loading"></Spin>
      <Col span="6">
        <div class="_flex pd-30 rt-border">
          <img src="./home.png" alt>
          <div class="_flex flex-col">
            <p>交易成功金额</p>
            <p>{{paid.paidAmount}}</p>
          </div>
        </div>
      </Col>
      <Col span="6">
        <div class="_flex pd-30 rt-border">
          <img src="./home.png" alt>
          <div class="_flex flex-col">
            <p>交易成功笔数</p>
            <p>{{paid.paidCount}}</p>
          </div>
        </div>
      </Col>
      <Col span="6">
        <div class="_flex pd-30 rt-border">
          <img src="./home.png" alt>
          <div class="_flex flex-col">
            <p>退款金额</p>
            <p>{{paid.refundAmount}}</p>
          </div>
        </div>
      </Col>
      <Col span="6">
        <div class="_flex pd-30">
          <img src="./home.png" alt>
          <div class="_flex flex-col">
            <p>退款笔数</p>
            <p>{{paid.refundCount}}</p>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dateRangeSelector from "components/date-range-selector";
import InstitutionListSelector from "components/institution-list-selector";
import PayTypeSelector from "components/pay-type-selector";
import AgentSelector from "components/agent-selector";
import { getSettleCollectList } from "@/actions/settle";
import moment from "moment-mini";
export default {
    name: "transaction-order-total-stat",
    data() {
        const start = moment()
            .subtract(1, "month")
            .format("YYYY-MM-DD 00:00:00");
        const end = moment().format("YYYY-MM-DD 23:59:59");
        return {
            loading: false,
            paid: {},
            filter: {
                _dateRange: [start, end], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: start,
                endDate: end,
                institutionCode: "",
                productCode: ""
            }
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSettleCollectList(this.filter).then(
                res => {
                    this.loading = false;
                    this.paid = res.data;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleFilter() {
            this.loadData();
        }
    },
    computed: mapState({
        operatorType: state => state.user.userInfo.operatorType
    }),
    activated() {
        this.loadData();
    },
    components: {
        dateRangeSelector,
        InstitutionListSelector,
        PayTypeSelector,
        AgentSelector
    }
};
</script>