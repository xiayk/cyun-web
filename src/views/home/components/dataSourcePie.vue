<template>
    <div style="width:100%;height:100%;" id="data_source_con">
        <div style="text-align: center;line-height:300px;">{{message}}</div>
    </div>
</template>

<script>
import echarts from "echarts";
import { getHomePageCollectYesterday } from "@/actions/sys";
export default {
    name: "dataSourcePie",
    props: ["pieType"],

    data() {
        return {
            message: "暂无数据",
            seriesData: [],
            amount: "",
            count: ""
        };
    },
    computed: {
        formData() {
            return {
                method: this.pieType
            };
        }
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
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.$store.state.user.userInfo.userType == "7") return;
            let ratio = [];
            let storeName = [];
            let raString = "";
            getHomePageCollectYesterday().then(res => {
                if (res.data.total === 0) {
                    this.message = "暂无数据";
                } else {
                    let rows = res.data.rows;
                    rows.forEach(element => {
                        if (this.pieType == 0) {
                            raString = element.amount;
                            ratio.push({
                                name: `${element.name} \n 金额: ${element.amount}`,
                                value: element.amount
                            });
                            this.seriesData = "金额";
                        } else if (this.pieType == 1) {
                            this.seriesData = "笔数";
                            ratio.push({
                                name: `${element.name} \n笔数: ${element.count}`,
                                value: element.count
                            });
                            raString = element.count;
                        }
                        storeName.push(element.name);
                    });
                    this.echart(ratio, storeName);
                }
            });
        },
        echart(ratio, storeName) {
            let _this = this;
            this.$nextTick(() => {
                var dataSourcePie = echarts.init(
                    document.getElementById("data_source_con")
                );
                const option = {
                    tooltip: {
                        trigger: "item",
                        formatter: `{b}`
                    },
                    series: [
                        {
                            name: "",
                            type: "pie",
                            radius: "50%",
                            center: ["50%", "50%"],
                            data: ratio,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener("resize", function() {
                    dataSourcePie.resize();
                });
            });
        }
    }
};
</script>
