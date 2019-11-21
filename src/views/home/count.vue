<style lang="less" >
@import "./home.less";
@import "../../styles/common.less";
.flex-card1 .ivu-card-head {
    border: none !important;
}
.demo-badge-alone {
    background: #5cb85c !important;
}
.ivu-badge {
    position: absolute !important;
    left: 10px;
    top: auto;
}
.flex-card1 {
    display: block !important;
    .flex-table {
        display: flex;
    }
    .table-header {
        max-height: 280px;
        .table-tr {
            display: flex;
            .table-td {
                border-right: 1px solid rgb(221, 216, 216);
                &:last-of-type {
                    border: none;
                }
            }
        }
    }
}

.flex-card1 .flex-table-title,
.flex-card1 .table-td {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    position: relative;
}
.flex-card1 .ivu-card-body {
    padding: 0;
}
.see-more {
    border-top: 1px solid rgb(221, 216, 216);
    padding: 15px 30px;
    text-align: center;
    cursor: pointer;
    margin-top: 20px;
}
.merchant {
    display: flex;
    height: 170px;
    padding: 25px;
    .flex-sh {
        flex: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid rgb(221, 216, 216);
        // padding: 30px;
        cursor: pointer;
        &:last-of-type {
            border: none;
        }
        .flex-row {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
footer .color-2db7f5 {
    color: #2db7f5;
}
.flex-center {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<template>
    <div class="home-main">
       <Row class="home-page-row1" :gutter="10">
            <Col span="12">
                <Card class="flex-card1">
                    <div slot="title" style="line-height:35px;">昨日商户Top 5</div>
                    <div slot="extra">
                        <ButtonGroup >
                            <Button :type="merchantData.type==0?'primary':'default'" style="width:100px;"  @click="changeTabs(0)">交易金额</Button>
                            <Button :type="merchantData.type==1?'primary':'default'" style="width:100px;" @click="changeTabs(1)">渠道分润</Button>
                        </ButtonGroup>
                    </div>
                    <div class="flex-table">
                        <div class="flex-table-title">商户名称</div>
                        <div class="flex-table-title">交易金额</div>
                        <div class="flex-table-title">渠道分润</div>
                    </div>
                    <div class="table-header">
                        <div class="table-show" v-if="merchantTotal">
                            <div class="table-tr" v-for="(item, index) in merchantTop">
                                <div class="table-td">
                                    <Badge :count="index+1" class-name="demo-badge-alone po"></Badge>
                                    <span style="padding-left:30px;">{{item.name}}</span>
                                </div>
                                <div class="table-td">{{item.amount}}</div>
                                <div class="table-td">{{item.profitAmount}}</div>
                            </div>
                        </div>
                        <div class="flex-center" v-else>暂无数据</div>
                    </div>
                    <div class="see-more color-2db7f5" @click="handlePage(0)">查看更多 </div>
                </Card>
            </Col>
            <Col span="12">
                <Card class="flex-card1">
                    <div slot="title" style="line-height:35px;">昨日渠道Top 5</div>
                    <div slot="extra">
                        <ButtonGroup >
                            <Button :type="agent.type==0?'primary':'default'" style="width:100px;"  @click="changeAgentTabs(0)">交易金额</Button>
                            <Button :type="agent.type==1?'primary':'default'" style="width:100px;" @click="changeAgentTabs(1)">渠道分润</Button>
                        </ButtonGroup>
                    </div>
                    <div class="flex-table">
                        <div class="flex-table-title">渠道名称</div>
                        <div class="flex-table-title">交易金额</div>
                        <div class="flex-table-title">渠道分润</div>
                    </div>
                    <div class="table-header">
                        <div class="table-show" v-if="agentTotal">
                            <div class="table-tr" v-for="(item, index) in agentTop">
                                <div class="table-td">
                                    <Badge :count="index+1" class-name="demo-badge-alone"></Badge>
                                    <span style="padding-left:30px;">{{item.name}}</span>
                                </div>
                                <div class="table-td">
                                    {{item.amount}}
                                </div>
                                <div class="table-td">{{item.profitAmount}}</div>
                            </div>
                        </div>
                        <div class="flex-center" v-else>暂无数据</div>
                    </div>
                    <div class="see-more color-2db7f5"  @click="handlePage(1)">查看更多 </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Row :gutter="10">
                <Col span="24">
                    <Card class="flex-card1" style="height:240px;">
                        <div slot="title"  style="line-height:35px;">商户交易状况统计</div>
                        <div slot="extra" style="height:35px;">
                            <date-range-selector style="width:100%;" v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                        </div>
                        <div class="merchant">
                           <div class="flex-sh" @click="handlePageTo('1')">
                                <div class="flex-row">
                                    <div class="flex-icon">
                                        <img src="../../images/home.png" alt="">
                                    </div>
                                    <div class="flex-text">
                                        有交易商户 <br/> <span class="color-2db7f5">{{count.existCount || 0}}</span>
                                    </div>
                                </div>
                           </div>
                            <div class="flex-sh" @click="handlePageTo('0')">
                                <div class="flex-row">
                                    <div class="flex-icon">
                                        <img src="../../images/home.png" alt="">
                                    </div>
                                    <div class="flex-text">
                                        无交易商户 <br/> <span class="color-2db7f5">{{count.notExistCount || 0}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-sh" @click="handlePageTo('新增有交易商户')">
                                <div class="flex-row">
                                    <div class="flex-icon">
                                        <img src="../../images/home.png" alt="">
                                    </div>
                                    <div class="flex-text">
                                        新增有交易商户 <br/> <span class="color-2db7f5">{{count.addExistCount || 0}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-sh" @click="handlePageTo('新增无交易商户')">
                                <div class="flex-row">
                                    <div class="flex-icon">
                                        <img src="../../images/home.png" alt="">
                                    </div>
                                    <div class="flex-text">
                                        新增无交易商户 <br/> <span class="color-2db7f5">{{count.addNotExistCount || 0}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Row>
        <Row class="margin-top-10">
            <Row :gutter="10">
                <Col span="24">
                    <Card class="flex-card1" style="height:240px;">
                        <div slot="title" style="line-height:35px;">
                            渠道交易状况统计
                        </div>
                        <div slot="extra" style="height:35px;">
                            <date-range-selector style="width:100%;" v-model="filter1._dateRange" :start-date.sync="filter1.beginDate" :end-date.sync="filter1.endDate"></date-range-selector>
                        </div>
                        <div class="merchant">
                           <div class="flex-sh" @click="handlePageToAgent('1')">
                                <div class="flex-row">
                                    <div class="flex-icon">
                                        <img src="../../images/home.png" alt="">
                                    </div>
                                    <div class="flex-text">
                                        有交易渠道 <br/> <span class="color-2db7f5">{{agentCount.existCount || 0}}</span>
                                    </div>
                                </div>
                           </div>
                            <div class="flex-sh" @click="handlePageToAgent('0')">
                                <div class="flex-row">
                                    <div class="flex-icon">
                                        <img src="../../images/home.png" alt="">
                                    </div>
                                    <div class="flex-text">
                                        无交易渠道 <br/> <span class="color-2db7f5">{{agentCount.notExistCount || 0}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-sh" @click="handlePageToAgent('新增有交易渠道')">
                                <div class="flex-row">
                                    <div class="flex-icon">
                                        <img src="../../images/home.png" alt="">
                                    </div>
                                    <div class="flex-text">
                                        新增有交易渠道 <br/> <span class="color-2db7f5">{{agentCount.addExistCount || 0}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-sh" @click="handlePageToAgent('新增无交易渠道')">
                                <div class="flex-row">
                                    <div class="flex-icon">
                                        <img src="../../images/home.png" alt="">
                                    </div>
                                    <div class="flex-text">
                                        新增无交易渠道 <br/> <span class="color-2db7f5">{{agentCount.addNotExistCount || 0}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Row>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-option";
import {
    getHomePageMerchantTop,
    getHomePageAgentTop,
    getHomePageMerchantCondition,
    getHomePageAgentCondition
} from "@/actions/profit";
export default {
    name: "merchant-form-data",
    data() {
        return {
            filter: {
                beginDate: "",
                endDate: "",
                _dateRange: ["", ""]
            },
            filter1: {
                beginDate: "",
                endDate: "",
                _dateRange: ["", ""]
            },
            userName: {},
            merchantTop: "",
            merchantData: {
                limit: 5,
                offset: 0,
                type: "0"
            },
            agent: {
                limit: 5,
                offset: 0,
                type: "0"
            },
            agentTop: "",
            count: {},
            agentTotal: "",
            merchantTotal: "",
            agentCount: {}
        };
    },
    methods: {
        handlePage(type) {
            if (type == 0) {
                this.$router.push({
                    name: "yesterday-merchants",
                    params: { type: this.merchantData.type }
                });
            } else {
                this.$router.push({
                    name: "yesterday-agent",
                    params: { type: this.agent.type }
                });
            }
        },
        handlePageToAgent(type) {
            if (type === "0" || type === "1") {
                let form = {
                    filter1: this.filter1,
                    type: type
                };
                this.$router.push({
                    name: "agent-stauts",
                    params: { form: form }
                });
            } else if (type === "新增有交易渠道" || type === "新增无交易渠道") {
                let agentType = type === "新增有交易渠道" ? "1" : "0";
                let form = {
                    filter1: this.filter1,
                    type: agentType,
                    add: true
                };
                this.$router.push({
                    name: "agent-stauts",
                    params: { form: form }
                });
            }
        },
        handlePageTo(type) {
            if (type === "0" || type === "1") {
                let form = {
                    filter: this.filter,
                    type: type
                };
                this.$router.push({
                    name: "merchant-stauts",
                    params: { form: form }
                });
            } else if (type === "新增有交易商户" || type === "新增无交易商户") {
                let merchantType = type === "新增有交易商户" ? "1" : "0";
                let form = {
                    filter: this.filter,
                    type: merchantType,
                    add: true
                };
                this.$router.push({
                    name: "merchant-stauts",
                    params: { form: form },
                    add: true
                });
            }
        },
        changeTabs(type) {
            this.merchantData.type = type;
            getHomePageMerchantTop(this.merchantData).then(res => {
                this.merchantTop = res.data.rows;
                this.merchantTotal = res.data.total;
            });
        },
        changeAgentTabs(type) {
            this.agent.type = type;
            getHomePageAgentTop(this.agent).then(res => {
                this.agentTop = res.data.rows;
                this.agentTotal = res.data.total;
            });
        },
        init() {
            getHomePageMerchantCondition(this.filter).then(res => {
                this.count = res.data;
            });
            getHomePageAgentCondition(this.filter1).then(res => {
                this.agentCount = res.data;
            });
            getHomePageAgentTop(this.agent).then(res => {
                this.agentTop = res.data.rows;
                this.agentTotal = res.data.total;
            });
            getHomePageMerchantTop(this.merchantData).then(res => {
                this.merchantTop = res.data.rows;
                this.merchantTotal = res.data.total;
            });
        },
        handleTime() {
            var end;
            var start;
            var myDate = new Date();
            myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            myDate.getMonth(); //获取当前月份(0-11,0代表1月)
            myDate.getDate(); //获取当前日(1-31)
            myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
            myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
            myDate.getHours(); //获取当前小时数(0-23)
            myDate.getMinutes(); //获取当前分钟数(0-59)
            myDate.getSeconds(); //获取当前秒数(0-59)
            myDate.getMilliseconds(); //获取当前毫秒数(0-999)

            //月
            var s;
            if (myDate.getMonth() < 9) {
                s = "0" + (myDate.getMonth() + 1);
            }
            if (myDate.getMonth() >= 9) {
                s = myDate.getMonth() + 1;
            }

            var ss;
            if (myDate.getMonth() < 10) {
                ss = "0" + myDate.getMonth();
            }
            if (myDate.getMonth() >= 10) {
                ss = myDate.getMonth();
            }
            var c;
            if (myDate.getDate() < 10) {
                c = "0" + myDate.getDate();
            } else if (myDate.getDate() >= 10) {
                c = myDate.getDate();
            }

            end = myDate.getFullYear() + "-" + s + "-" + c;
            if (s == "01") {
                ss = "12";
                start = myDate.getFullYear() - 1 + "-" + ss + "-" + c;
            } else {
                if (c > 28) {
                    if (ss == "02") {
                        if (
                            (myDate.getFullYear() % 4 == 0 &&
                                myDate.getFullYear() % 100 != 0) ||
                            (myDate.getFullYear() % 100 == 0 &&
                                myDate.getFullYear() % 400 == 0)
                        ) {
                            c = 29;
                        } else {
                            c = 28;
                        }
                    }
                    if (ss == "04" || ss == "06" || ss == "09" || ss == "11") {
                        c = 30;
                    }
                }
                start = myDate.getFullYear() + "-" + ss + "-" + c;
            }
            this.filter.beginDate = start + " 00:00:00";
            this.filter.endDate = end + " 23:59:59";
            this.filter._dateRange = [
                this.filter.beginDate,
                this.filter.endDate
            ];
            this.filter1.beginDate = start + " 00:00:00";
            this.filter1.endDate = end + " 23:59:59";
            this.filter1._dateRange = [
                this.filter1.beginDate,
                this.filter1.endDate
            ];
        }
    },
    created() {
        this.init();
        this.handleTime();
        this.changeTabs();
        this.changeAgentTabs();
        this.merchantData.type = 0;
        this.agent.type = 0;
        this.userName = this.$store.state.user.userInfo;
    },
    activated() {
        this.init();
        this.changeTabs();
        this.changeAgentTabs();
        this.merchantData.type = 0;
        this.agent.type = 0;
    },
    components: {
        dateRangeSelector
    }
};
</script>