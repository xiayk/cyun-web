<style lang="less">
.xft-div {
    display: block;
    margin-left: 20px;
    margin-top: 5px;
}
.mg {
    margin: 5px 0;
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
                <FormItem label="代理商名称">
                    <!-- <Input v-model="filter.name"></Input> -->
                    <zbAgentSelector :account="agentObj" v-model="filter.name"></zbAgentSelector>
                </FormItem>
                <FormItem label="代理商编号">
                    <!-- <Input v-model="filter.code"></Input> -->
                    <zbAgentSelector :account="agentObj" v-model="filter.code"></zbAgentSelector>
                </FormItem>
                <FormItem label="所属银行">
                    <institution-selector v-model="filter.clearInstitution"></institution-selector>
                </FormItem>
                <FormItem label="审核状态">
                    <Select v-model="filter.auditState" placeholder clearable>
                        <Option value>全部</Option>
                        <Option value="0">待审核</Option>
                        <Option value="1">审核通过</Option>
                        <Option value="-1">审核不通过</Option>
                    </Select>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="filter.state" placeholder clearable>
                        <Option value>全部</Option>
                        <Option value="0">未激活</Option>
                        <Option value="1">正常</Option>
                        <Option value="-1">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间">
                    <date-range-selector
                        v-model="filter._dateRange"
                        :start-date.sync="filter.beginDate"
                        :end-date.sync="filter.endDate"
                        placeholder
                    ></date-range-selector>
                </FormItem>
                <FormItem label="最后修改时间">
                    <date-range-selector
                        v-model="filter._updateDateRange"
                        :start-date.sync="filter.updateBeginDate"
                        :end-date.sync="filter.updateEndDate"
                        placeholder
                    ></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({name: 'account-manage-agent-add'})">创建代理商</Button>
            <Button
                @click="handleBatchFreeze('-1')"
                :disabled="!selectedSelection.length"
                :loading="disable"
            >冻结代理商</Button>
            <Button
                @click="handleBatchFreeze('1')"
                :disabled="!selectedSelection.length"
                :loading="enable"
            >解冻代理商</Button>
            <Button @click="downloadExcel">导出execl</Button>
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
        <Modal v-model="rateModal" :title="frozenTitle">
            <div>是否确认冻结当前选定的账户</div>
            <div slot="footer">
                <Button type="primary" :loading="modal_loading" @click="handleSave">确定</Button>
                <Button @click="handleCancel">取消</Button>
            </div>
        </Modal>
        <Modal v-model="addModal" :title="'商户密钥配置'" closable>
            <Form
                ref="secretInfo"
                method="post"
                @submit.prevent.native="addSecretInfo"
                :model="secretInfo"
                :label-width="120"
                label-position="right"
                :rules="rules2"
            >
                <FormItem label="APPID" prop="appId">
                    <Input v-model="secretInfo.appId" :maxlength="32" readonly />
                </FormItem>
                <FormItem label="代理商户编号" prop="agentCode">
                    <Input v-model="secretInfo.agentCode" :maxlength="18" readonly />
                </FormItem>
                <FormItem label="密钥类型" prop="signType">
                    <Select v-model="secretInfo.signType" @on-change="typesChange">
                        <Option value="MD5">MD5</Option>
                        <Option value="RSA2">RSA2</Option>
                    </Select>
                </FormItem>
                <FormItem label="MD5密钥" prop="appSecret" v-if="secretInfo.signType=='MD5'">
                    <Input v-model="secretInfo.appSecret" :maxlength="32" />
                </FormItem>
                <FormItem label="公钥" prop="publicKey" v-if="secretInfo.signType=='RSA2'">
                    <Input
                        :autosize="{ minRows: 6 }"
                        type="textarea"
                        v-model="secretInfo.publicKey"
                        placeholder="公钥"
                    />
                </FormItem>

                <FormItem label="私钥" prop="privateKey" v-if="secretInfo.signType=='RSA2'">
                    <Input
                        :autosize="{ minRows: 6 }"
                        type="textarea"
                        v-model="secretInfo.privateKey"
                        placeholder="私钥"
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" html-type="submit">保存</Button>
                    <Button @click="showAddProduct(false)">取消</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import zbAgentSelector from "components/zb-agent-selector";
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import institutionSelector from "components/institution-selector";
import {
    getZbAgentList,
    getZbAgentAudit,
    getZbAgentFreezeBatch,
    getZbAdminXftConfigDetail,
    getZbAdminXftConfigUpdate,
    getZbAdminXftAgentConfig
} from "@/actions/wallet";
import { mapState } from "vuex";
import Cookies from "js-cookie";
export default {
    name: "account-manage-agent",
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
                    type: "selection",
                    width: 55,
                    align: "center"
                },
                {
                    key: "name",
                    title: "代理商名称"
                },
                {
                    key: "code",
                    title: "代理商编号"
                },
                {
                    key: "createdAt",
                    title: "创建时间"
                },
                {
                    key: "updatedAt",
                    title: "最后修改时间"
                },
                {
                    key: "auditStateDesc",
                    title: "审核状态"
                },
                {
                    key: "stateDesc",
                    title: "状态"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 300,
                    render: (h, params) => {
                        let role = JSON.parse(Cookies.get("roleId"));
                        var isFinance = false;
                        role.forEach(v => {
                            isFinance = v == "30024" ? true : false;
                        });
                        let isOperate = !isFinance || this.userType == "1",
                            audit = false,
                            payment = false,
                            freeze = false,
                            batch = false;
                        if (!isFinance) {
                            audit = false;
                            payment =
                                params.row.state !== "0" &&
                                this.userType == "1";
                            freeze =
                                params.row.state == "1" && this.userType == "1";
                            batch =
                                params.row.state == "-1" &&
                                this.userType == "1";
                        } else {
                            audit = params.row.auditState == "0";
                            payment = false;
                            freeze = false;
                            batch = false;
                        }
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
                                                    "account-manage-agent-detail",
                                                params: {
                                                    id: params.row.id
                                                },
                                                query: {
                                                    name:
                                                        "account-manage-agent-detail",
                                                    title: "详情"
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看详情"
                            ),
                            payment &&
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
                                                        "account-manage-agent-payment",
                                                    params: {
                                                        id: params.row.id
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "支付参数"
                                ),
                            payment &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                getZbAdminXftConfigDetail(
                                                    params.row.id
                                                ).then(res => {
                                                    this.secretInfo = res.data;
                                                    this.secretInfo.signType = this
                                                        .secretInfo.appSecret
                                                        ? "MD5"
                                                        : "RSA2";
                                                    this.showAddProduct(true);
                                                });
                                            }
                                        }
                                    },
                                    "支付秘钥"
                                ),
                            audit &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small",
                                            disabled: this.btnLoad
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name:
                                                        "account-manage-agent-verify",
                                                    params: {
                                                        id: params.row.id
                                                    },
                                                    query: {
                                                        name:
                                                            "account-manage-agent-verify",
                                                        title: "审核"
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "审核"
                                ),
                            freeze &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                getZbAgentFreezeBatch([
                                                    {
                                                        id: params.row.id,
                                                        state: "-1"
                                                    }
                                                ]).then(res => {
                                                    if (res.data) {
                                                        this.$Notice.success({
                                                            title: "提示信息",
                                                            desc: "冻结成功"
                                                        });
                                                    } else {
                                                        this.$Notice.error({
                                                            title: "提示信息",
                                                            desc: "冻结失败"
                                                        });
                                                    }
                                                    this.loadData();
                                                });
                                            }
                                        }
                                    },
                                    "冻结"
                                ),
                            batch &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                // this.loading = true;
                                                getZbAgentFreezeBatch([
                                                    {
                                                        id: params.row.id,
                                                        state: "1"
                                                    }
                                                ]).then(res => {
                                                    if (res.data) {
                                                        this.$Notice.success({
                                                            title: "提示信息",
                                                            desc: "解冻成功"
                                                        });
                                                    } else {
                                                        this.$Notice.error({
                                                            title: "提示信息",
                                                            desc: "解冻失败"
                                                        });
                                                    }
                                                    this.loadData();
                                                });
                                            }
                                        }
                                    },
                                    "解冻"
                                ),
                            this.userType == "1" &&
                                !isFinance &&
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
                                                        "account-manage-agent-edit",
                                                    params: {
                                                        id: params.row.id
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "编辑"
                                )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                state: "",
                name: "",
                code: "",
                clearInstitution: "",
                auditState: "",
                state: "",
                updateBeginDate: "",
                updateEndDate: "",
                _updateDateRange: ["", ""]
            },
            data: [],
            total: 0,
            stateArr: [],
            rateModal: false,
            value: "",
            modal_loading: false,
            btnLoad: false,
            frozenTitle: "冻结",
            agentObj: "",
            rules2: {
                appId: {
                    required: true,
                    message: "APPID",
                    trigger: "change"
                },
                merchantCode: {
                    required: true,
                    message: "商户编号",
                    trigger: "blur"
                },
                signType: {
                    required: true,
                    message: "密钥类型",
                    trigger: "change"
                },
                appSecret: {
                    required: true,
                    message: "MD5密钥",
                    trigger: "blur"
                },
                publicKey: {
                    required: true,
                    message: "公钥",
                    trigger: "blur"
                },
                privateKey: {
                    required: true,
                    message: "私钥",
                    trigger: "blur"
                }
            },
            secretInfo: {
                merchantId: "",
                appSecret: "",
                signType: "MD5",
                publicKey: "",
                privateKey: "",
                // merchantCode: "",
                appId: ""
            },
            addModal: false
        };
    },
    methods: {
        handleSave() {},
        resetSecretInfo() {
            this.secretInfo = {
                merchantId: "",
                appSecret: "",
                signType: "MD5",
                publicKey: "",
                privateKey: "",
                appId: ""
            };
        },
        showAddProduct(status) {
            this.addModal = status;
        },
        addSecretInfo(e) {
            this.$refs.secretInfo.validate(valid => {
                if (valid) {
                    this.loading = true;
                    getZbAdminXftConfigUpdate(this.secretInfo).then(
                        res => {
                            this.loading = false;
                            this.$lf.message("保存成功", "success");
                            this.showAddProduct(false);
                            this.resetSecretInfo();
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        },
        handleCancel() {
            this.selectedSelection = [];
            this.rateModal = false;
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "/zb/admin/agent/export/list",
                this.filter
            );
        },
        typesChange(val) {
            this.$forceUpdate();
        },
        loadData() {
            this.loading = true;
            getZbAgentList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
            // this.handleState();
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleBatchFreeze(state) {
            let msg = state == "1" ? "解冻" : "冻结";
            let formData = this.selectedSelection.map(v => {
                return {
                    id: v.id,
                    state
                };
            });

            state == "-1" ? (this.disable = true) : (this.enable = true);
            getZbAgentFreezeBatch(formData).then(
                res => {
                    this.loadData();
                    this.$Notice.success({
                        title: `${msg}提示`,
                        desc: `${msg}成功`
                    });
                    state == "-1"
                        ? (this.disable = false)
                        : (this.enable = false);
                    this.selectedSelection = [];
                },
                err => {
                    state == "-1"
                        ? (this.disable = false)
                        : (this.enable = false);
                }
            );
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
        dateRangeSelector,
        pagination,
        zbAgentSelector,
        institutionSelector
    }
};
</script>
