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
      <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right"
        :label-width="120">
        <FormItem label="交易时间">
          <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate"
            :end-date.sync="filter.endDate"></date-range-selector>
        </FormItem>
        <FormItem label="交易流水号">
          <Input v-model="filter.merchantFullName"></Input>
        </FormItem>
        <FormItem label="所属商户号名称">
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="商户关联收款账户号">
          <Input v-model="filter.agentFullName"></Input>
        </FormItem>
        <FormItem label="交易类型">
          <Select v-model="filter.start">
            <Option value="">批量入账</Option>
            <Option value="1">虚拟账户转账</Option>
            <Option value="2">提现</Option>
            <Option value="2">退款</Option>
          </Select>
        </FormItem>
        <FormItem label="交易状态">
          <Select v-model="filter.start">
            <Option value="">交易成功</Option>
            <Option value="1">交易处理中</Option>
            <Option value="2">交易失败</Option>
          </Select>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
    
    <Table :loading="loading" border stripe :columns="columns" :data="data" @on-selection-change="handleSelect"></Table>
    <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
  </div>
</template>

<script>
  import merchantStateSelector from "components/merchant-state-selector";
  import merchantProcessSelector from "components/merchant-process-selector";
  import dateRangeSelector from "components/date-range-selector";
  import pagination from "components/pagination";
  import storeSelector from "components/store-selector";
  import InstitutionListSelector from "components/institution-list-selector";
  import {
    getMerchantList,
    freezeOrUnFreezeMerchant,
    resetMerchantPassword,
    getMerchantSecretInfo,
    saveMerchantSecretInfo,
    getMerchantStoreDataList,
    addSingleStoreForMerchant,
    deleteSingleStore,
    feedMerchantApi
  } from "@/actions/merchant";
  import {
    getInstitutionList
  } from "@/actions/selector";
  import {
    mapState
  } from "vuex";
  export default {
    name: "transaction-platform-record",
    data() {
      return {
        loading: false,
        enable: false,
        disable: false,
        selectedSelection: [],
        thaw: false,
        frozen: false,
        columns: [
          {
            key: "merchantFullName",
            title: "交易流水号",
            width: 150,
            fixed: "left"
          },
          {
            key: "merchantCode",
            title: "商户订单号",
            width: 120
          },
          {
            key: "agentFullName",
            title: "创建时间",
            width: 120
          },
          {
            key: "processStateDesc",
            title: "处理时间",
            width: 150
          },
          {
            key: "stateDesc",
            title: "交易渠道",
            width: 120
          },
          {
            key: "createTime",
            title: "交易金额",
            width: 120
          },
          {
            key: "agentFullName",
            title: "手续费",
            width: 120
          },
          {
            key: "processStateDesc",
            title: "用户名",
            width: 120
          },
          {
            key: "stateDesc",
            title: "交易虚拟账号",
            width: 150
          },
          {
            key: "createTime",
            title: "交易虚拟账户名称",
            width: 120
          },
          {
            key: "agentFullName",
            title: "交易状态",
            width: 150
          },
          {
            key: "processStateDesc",
            title: "是否退款",
            width: 120
          },
          {
            key:"",
            title:"备注",
            width:120
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
        total: 0,
        secretInfo: {
          merchantId: "",
          appSecret: "",
          types: "MD5",
          publicKey: "",
          privateKey: "",
          merchantCode: "",
          appId: ""
        },
        storeData: [],
        columns2: [{
            key: "code",
            title: "门店编号"
          },
          {
            key: "fullName",
            title: "门店全称"
          },
          {
            type: "action",
            title: "操作",
            width: 120,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button", {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$lf.confirm(
                          "确认要删除该门店吗？",
                          () => {
                            deleteSingleStore(
                              params.row.id
                            ).then(res => {
                              this.$lf.message(
                                "删除成功",
                                "success"
                              );
                              this.getStoreDataList(
                                this.storeForm
                                .merchantId
                              );
                            });
                          }
                        );
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
      };
    },
    methods: {
      handleAccountFrozen() {},
      handleAccountThaw() {},
      handlebalanceFreeze() {},
      handlebalanceUnfreeze() {},
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
    watch: {
      addModal(val) {
        if (!val) {
          this.resetSecretInfo();
        }
      }
    },
    computed: mapState({
      userType: state => state.user.userInfo.userType
    }),
    components: {
      merchantStateSelector,
      dateRangeSelector,
      pagination,
      merchantProcessSelector,
      storeSelector,
      InstitutionListSelector
    }
  };
</script>