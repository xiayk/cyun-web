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
        <FormItem label="登录账号">
          <Input v-model="filter.merchantFullName"></Input>
        </FormItem>
        <FormItem label="企业名称">
          <Input v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="联系人姓名">
          <Input v-model="filter.agentFullName"></Input>
        </FormItem>
        <FormItem label="联系人手机号码">
          <Input v-model="filter.agentFullName"></Input>
        </FormItem>
        <FormItem label="注册时间">
          <date-range-selector
            v-model="filter._dateRange"
            :start-date.sync="filter.beginDate"
            :end-date.sync="filter.endDate"
          ></date-range-selector>
        </FormItem>
        <FormItem label="账户状态">
          <Select v-model="filter.start">
            <Option value>全部</Option>
            <Option value="1">正常</Option>
            <Option value="2">冻结</Option>
          </Select>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
    <div class="data-control">
      <Button type="primary" @click="handleAccountFrozen()" :loading="frozen">账户冻结</Button>
      <Button type="primary" @click="handleAccountThaw()" :loading="thaw">账户解冻</Button>
      <Button @click="handlebalanceFreeze()" :loading="disable">余额冻结</Button>
      <Button @click="handlebalanceUnfreeze()" :loading="enable">余额解冻</Button>
    </div>
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
import { getInstitutionList } from "@/actions/selector";
import { mapState } from "vuex";
export default {
    name: "account-enterprise",
    props: {
        active: ""
    },
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
                    type: "selection",
                    width: 55,
                    align: "center",
                    fixed: "left"
                },
                {
                    key: "merchantFullName",
                    title: "用户ID",
                    width: 150,
                    fixed: "left"
                },
                {
                    key: "merchantCode",
                    title: "企业名称",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "电子邮箱",
                    width: 120
                },
                {
                    key: "processStateDesc",
                    title: "联系人姓名",
                    width: 150
                },
                {
                    key: "stateDesc",
                    title: "联系人身份证号码",
                    width: 120
                },
                {
                    key: "createTime",
                    title: "联系人手机号码",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "账户名称",
                    width: 120
                },
                {
                    key: "processStateDesc",
                    title: "账户号",
                    width: 120
                },
                {
                    key: "stateDesc",
                    title: "账户余额",
                    width: 150
                },
                {
                    key: "createTime",
                    title: "账户可用余额",
                    width: 120
                },
                {
                    key: "agentFullName",
                    title: "账户可提现余额",
                    width: 150
                },
                {
                    key: "processStateDesc",
                    title: "注册时间",
                    width: 120
                },
                {
                    key: "stateDesc",
                    title: "账户状态",
                    width: 120
                },
                {
                    key: "stateDesc",
                    title: "开户状态",
                    width: 120
                },
                {
                    type: "action",
                    title: "操作",
                    width: 200,
                    fixed: "right",
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
                                        click: () => {
                                            this.$router.push({
                                                name:
                                                    "account-enterprise-dateil",
                                                params: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看详情"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name:
                                                    "account-individual-detail",
                                                params: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "账户认证"
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
            columns2: [
                {
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
                                "Button",
                                {
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
            ]
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
    activated() {
        this.loadData();
    },
    mounted() {
        this.loadData();
    },
    watch: {
        addModal(val) {
            if (!val) {
                this.resetSecretInfo();
            }
        },
        active(val) {
            console.log(val);
            if (val == 2) {
                this.loadData();
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