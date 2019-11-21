
<template>
  <div style="position: relative;">
    <Card>
      <p slot="title">{{id?'编辑分账商户':'新增分账商户'}}</p>
      <Form
        style="max-width: 800px;"
        ref="form"
        method="post"
        @submit.prevent.native="submit"
        :model="form"
        :label-width="120"
        label-position="right"
        :rules="rules"
      >
        <!-- <FormItem label="所属渠道" prop="agentId">
          <agent-selector v-model="form.agentId"></agent-selector>
        </FormItem>-->
        <FormItem label="商户名称" prop="merchantId">
          <xlink-merchant-selector v-model="form.merchantId"></xlink-merchant-selector>
        </FormItem>
        <FormItem label="服务费收款账户" prop="name">
          <Select v-model="form.name" style="width:200px" @on-change="handleAccountChange">
            <Option
              v-for="(item,index) in accounList"
              :value="item.name"
              :key="index"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="账户类型" v-if="form.type">
          <span>{{form.type=='1'?'商户':'个人'}}</span>
        </FormItem>
        <FormItem label="微信账号" v-if="form.account">
          <span>{{form.account}}</span>
        </FormItem>
        <FormItem label="分账技术服务费" prop="rate">
          <Input style="width:200px" v-model="form.rate">
            <span slot="append">万分之</span>
          </Input>
        </FormItem>
        <FormItem label="分账接收方" prop="shareType">
          <RadioGroup v-model="form.shareType">
            <Radio label="1">
              <span>固定分账接收方</span>
            </Radio>
            <Radio label="2">
              <span>自定义分账接收方（通过接口来指定分账接收方)</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem v-if="form.shareType==1">
          <div class="fz-flex">
            <Alert type="error">注意：请不要将分账方（做支付的商户）设置在分账接收方中</Alert>
            <Button
              style="width:80px"
              :disabled="!form.merchantId"
              @click="showAddModal"
              type="primary"
            >新增</Button>
          </div>
          <Table border :loading="loading" :columns="columns" :data="data"></Table>
          <pagination
            :total="total"
            :limit.sync="filter.limit"
            :offset.sync="filter.offset"
            @on-load="loadData"
          ></pagination>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="subloading" html-type="submit">提交</Button>
        </FormItem>
      </Form>
      <Modal v-model="addModal" :closable="false" :mask-closable="false">
        <p slot="header">
          <span>{{modalform.id?'编辑分账接收方':'新增分账接收方'}}</span>
        </p>
        <div>
          <Form
            ref="modalform"
            method="post"
            @submit.prevent.native="submit"
            :model="modalform"
            :label-width="120"
            label-position="right"
            :rules="rules2"
          >
            <FormItem label="分账接收方" prop="type">
              <RadioGroup v-model="modalform.type">
                <Radio :disabled="!!modalform.id" label="1">
                  <span>商户</span>
                </Radio>
                <Radio :disabled="!!modalform.id" label="2">
                  <span>个人</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem :label="modalform.type==1?'商户全称：':'真实姓名：'" prop="name">
              <Input v-model="modalform.name"></Input>
            </FormItem>
            <FormItem :label="modalform.type==1?'商户编号：':'微信号码：'" prop="account">
              <Input v-model="modalform.account"></Input>
            </FormItem>
            <FormItem label="分账技术服务费" prop="rate">
              <Input style="width:100%" v-model="modalform.rate">
                <span slot="append">万分之</span>
              </Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button @click="closeAddModal">取消</Button>
          <Button type="primary" :loading="modal_loading" @click="confirmModal">确定</Button>
        </div>
      </Modal>
    </Card>
    <Spin fix v-if="!ready"></Spin>
  </div>
</template>

<script>
import pagination from "components/pagination";
import managerRoleSelector from "components/manager-role-selector";
import agentSelector from "components/agent-selector";
import xlinkMerchantSelector from "components/xlink-merchant-selector";
import {
    addOrUpdateMerchantAccount,
    getMerchantAccountList,
    deleteAccountById,
    getAccountDetail
} from "@/actions/profit";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "fz-merchant-form",
    props: {
        id: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        const validateRate = (rule, value, callback) => {
            if (/^[1-9]\d*|0$/.test(value)) {
                callback();
            } else {
                callback(new Error("请输入非负整数"));
            }
        };
        return {
            subloading: false,
            loading: false,
            addModal: false,
            modal_loading: false,
            ready: false,
            filter: {
                limit: 10,
                offset: 0,
                merchantId: ""
            },
            accounList: [
                {
                    name: "戴忠",
                    account: "zhanggui666291",
                    type: "2"
                }
            ],
            form: {
                agentId: "",
                merchantId: "",
                account: "zhanggui666291",
                name: "戴忠",
                type: "2",
                rate: "",
                shareType: "1"
            },
            rules: {
                agentId: [
                    {
                        required: true,
                        message: "请选择渠道",
                        trigger: "change"
                    }
                ],
                merchantId: [
                    {
                        type: "number",
                        required: true,
                        message: "请选择商户",
                        trigger: "change"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请选择服务费收款账户",
                        trigger: "change"
                    }
                ],
                rate: [
                    {
                        required: true,
                        message: "请输入分账技术服务费",
                        trigger: "blur"
                    },
                    {
                        validator: validateRate,
                        trigger: "blur"
                    }
                ],
                shareType: [
                    {
                        required: true,
                        message: "请选择分账接收方",
                        trigger: "change"
                    }
                ]
            },
            columns: [
                {
                    title: "账号类型",
                    key: "type",
                    render: (h, params) => {
                        let { row } = params;
                        return h("span", row.type == "1" ? "商户" : "个人");
                    }
                },
                {
                    title: "商户全称/真实姓名",
                    key: "name"
                },
                {
                    title: "商户号/个人微信号",
                    key: "account"
                },
                {
                    title: "分账比例",
                    key: "rate",
                    render: (h, params) => {
                        return h("span", params.row.rate + "‱");
                    }
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
                                            this.modalform = {
                                                ...this.modalform,
                                                ...params.row
                                            };
                                            this.showAddModal();
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Poptip",
                                {
                                    props: {
                                        confirm: true,
                                        title: "确定删除改账户吗"
                                    },
                                    on: {
                                        "on-ok": () => {
                                            this.loading = true;
                                            deleteAccountById(
                                                params.row.id
                                            ).then(
                                                res => {
                                                    this.loading = false;
                                                    this.$lf.message(
                                                        "删除成功",
                                                        "success"
                                                    );
                                                    this.handleFilter();
                                                },
                                                () => {
                                                    this.loading = false;
                                                }
                                            );
                                        }
                                    }
                                },
                                [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "text",
                                                size: "small"
                                            }
                                        },
                                        "删除"
                                    )
                                ]
                            )
                        ]);
                    }
                }
            ],
            data: [],
            total: 0,
            modalform: {
                agentId: "",
                merchantId: "",
                account: "",
                name: "",
                type: "1",
                rate: "",
                shareType: "1"
            },
            rules2: {
                name: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                account: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                rate: [
                    {
                        required: true,
                        message: "请输入分账技术服务费",
                        trigger: "blur"
                    },
                    {
                        validator: validateRate,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.subloading = true;
                    let formData = this.form;
                    addOrUpdateMerchantAccount(formData).then(
                        res => {
                            this.subloading = false;
                            this.$refs.form.resetFields();
                            this.$lf.message("保存成功", "success");
                            closeCurrentErrPage(this, "fz-merchant-list");
                        },
                        () => {
                            this.subloading = false;
                        }
                    );
                }
            });
        },
        closeAddModal() {
            this.addModal = false;
            this.$refs.modalform.resetFields();
        },
        confirmModal() {
            this.$refs.modalform.validate(valid => {
                if (valid) {
                    this.modal_loading = true;
                    let formData = this.modalform;
                    addOrUpdateMerchantAccount(formData).then(
                        res => {
                            this.modal_loading = false;
                            this.closeAddModal();
                            this.$lf.message("保存成功", "success");
                            this.handleFilter();
                        },
                        () => {
                            this.modal_loading = false;
                        }
                    );
                }
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        showAddModal() {
            this.addModal = true;
        },
        handleAccountChange(name) {
            this.accounList.map(v => {
                if (v.name === name) {
                    this.form.type = v.type;
                    this.form.account = v.account;
                }
            });
        },
        loadData() {
            if (this.filter.merchantId) {
                this.loading = true;
                getMerchantAccountList(this.filter).then(
                    res => {
                        this.loading = false;
                        this.data = res.data.rows;
                        this.total = res.data.total;
                    },
                    () => {
                        this.loading = false;
                    }
                );
            }
        },
        getDetail(id) {
            getAccountDetail(id).then(res => {
                this.ready = true;
                res.data.agentId = res.data.agentId + "";
                this.form = { ...this.form, ...res.data };
            });
        }
    },
    components: {
        managerRoleSelector,
        agentSelector,
        xlinkMerchantSelector,
        pagination
    },
    activated() {
        if (this.id) {
            this.getDetail(this.id);
        } else {
            this.ready = true;
        }
    },
    watch: {
        "form.merchantId"(val) {
            this.filter.merchantId = val;
            this.modalform.merchantId = val;
            this.loadData();
        },
        "form.agentId"(val) {
            this.modalform.agentId = val;
        },
        id(val) {
            if (val) {
                this.getDetail(val);
            }
        }
    }
};
</script>
<style lang="less">
.fz-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>

