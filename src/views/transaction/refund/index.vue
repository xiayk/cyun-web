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
        <FormItem label="退款申请时间">
          <date-range-selector
            style="width:100%;"
            v-model="filter._dateRange"
            :start-date.sync="filter.beginDate"
            :end-date.sync="filter.endDate"
          ></date-range-selector>
        </FormItem>
        <FormItem label="原商户订单号">
          <Input v-model="filter.originalOutTradeNo"/>
        </FormItem>
        <FormItem label="退款订单号">
          <Input v-model="filter.outTradeNo"/>
        </FormItem>

        <FormItem label="退款状态">
          <Select transfer clearable v-model="filter.state">
            <Option value="00">退款成功</Option>
            <Option value="01">退款失败</Option>
            <Option value="09">待退款</Option>
          </Select>
          <!-- <refund-status-selector v-model="filter.state"></refund-status-selector>                                         -->
        </FormItem>
        <FormItem label="商户名称">
          <Input v-model="filter.merchantFullName"></Input>
        </FormItem>
        <FormItem label="商户编号">
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="所属银行">
          <institution-list-selector v-model="filter.institutionCode" mode="code"></institution-list-selector>
        </FormItem>
        <FormItem label="支付类型">
          <pay-type-selector v-model="filter.productCode"></pay-type-selector>
        </FormItem>
        <FormItem label="金额范围">
          <div class="_flex">
            <InputNumber :min="0" v-model="filter.minAmount"></InputNumber>
            <div>-</div>
            <InputNumber :min="0" v-model="filter.maxAmount"></InputNumber>
          </div>
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
    <Modal v-model="dowmModal" title="下载任务" @on-cancel="downModalCancel">
      <p>文件正在下载中,请稍后到“任务中心/下载任务”下载</p>
      <div slot="footer" class="_flex">
        <div style="text-align:left;">
          <span style="color:#2d8cf0;">10s</span>后自动前往“任务中心/下载任务”
        </div>
        <Button type="primary" size="small" @click="handleGoDownCenter">前往下载</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import PayTypeSelector from "components/pay-type-selector";
import InstitutionListSelector from "components/institution-list-selector";
import {
    getSettleTransactionRefundList,
    handleDownTask
} from "@/actions/settle";
let timeOuter = "";
export default {
    name: "transaction-order-refund-flow",
    data() {
        return {
            loading: false,
            downLoading: false,
            columns: [
                {
                    key: "createTime",
                    title: "退款申请时间",
                    width: 150
                },
                {
                    key: "originalOutTradeNo",
                    title: "原商户订单号"
                },
                {
                    key: "outTradeNo",
                    title: "退款订单号"
                },
                {
                    key: "merchantFullName",
                    title: "商户名称"
                },
                {
                    key: "merchantCode",
                    title: "商户编号"
                },
                {
                    key: "institutionName",
                    title: "所属银行"
                },
                {
                    key: "productCodeDesc",
                    title: "支付类型"
                },
                {
                    key: "refundAmount",
                    title: "退款金额(元)"
                },
                {
                    key: "amount",
                    title: "订单金额(元)"
                },
                {
                    key: "stateDesc",
                    title: "退款状态"
                }
                // {
                //     type: 'action',
                //     title: '操作',
                //     width: 100,
                //     render: (h, params) => {
                //         return h('div', [
                //             h('Button', {
                //                 props: {
                //                     type: 'text',
                //                     size: 'small'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.$router.push({
                //                             // name: 'transaction/refund/detail',
                //                             query: {
                //                                 id: params.row.id,
                //                             },
                //                         });
                //                     },
                //                 },
                //             }, '详情'),
                //         ]);
                //     }
                // },
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                outTradeNo: "",
                originalOutTradeNo: "",
                state: "",
                merchantCode: "",
                merchantFullName: "",
                institutionCode: "",
                productCode: "",
                minAmount: "",
                maxAmount: ""
            },
            data: [],
            total: 0,
            dowmModal: false
        };
    },
    methods: {
        downloadExcel() {
            // this.$util.downloadExcel(
            //     "settle/transaction/export/refund/list",
            //     this.filter
            // );
            this.downLoading = true;
            handleDownTask(
                "/settle/transaction/export/refund/list",
                this.filter
            ).then(
                res => {
                    this.dowmModal = true;
                    this.downLoading = false;
                    timeOuter = setTimeout(() => {
                        this.handleGoDownCenter();
                    }, 10000);
                },
                () => {
                    this.downLoading = false;
                }
            );
        },
        loadData() {
            this.loading = true;
            getSettleTransactionRefundList(this.filter).then(
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
        downModalCancel() {
            clearTimeout(timeOuter);
        },
        handleGoDownCenter() {
            this.dowmModal = false;
            this.$router.push({
                name: "download-task-list"
            });
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        PayTypeSelector,
        InstitutionListSelector
    }
};
</script>