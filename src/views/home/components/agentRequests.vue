<template>
    <div style="width:100%;height:100%;" id="active_agent">
        <div style="text-align: center;line-height:250px;">{{message}}</div>        
    </div>
</template>
<script>
import echarts from "echarts";
import { getHomePageDailyAgentProfitCount } from "@/actions/sys";
export default {
    name: "agentRequests",
    props: ["activeAgent"],
    data() {
        return {
            message: "暂无数据"
        };
    },
    computed: {
        formData() {
            return {
                days: this.activeAgent
            };
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        "formData.days": {
            handler: function(val, oldVal) {
                console.log(val, oldVal);
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
            let data = [];
            let num = [];
            getHomePageDailyAgentProfitCount(this.formData).then(res => {
                res.data.forEach(element => {
                    data.push(element.ddate);
                    num.push(element.amount);
                });
                this.echart(data, num);
            });
        },
        echart(data, num) {
            this.ddate = data;
            this.num = num;
            this.$nextTick(() => {
                let activeAgent = echarts.init(
                    document.getElementById("active_agent")
                );
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
                            name: "每日分润趋势",
                            type: "line",
                            smooth: true,
                            data: num
                        }
                    ]
                };
                activeAgent.setOption(option);
                window.addEventListener("resize", function() {
                    // 监控浏览器窗口大小
                    activeAgent.resize();
                });
            });
        }
    }
};
</script>
