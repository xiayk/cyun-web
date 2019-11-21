<style lang="less">
._flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.bg-pay-fail {
    color: #bbbec4;
}
</style>
<style lang="less" scoped>
#print-main {
    max-width: 750px;
    margin: 30px auto;
    padding: 0 15px;
}
.title {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
}
.ft-18 {
    font-size: 16px;
}
.or-time {
    margin-top: 30px;
}
.mg-tp-15 {
    margin-top: 15px;
}
.border-dashed {
    border-top: 1px dashed #666;
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
                <FormItem label="商户订单号">
                    <Input v-model="filter.outTradeNo"></Input>
                </FormItem>
                <FormItem label="平台订单号">
                    <Input v-model="filter.platTradeNo"></Input>
                </FormItem>
                <FormItem label="第三方流水号">
                    <Input v-model="filter.thirdTradeNo"></Input>
                </FormItem>
                <FormItem label="微信/支付宝流水号">
                    <Input v-model="filter.channelTradeNo"></Input>
                </FormItem>
                <FormItem label="商户" prop="merchantId">
                    <xlinkMerchantSelector
                        mode="code"
                        v-model="filter.merchantCode"
                        :merchant-info.sync="merchantInfo"
                    />
                </FormItem>
                <FormItem label="门店" prop="storeId">
                    <xlinkStoreSelector
                        :store-info.sync="storeInfo"
                        :merchantId="merchantInfo.id"
                        mode="code"
                        v-model="filter.storeCode"
                    />
                </FormItem>
                <FormItem label="收银员">
                    <xlinkOperatorSelector :storeId="storeInfo.id" v-model="filter.operatorId" />
                </FormItem>
                <FormItem label="所属银行">
                    <institution-list-selector v-model="filter.institutionCode" mode="code"></institution-list-selector>
                </FormItem>
                <FormItem label="支付类型">
                    <pay-type-selector v-model="filter.productCode"></pay-type-selector>
                </FormItem>
                <FormItem label="交易状态">
                    <settle-state-selector v-model="filter.state"></settle-state-selector>
                </FormItem>
                <FormItem label="金额范围">
                    <div class="_flex" style="width:100%;">
                        <Input style="width:120px;" v-model="filter.minAmount"></Input>
                        <div>-</div>
                        <Input style="width:120px;" v-model="filter.maxAmount"></Input>
                    </div>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button type="primary" :loading="downLoading" @click="downloadExcel">导出</Button>
                </FormItem>
            </Form>
        </Card>
        <Table
            :row-class-name="rowClassName"
            :loading="loading"
            border
            stripe
            :columns="columns"
            :data="data"
        ></Table>
        <pagination
            :total="total"
            :limit.sync="filter.limit"
            :offset.sync="filter.offset"
            @on-load="loadData"
        ></pagination>
        <!-- 退款 -->
        <Modal
            v-model="firstCheckState"
            title="申请退款"
            :loading="modalLoading"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="firstCheckSubmit"
        >
            <Form label-position="top" :model="takeTime" :rules="ruleInline" ref="rejectOrderForm">
                <FormItem label="退款金额" prop="refundAmount" :required="true">
                    <Input v-model="takeTime.refundAmount" placeholder="请输入退款金额"></Input>
                </FormItem>
                <!-- <FormItem label="备注信息" prop="remark">
          <Input type="textarea" v-model="takeTime.remark" placeholder="请输入备注信息"></Input>
                </FormItem>-->
            </Form>
        </Modal>
        <Modal v-model="dowmModal" title="下载任务" @on-cancel="downModalCancel">
            <p>文件正在下载中,请稍后到“任务中心/下载任务”下载</p>
            <div slot="footer" class="_flex">
                <div style="text-align:left;">
                    <span style="color:#2d8cf0;">10s</span>后自动前往“任务中心/下载任务”
                </div>
                <Button type="primary" size="small" @click="handleGoDownCenter">前往下载</Button>
            </div>
        </Modal>
        <Modal v-model="printModal" ok-text="打印" title="打印预览" :styles="{top:'10px'}">
            <div id="print-main" ref="print-main">
                <div class="title">{{ orderInfo.storeFullName || orderInfo.merchantFullName }}</div>
                <div class="ft-18 color-888 or-time">交易时间：{{ orderInfo.createTime }}</div>
                <div class="ft-18 color-888 or-czy mg-tp-15">操作员：{{ orderInfo.operatorName }}</div>
                <div class="ft-18 color-888 border-dashed mg-tp-15"></div>
                <div class="ft-18 color-888 or-czy mg-tp-15">商户订单号：{{ orderInfo.outTradeNo }}</div>
                <div class="ft-18 color-888 or-czy mg-tp-15">支付类型：{{ orderInfo.productCodeDesc }}</div>
                <div class="ft-18 color-888 or-czy mg-tp-15">交易金额：{{ orderInfo.amount }}</div>
                <div class="ft-18 color-888 or-czy mg-tp-15">实际金额：{{ orderInfo.amount }}</div>
                <div
                    class="ft-18 color-888 or-czy mg-tp-15"
                >微信/支付宝订单号：{{ orderInfo.channelTradeNo }}</div>
                <div class="ft-18 color-888 or-czy mg-tp-15">备注信息：{{ orderInfo.attach }}</div>
                <div class="ft-18 color-888 border-dashed mg-tp-15"></div>
                <div class="ft-18 color-888 or-czy mg-tp-15">请收好小票，及时核对财务</div>
                <div class="ft-18 color-888 or-czy">技术支持：湖南星富通科技有限公司</div>
                <div class="ft-18 color-888 or-czy mg-tp-15">电话：0755-848579834</div>
            </div>
            <div slot="footer">
                <Button @click="handleCancelPirnt">取消</Button>
                <Button
                    style="margin-left:16px;"
                    type="primary"
                    @click="handlePirnt"
                    :loading="printLoading"
                >打印</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import InstitutionListSelector from "components/institution-list-selector";
import PayTypeSelector from "components/pay-type-selector";
import SettleStateSelector from "components/settle-state-selector";
import xlinkMerchantSelector from "components/xlink-merchant-selector";
import xlinkStoreSelector from "components/xlink-store-selector";
import xlinkOperatorSelector from "components/xlink-operator-selector";
import {
    getSettleTransactionList,
    refundPass,
    searchOrderStatus,
    handleDownTask
} from "@/actions/settle";
import { handleCloundPrint } from "@/actions/store";
import moment from "moment-mini";
let timeOuter = "";
export default {
    name: "transaction-order-flow",
    data() {
        return {
            modalLoading: true,
            firstCheckState: false,
            loading: false,
            downLoading: false,
            printModal: false,
            orderInfo: {},
            printLoading: false,
            columns: [
                {
                    key: "createTime",
                    title: "交易时间",
                    width: 150
                },
                {
                    key: "outTradeNo",
                    title: "商户订单号",
                    width: 140
                },
                // 对应的是tradeId

                {
                    key: "merchantFullName",
                    title: "商户名称",
                    width: 180
                },
                {
                    key: "merchantCode",
                    title: "商户编号",
                    width: 120
                },
                {
                    key: "storeFullName",
                    title: "门店名称",
                    width: 120
                },
                {
                    key: "storeCode",
                    title: "门店编号",
                    width: 120
                },
                {
                    key: "operatorName",
                    title: "操作员姓名",
                    width: 120
                },
                {
                    key: "operatorId",
                    title: "操作员ID",
                    width: 120
                },
                {
                    key: "institutionName",
                    title: "所属通道",
                    width: 120
                },
                {
                    key: "productCodeDesc",
                    title: "支付类型",
                    width: 120
                },
                {
                    key: "attach",
                    title: "备注信息",
                    width: 100
                },
                {
                    key: "platTradeNo",
                    title: "平台订单号",
                    width: 120
                },
                {
                    key: "thirdTradeNo",
                    title: "第三方流水号",
                    width: 200
                },
                {
                    key: "channelTradeNo",
                    title: "微信/支付宝流水号",
                    width: 200
                },
                {
                    title: "交易手续费(元)",
                    align: "center",
                    children: [
                        {
                            align: "center",
                            width: 160,
                            key: "preRateAmount",
                            renderHeader: h => {
                                return h("span", [
                                    "预期手续费",
                                    h("Icon", {
                                        props: {
                                            type: "help",
                                            color: "#ff9900"
                                        },
                                        style: {
                                            padding: "0 10px",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Modal.info({
                                                    title: "预期手续费",
                                                    content:
                                                        "预期手续费是平台计算的手续费，与实际手续费可能有几分钱出入。"
                                                });
                                            }
                                        }
                                    })
                                ]);
                            }
                        },
                        {
                            align: "center",
                            width: 160,
                            key: "rateAmount",
                            renderHeader: h => {
                                return h("span", [
                                    "实际手续费",
                                    h("Icon", {
                                        props: {
                                            type: "help",
                                            color: "#ff9900"
                                        },
                                        style: {
                                            padding: "0 10px",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Modal.info({
                                                    title: "实际手续费",
                                                    content:
                                                        "实际手续费是解析对账文件后获取到的真实手续费，银行一般T+1结算，所以会有1天左右的延迟。"
                                                });
                                            }
                                        }
                                    })
                                ]);
                            }
                        }
                    ]
                },
                {
                    title: "实际到账",
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        let { amount, rateAmount } = params.row;
                        return h(
                            "span",
                            rateAmount ? amount - rateAmount : "-"
                        );
                    }
                },
                {
                    key: "stateDesc",
                    title: "交易状态",
                    width: 120,
                    align: "center",
                    fixed: "right",
                    render: (h, parmas) => {
                        let { state, stateDesc } = parmas.row;

                        if (state == "05" || state == "09" || state == "10") {
                            return h(
                                "span",
                                {
                                    style: {
                                        color: "red"
                                    }
                                },
                                stateDesc
                            );
                        }
                        return h("span", stateDesc);
                    }
                },
                {
                    key: "amount",
                    title: "交易金额(元)",
                    width: 120,
                    align: "center",
                    fixed: "right"
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
                                            let {
                                                outTradeNo,
                                                merchantCode
                                            } = params.row;
                                            searchOrderStatus({
                                                outTradeNo,
                                                merchantCode
                                            }).then(res => {
                                                this.$Notice.success({
                                                    title: "查询成功",
                                                    desc:
                                                        "订单状态：" +
                                                        res.data.stateDesc
                                                });
                                                this.loadData();
                                            });
                                        }
                                    }
                                },
                                "查询订单"
                            ),
                            params.row.state == "00" &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.firstCheckState = true;
                                                this.takeTime.outTradeNo =
                                                    params.row.outTradeNo;
                                                this.takeTime.refundAmount = "";
                                            }
                                        }
                                    },
                                    "退款"
                                ),
                            params.row.state == "00" &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.orderInfo = params.row;
                                                this.printModal = true;
                                            }
                                        }
                                    },
                                    "打印"
                                )
                        ]);
                    }
                }
                /* {
                    type: "action",
                    title: "操作",
                    width: 150,
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
                                                    "transaction-order-detail",
                                                query: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "详情"
                            ),
                            JSON.parse(Cookies.get("user")).userTypes === "3" &&
                            (params.row.state === "00" ||
                                params.row.state === "03")
                                ? h(
                                      "Button",
                                      {
                                          props: {
                                              type: "text",
                                              size: "small"
                                          },
                                          on: {
                                              click: () => {
                                                  this.firstCheckState = true;
                                                  this.takeTime = Object.assign(
                                                      {},
                                                      this.defaultCheckObj
                                                  );
                                                  this.takeTime.id =
                                                      params.row.id;
                                              }
                                          }
                                      },
                                      "申请退款"
                                  )
                                : ""
                        ]);
                    }
                } */
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: [
                    moment().format("YYYY-MM-DD 00:00:00"),
                    moment().format("YYYY-MM-DD 23:59:59")
                ], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                outTradeNo: "",
                platTradeNo: "",
                thirdTradeNo: "",
                channelTradeNo: "",
                merchantFullName: "",
                storeFullName: "",
                storeCode: "",
                merchantCode: "",
                institutionCode: "",
                productCode: "",
                state: "",
                operatorId: "",
                minAmount: "",
                maxAmount: ""
            },

            takeTime: {
                refundAmount: "",
                remark: "",
                outTradeNo: ""
            },
            defaultCheckObj: {},
            data: [],
            total: 0,
            ruleInline: {
                refundAmount: [
                    {
                        required: true,
                        message: "退款金额不能为空",
                        trigger: "blur"
                    }
                ]
            },
            merchantInfo: {},
            storeInfo: {},
            dowmModal: false
        };
    },
    methods: {
        handleCancelPirnt() {
            this.printModal = false;
        },
        handlePirnt() {
            this.printLoading = true;
            handleCloundPrint(this.orderInfo.outTradeNo).then(
                res => {
                    this.printLoading = false;
                    if (res.data) {
                        this.$lf.message("打印成功", "success");
                        this.handleCancelPirnt();
                    } else {
                        this.$print(this.$refs["print-main"]);
                    }
                },
                () => {
                    this.printLoading = false;
                }
            );
        },
        init() {
            this.defaultCheckObj = this.takeTime;
        },
        loadData() {
            this.loading = true;
            getSettleTransactionList(this.filter).then(
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
        // 申请退款
        firstCheckSubmit() {
            this.$refs["rejectOrderForm"].validate(valid => {
                if (valid) {
                    let formData = { ...this.takeTime };
                    formData.refundAmount =
                        parseFloat(formData.refundAmount) * 100;
                    refundPass(formData).then(
                        res => {
                            this.modalLoading = false;
                            this.$lf.message("提交成功", "success");
                            this.firstCheckState = false;
                            this.loadData();
                        },
                        err => {
                            this.firstCheckState = true;
                            this.modalLoading = false;
                        }
                    );
                } else {
                    this.modalLoading = false;
                }
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        downloadExcel() {
            // this.$util.downloadExcel(
            //     "settle/transaction/export/list",
            //     this.filter
            // );
            this.downLoading = true;
            handleDownTask("/settle/transaction/export/list", this.filter).then(
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
        downModalCancel() {
            clearTimeout(timeOuter);
        },
        handleGoDownCenter() {
            this.dowmModal = false;
            this.$router.push({
                name: "download-task-list"
            });
        },
        rowClassName(row, index) {
            // [{"value":"00","desc":"交易成功"},{"value":"01","desc":"交易失败"},{"value":"03","desc":"部分退款"},{"value":"04","desc":"全部退款"},{"value":"05","desc":"退款中"},{"value":"06","desc":"已撤销"},{"value":"09","desc":"待支付"},{"value":"10","desc":"已接收，等待扣款"},{"value":"98","desc":"已关闭"},{"value":"99","desc":"支付超时"},{"value":"20","desc":"预授权"},{"value":"21","desc":"预授权取消"},{"value":"22","desc":"预授权完成"}]
            if (
                row.state == "01" ||
                row.state == "06" ||
                row.state == "98" ||
                row.state == "99" ||
                row.state == "21"
            ) {
                return "bg-pay-fail";
            }
            return "";
        }
    },
    activated() {
        this.init();
        /* let user = this.$store.state.user.userInfo;
        if (user.userTypes !== "3") {
            this.columns.pop();
        } */
    },
    components: {
        dateRangeSelector,
        pagination,
        InstitutionListSelector,
        PayTypeSelector,
        SettleStateSelector,
        xlinkMerchantSelector,
        xlinkStoreSelector,
        xlinkOperatorSelector
    }
};
</script>