<style lang="less">
._flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
            :start-date.sync="filter.beginTime"
            :end-date.sync="filter.endTime"
          ></date-range-selector>
        </FormItem>
        <FormItem label="商户订单号">
          <Input v-model="filter.outTradeNo"></Input>
        </FormItem>
        <FormItem label="平台订单号">
          <Input v-model="filter.thirdTradeNo"></Input>
        </FormItem>
        <FormItem label="微信订单号">
          <Input v-model="filter.channelTradeNo"></Input>
        </FormItem>
        <FormItem label="商户分账订单号">
          <Input v-model="filter.outOrderNo"></Input>
        </FormItem>
        <FormItem label="商户名称">
          <Input v-model="filter.merchantName"></Input>
        </FormItem>
        <FormItem label="商户编号">
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="门店名称">
          <Input v-model="filter.storeName"></Input>
        </FormItem>
        <FormItem label="门店编号">
          <Input v-model="filter.storeCode"></Input>
        </FormItem>
        <FormItem label="所属渠道">
          <Input v-model="filter.agentName"></Input>
        </FormItem>
        <FormItem label="分账接收方">
          <Input v-model="filter.name"></Input>
        </FormItem>
        <FormItem label="分账接收方账号">
          <Input v-model="filter.account"></Input>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
          <Button type="primary" :loading="downLoading" @click="downloadExcel">导出</Button>
        </FormItem>
      </Form>
    </Card>
    <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
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

import { getMerchantFzDetail } from "@/actions/profit";
import { handleDownTask } from "@/actions/settle";
export default {
    name: "fz-order-list",
    data() {
        return {
            modalLoading: true,
            loading: false,
            downLoading: false,
            columns: [
                {
                    key: "createdAt",
                    title: "交易日期",
                    width: 150
                },
                {
                    key: "outTradeNo",
                    title: "商户订单号",
                    width: 140
                },
                {
                    key: "thirdTradeNo",
                    title: "平台订单号",
                    width: 140
                },
                {
                    key: "channelTradeNo",
                    title: "微信订单号",
                    width: 140
                },
                {
                    key: "outOrderNo",
                    title: "微信分账订单号",
                    width: 140
                },
                // 对应的是tradeId

                {
                    key: "merchantName",
                    title: "商户名称",
                    width: 180
                },
                {
                    key: "merchantCode",
                    title: "商户编号",
                    width: 120
                },
                {
                    key: "storeName",
                    title: "门店名称",
                    width: 120
                },
                {
                    key: "storeCode",
                    title: "门店编号",
                    width: 120
                },
                {
                    key: "agentName",
                    title: "所属渠道名称",
                    width: 120
                },
                {
                    key: "type",
                    title: "分账账户类型",
                    width: 120,
                    render: (h, params) => {
                        return h(
                            "span",
                            params.row.type == 1 ? "企业" : "个人"
                        );
                    }
                },
                {
                    key: "name",
                    title: "分账接收方",
                    width: 120
                },
                {
                    key: "account",
                    title: "分账接收方账号",
                    width: 140
                },
                {
                    key: "amount",
                    title: "订单总金额",
                    align: "right",
                    width: 100
                },
                {
                    key: "rate",
                    title: "分账比例",
                    width: 120,
                    align: "right",
                    render: (h, params) => {
                        return h("span", params.row.rate || 0 + "‰");
                    }
                },
                {
                    key: "shareAmount",
                    title: "分账金额",
                    align: "right",
                    width: 100
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginTime: "",
                endTime: "",
                outTradeNo: "",
                thirdTradeNo: "",
                channelTradeNo: "",
                outOrderNo: "",
                merchantName: "",
                merchantCode: "",
                storeName: "",
                storeCode: "",
                agentName: "",
                name: "",
                account: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantFzDetail(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "/profit/merchant/detail/list/export",
                this.filter
            );
        }
    },
    components: {
        dateRangeSelector,
        pagination
    }
};
</script>