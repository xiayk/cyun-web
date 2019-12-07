<style lang="less" >
@import "./home.less";
@import "../../styles/common.less";
.flex-card .ivu-card-head {
    border-bottom: none !important;
}
.flex-icon {
    img {
        width: 100%;
        height: 100%;
    }
    .flex-img {
        width: 50px;
        height: 38px;
    }
}
.flex-entry-home {
    display: flex;
    justify-content: center;
    align-items: center;
    .flex-add {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #eae4e4;
        &:last-of-type {
            border: none;
        }
        .flex-center1 {
            text-align: center;
        }
    }
}
.flex-card .ivu-card-head {
    border: none;
}
.ivu-card-head-inner,
.ivu-card-head p {
    font-weight: 300;
}

.ivu-card-body .sum-amount {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 430px;
}
.ivu-card-body .sum-amount .flex-amount {
    flex: 4;
    justify-content: center;
    align-items: center;
    display: flex;
    border-right: 1px solid #ccc;
    &:last-of-type {
        border: none;
    }
    padding: 10px 1.5%;
}
.card-title {
    color: #000;
    height: 36px !important;
    line-height: 36px !important;
}
.table-btn {
    margin: 10px 0;
    background: #fff;
}
</style>
<template>
    <div class="home-main">
        <Button
            v-if="userName.userTypes==1"
            type="ghost"
            size="large"
            class="table-btn"
            @click="hanldPageCount"
        >商户渠道报表</Button>
        <!-- 账户信息 -->
        <Row :gutter="10">
            <Col span="24">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col
                        :span="(userName.operatorType != 3&&userName.operatorType != 4)?14:24"
                        :style="{marginBottom: '10px'}"
                    >
                        <Card class="flex-card">
                            <div slot="title">
                                <ButtonGroup size="small">
                                    <Button
                                        :type="active=='yes'?'primary':'default'"
                                        style="width:100px;"
                                        @click="handleActive('yes')"
                                    >昨日交易数据</Button>
                                    <Button
                                        v-if="userName.userType==3&&userName.operatorType"
                                        :type="active=='today'?'primary':'default'"
                                        style="width:100px;"
                                        @click="handleActive('today')"
                                    >今日交易数据</Button>
                                </ButtonGroup>
                            </div>
                            <a
                                v-if="userName.userType==3&&userName.operatorType"
                                href="#"
                                slot="extra"
                                @click.prevent="handleSeeMore"
                            >查看更多</a>
                            <div class="sum-amount" style="height:85px;">
                                <div class="flex-amount">
                                    <div class="flex-icon">
                                        <div class="flex-img">
                                            <img src="../../images/home.png" alt />
                                        </div>
                                    </div>
                                    <div class="flex-success">
                                        <div class="flex-text">
                                            交易成功金额
                                            <br />
                                            <span>{{paid.paidAmount}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-amount">
                                    <div class="flex-icon">
                                        <div class="flex-img">
                                            <img src="../../images/home.png" alt />
                                        </div>
                                    </div>
                                    <div class="flex-success">
                                        <div class="flex-text">
                                            交易成功笔数
                                            <br />
                                            <span>{{paid.paidCount}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-amount">
                                    <div class="flex-icon">
                                        <div class="flex-img">
                                            <img src="../../images/home.png" alt />
                                        </div>
                                    </div>
                                    <div class="flex-success">
                                        <div class="flex-text">
                                            退款金额
                                            <br />
                                            <span>{{paid.refundAmount}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-amount">
                                    <div class="flex-icon">
                                        <div class="flex-img">
                                            <img src="../../images/home.png" alt />
                                        </div>
                                    </div>
                                    <div class="flex-success">
                                        <div class="flex-text">
                                            退款笔数
                                            <br />
                                            <span>{{paid.refundCount}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col
                        span="10"
                        :style="{marginBottom: '10px'}"
                        v-if="userName.operatorType != 3&&userName.operatorType != 4"
                    >
                        <Card>
                            <p slot="title" class="card-title">昨日进件数量</p>
                            <div>
                                <div
                                    style="height:85px;"
                                    class="flex-entry-home"
                                    v-if="userName.userTypes==3"
                                >
                                    <div class="flex-add">
                                        <div class="flex-center1">
                                            <p>新增门店</p>
                                            <p>{{addCount.addStoreCount}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="flex-entry-home" style="height:85px;">
                                    <div class="flex-add">
                                        <div class="flex-center1">
                                            <p>新增渠道</p>
                                            <p>{{addCount.addAgentCount}}</p>
                                        </div>
                                    </div>
                                    <div class="flex-add">
                                        <div class="flex-center1">
                                            <p>新增商户</p>
                                            <p>{{addCount.addMerchantCount}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10" v-if="userName.operatorType != 3&&userName.operatorType != 4">
            <Row :gutter="10">
                <Col span="24">
                    <Row class-name="home-page-row1" :gutter="10">
                        <Col span="14" :style="{marginBottom: '10px'}">
                            <Card class="flex-card">
                                <div slot="title">
                                    <ButtonGroup>
                                        <Button
                                            :type="activeDays==7?'primary':'default'"
                                            style="width:100px;"
                                            @click="changeDays(7)"
                                        >7天</Button>
                                        <Button
                                            :type="activeDays==30?'primary':'default'"
                                            style="width:100px;"
                                            @click="changeDays(30)"
                                        >30天</Button>
                                    </ButtonGroup>
                                </div>
                                <div slot="extra">
                                    <ButtonGroup>
                                        <Button
                                            :type="activeChartType==0?'primary':'default'"
                                            style="width:100px;"
                                            @click="changeTabs(0)"
                                        >交易成功金额</Button>
                                        <Button
                                            :type="activeChartType==1?'primary':'default'"
                                            style="width:100px;"
                                            @click="changeTabs(1)"
                                        >交易成功笔数</Button>
                                        <Button
                                            :type="activeChartType==2?'primary':'default'"
                                            style="width:100px;"
                                            @click="changeTabs(2)"
                                        >退款金额</Button>
                                        <Button
                                            :type="activeChartType==3?'primary':'default'"
                                            style="width:100px;"
                                            @click="changeTabs(3)"
                                        >退款笔数</Button>
                                    </ButtonGroup>
                                </div>
                                <div class="line-chart-con" style="height:300px;">
                                    <service-requests
                                        :chartType="activeChartType"
                                        :days="activeDays"
                                    ></service-requests>
                                </div>
                            </Card>
                        </Col>
                        <Col span="10" :style="{marginBottom: '10px'}">
                            <Card class="flex-card" style="height:392px;">
                                <div slot="title" style="line-height:35px;">
                                    <span
                                        v-if="userName.userTypes==3 || userName.userTypes==2"
                                    >昨日支付方式统计</span>
                                    <span v-if="userName.userTypes==1">昨日银行交易统计</span>
                                </div>
                                <div slot="extra">
                                    <ButtonGroup>
                                        <Button
                                            :type="sourcePieType==0?'primary':'default'"
                                            style="width:100px;"
                                            @click="pieChange(0)"
                                        >金额</Button>
                                        <Button
                                            :type="sourcePieType==1?'primary':'default'"
                                            style="width:100px;"
                                            @click="pieChange(1)"
                                        >笔数</Button>
                                    </ButtonGroup>
                                </div>
                                <div class="data-source-row">
                                    <dataSourcePie :pieType="sourcePieType"></dataSourcePie>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    </div>
</template>

<script>
import visiteVolume from "./components/visiteVolume.vue";
import serviceRequests from "./components/serviceRequests.vue";
import agentRequests from "./components/agentRequests.vue";
import dataSourcePie from "./components/dataSourcePie.vue";
import transactionVolume from "./components/transactionVolume.vue";
import themeSwitchVue from "../main-components/theme-switch/theme-switch.vue";
/* import {
    getMenus,
    getHomePageReviewCount,
    getHomePageRefundReviewCount,
    getHomePageTransaction
} from "@/actions/sys"; */
import {
    getHomePageTransaction,
    getHomePageCollectAddYesterday
} from "@/actions/sys";
export default {
    name: "home",
    data() {
        return {
            activeAgent: 7,
            activeVisite: 7,
            activeChartType: 0,
            activeDays: 7,
            sourcePieType: 0,
            userName: {},
            form: {},
            refund: {},
            merchantCheck: false,
            agentCheck: false,
            transactionRejective: false,
            rejective: false,
            form: {
                bankClassCode: "",
                provinceId: "",
                cityId: "",
                bankInfoCode: "",
                bankInfo: ""
            },
            paid: {
                paidCount: "",
                paidAmount: "",
                refundCount: "",
                refundAmount: ""
            },
            addCount: {},
            active: "yes"
        };
    },
    methods: {
        handleActive(active) {
            this.active = active;
            this.getHomePageTrans();
        },
        handleSeeMore() {
            let { userName } = this;
            if (userName.operatorType) {
                if (userName.operatorType == 1) {
                    this.$router.push({
                        name: "profit-diurnal"
                    });
                } else if (userName.operatorType == 3) {
                    this.$router.push({
                        name: "profit-count"
                    });
                } else if (userName.operatorType == 4) {
                    this.$router.push({
                        name: "operator-daily"
                    });
                }
            }
        },
        pieChange(active) {
            this.sourcePieType = active;
        },
        agentDate(item) {
            this.activeAgent = item;
        },
        visiteDate(item) {
            this.activeVisite = item;
        },
        changeTabs(activeTab) {
            this.activeChartType = activeTab;
            // this.activeDays = 7;
        },
        changeDays(days) {
            this.activeDays = days;
        },
        hanldPageCount() {
            this.$router.push({ name: "merchant-form-data" });
        },
        getHomePageTrans() {
            let type = this.active == "yes" ? "yesterday" : "today";
            getHomePageTransaction(type).then(res => {
                this.paid = res.data;
            });
        },
        getHomePageCollectAddYesterday() {
            getHomePageCollectAddYesterday().then(res => {
                this.addCount = res.data;
            });
        },
        init() {
            if (this.$store.state.user.userInfo.userType == "7") return;
            this.getHomePageTrans();
            const { userName } = this;
            if (userName.operatorType != 3 && userName.operatorType != 4) {
                this.getHomePageCollectAddYesterday();
            }
        }
    },
    created() {
        let name = this.$store.state.user.userInfo;
        this.userName = name;
        // this.init();
    },
    activated() {
        // this.init();
    },
    components: {
        visiteVolume,
        serviceRequests,
        agentRequests,
        dataSourcePie,
        transactionVolume
    }
};
</script>