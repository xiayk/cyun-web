<template>
    <div style="width:100%;height:100%;" id="service_requests">
        <div style="text-align: center;line-height:250px;">{{message}}</div>
    </div>
</template>

<script>
import echarts from "echarts";
import { getHomePageCollectDaily } from "@/actions/sys";
export default {
    name: "serviceRequests",
    props: ["chartType", "days"],
    data() {
        return {
            message: "暂无数据"
        };
    },
    computed: {
        formData() {
            return {
                method: this.chartType,
                days: this.days
            };
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        "formData.method": {
            handler: function(val, oldVal) {
                this.$nextTick(() => {
                    this.init();
                });
            },
            // 深度观察
            deep: true
        }
    },
    methods: {
        init() {
            if (this.$store.state.user.userInfo.userType == "7") return;
            let data = [];
            let num = [];
            let amount = [];
            let type =
                this.chartType == 0 || this.chartType == 2 ? "amount" : "num";
            getHomePageCollectDaily(this.formData).then(res => {
                res.data.forEach(element => {
                    data.push(element.daily);
                    if (this.chartType == 0) {
                        amount.push(element.paidAmount);
                    } else if (this.chartType == 1) {
                        amount.push(element.paidCount);
                    } else if (this.chartType == 2) {
                        amount.push(element.refundAmount);
                    } else if (this.chartType == 3) {
                        amount.push(element.refundCount);
                    }
                });
                this.echart(data, num, amount);
            });
        },
        echart(data, num, amount) {
            let labels = [
                "交易成功金额",
                "交易成功笔数",
                "退款金额",
                "退款笔数"
            ];
            this.$nextTick(() => {
                let serviceRequests = echarts.init(
                    document.getElementById("service_requests")
                );
                serviceRequests.clear();
                const option = {
                    tooltip: {
                        trigger: "axis"
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: data
                    },
                    yAxis: {
                        type: "value"
                    },
                    series: [
                        {
                            name: labels[this.chartType],
                            type: "line",
                            smooth: true,
                            data: amount
                        }
                    ]
                };
                serviceRequests.setOption(option);
                window.addEventListener("resize", function() {
                    // 监控浏览器窗口大小
                    serviceRequests.resize();
                });
            });
        }
    }
};
</script>
