<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <!-- 账户信息 -->
        <Row :gutter="10">
            <Col span="24">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col span="12" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row
                                        class-name="made-child-con-middle"
                                        type="flex"
                                        align="middle"
                                    ></Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row
                                        class-name="made-child-con-middle"
                                        type="flex"
                                        align="middle"
                                    >
                                        <div>
                                            <h3
                                                style="padding-bottom:10px;"
                                            >账户名:{{userName.userName}}</h3>
                                            <p>账户类型:{{userName.userTypeDesc||'未知'}}</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="12" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-checkbox-outline"></Icon>待办事项
                            </p>
                            <div class="to-do-list-con" style="height:85px;">
                                <div v-if="agentCheck">
                                    <span>您有{{form.waittingReviewAgentCount}}个渠道商待审核</span>
                                    <span>
                                        <a @click="$router.push({ name: 'agent-check' })">立即前往审核>>></a>
                                    </span>
                                </div>
                                <div style="margin-top:5px;" v-if="merchantCheck">
                                    <span>您有{{form.waittingReviewMerchantCount}}个商户待审核</span>
                                    <span>
                                        <a
                                            @click="$router.push({ name: 'merchant-check' })"
                                        >立即前往审核>>></a>
                                    </span>
                                </div>
                                <div style="margin-top:5px;" v-if="transactionRejective&&rejective">
                                    <span>您有{{refund.refundReviewCount}}个退款待审核</span>
                                    <span>
                                        <a
                                            @click="$router.push({ name: 'transaction-rejective' })"
                                        >立即前往审核>>></a>
                                    </span>
                                </div>
                                <div style="margin-top:5px;" v-if="userName.userTypes==3">
                                    <span>订单流水查询</span>
                                    <span>
                                        <a
                                            @click="$router.push({ name: 'transaction-order' })"
                                        >查询所有订单交易流水情况>>></a>
                                    </span>
                                </div>
                                <div style="margin-top:5px;" v-if="userName.userTypes==1">
                                    <span>渠道资料录入</span>
                                    <span>
                                        <a @click="$router.push({ name: 'agent-add' })">录入新的渠道商资料>>></a>
                                    </span>
                                </div>
                                <div style="margin-top:5px;" v-if="userName.userTypes==1">
                                    <span>商户资料录入</span>
                                    <span>
                                        <a @click="$router.push({ name: 'merchant-add' })">新增商户资料>>></a>
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <!--新增商户趋势  -->
            <Col span="24" v-if="userName.userTypes==1||userName.userTypes==2">
                <Row>
                    <Card>
                        <div slot="title" style="height:32px;line-height:32px;">
                            <Icon type="android-map"></Icon>新增商户趋势
                        </div>
                        <div slot="extra">
                            <ButtonGroup>
                                <Button
                                    :type="activeVisite==7?'primary':'default'"
                                    style="width:100px;"
                                    @click="visiteDate(7)"
                                >7天</Button>
                                <Button
                                    :type="activeVisite==30?'primary':'default'"
                                    style="width:100px;"
                                    @click="visiteDate(30)"
                                >30天</Button>
                                <!-- <Button :type="activeVisite==90?'primary':'default'" style="width:100px;" @click="visiteDate(90)">90天</Button> -->
                            </ButtonGroup>
                        </div>
                        <div class="map-con" style="height:274px;">
                            <visite-volume :activeVisite="activeVisite"></visite-volume>
                        </div>
                        <!-- <div class="map-con" style="height:274px;"v-else>
                            <p>无权查看</p>
                        </div>-->
                    </Card>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10" v-if="userName.userTypes==1||userName.userTypes==3">
            <Card>
                <div slot="title">
                    <ButtonGroup>
                        <Button
                            :type="activeChartType==0?'primary':'default'"
                            style="width:100px;"
                            @click="changeTabs(0)"
                        >交易金额</Button>
                        <Button
                            :type="activeChartType==1?'primary':'default'"
                            style="width:100px;"
                            @click="changeTabs(1)"
                        >交易笔数</Button>
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
                <div slot="extra">
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
                <div class="line-chart-con" style="height:300px;">
                    <service-requests :chartType="activeChartType" :days="activeDays"></service-requests>
                </div>
            </Card>
        </Row>
        <!-- 代理商日分润统计 -->
        <Row class="margin-top-10" v-if="userName.userTypes==2">
            <Card>
                <div slot="title" style="height:32px;line-height:32px;">
                    <Icon type="android-map"></Icon>每日分润趋势
                </div>
                <div slot="extra">
                    <ButtonGroup>
                        <Button
                            :type="activeAgent==7?'primary':'default'"
                            style="width:100px;"
                            @click="agentDate(7)"
                        >7天</Button>
                        <Button
                            :type="activeAgent==30?'primary':'default'"
                            style="width:100px;"
                            @click="agentDate(30)"
                        >30天</Button>
                        <Button
                            :type="activeAgent==90?'primary':'default'"
                            style="width:100px;"
                            @click="agentDate(90)"
                        >90天</Button>
                    </ButtonGroup>
                </div>
                <div class="line-chart-con" style="height:300px;">
                    <agentRequests :activeAgent="activeAgent"></agentRequests>
                </div>
            </Card>
        </Row>
        <Row :gutter="0" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>今日交易金额来源比例
                    </p>
                    <div class="data-source-row">
                        <transactionVolume></transactionVolume>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>今日各门店收款比例
                    </p>
                    <div class="data-source-row">
                        <dataSourcePie></dataSourcePie>
                    </div>
                </Card>
            </Col>
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
import {
    getMenus,
    getHomePageReviewCount,
    getHomePageRefundReviewCount
} from "@/actions/sys";
export default {
    name: "home",
    data() {
        return {
            activeAgent: 7,
            activeVisite: 7,
            activeChartType: 0,
            activeDays: 7,
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
            }
        };
    },
    methods: {
        agentDate(item) {
            this.activeAgent = item;
        },
        visiteDate(item) {
            this.activeVisite = item;
        },
        changeTabs(activeTab) {
            this.activeChartType = activeTab;
            this.activeDays = 7;
        },
        changeDays(days) {
            this.activeDays = days;
        },
        check() {
            let accessMenu = [];
            getMenus().then(res => {
                res.data &&
                    res.data.forEach(item => {
                        accessMenu.push({ item });
                    });
                for (let i = 0; i < accessMenu.length; i++) {
                    let nodes = accessMenu[i].item.nodes;
                    for (let j = 0; j < nodes.length; j++) {
                        if (nodes[j].code == "merchant-check") {
                            this.merchantCheck = true;
                        } else if (nodes[j].code == "agent-check") {
                            this.agentCheck = true;
                        } else if (nodes[j].code == "transaction-rejective") {
                            this.transactionRejective = true;
                        }
                    }
                }
            });
            getHomePageReviewCount().then(res => {
                this.form = res.data;
            });
            if (this.userName.userTypes == 3) {
                getHomePageRefundReviewCount().then(res => {
                    this.refund = res.data;
                    this.rejective = true;
                });
            }
        }
    },
    created() {
        // let name = this.$store.state.user.userInfo;
        // this.userName = name;
        // this.check();
        // console.log(this.$store.state.setAccess, "0");
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