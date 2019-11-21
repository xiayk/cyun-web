<template>
    <div style="width:100%;height:100%;" id="transaction_volume">
        <div style="text-align: center;line-height:250px;">{{message}}</div>        
    </div>
</template>

<script>
import echarts from "echarts";
import { getHomePagePayRatioInstitution } from "@/actions/sys";
export default {
    name: "transactionVolume",
    data() {
        return {
            message: "暂无数据"
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let ratio = [];
            let storeName = [];
            let raString = "";
            let institutionName = "";
            getHomePagePayRatioInstitution().then(res => {
                if (res.data.length == 0) {
                    this.message = "暂无数据";
                } else {
                    res.data.forEach(element => {
                        if (element.ratio.length == 7) {
                            raString = element.ratio.substr(0, 6);
                        } else if (element.ratio.length == 6) {
                            raString = element.ratio.substr(0, 5);
                        } else if (element.ratio.length == 5) {
                            raString = element.ratio.substr(0, 4);
                        }
                        if (element.institutionCode == "WECHAT") {
                            institutionName = "微信";
                        } else {
                            institutionName = "支付宝";
                        }
                        ratio.push({
                            name: institutionName,
                            value: raString
                        });
                        storeName.push(institutionName);
                    });
                    this.echart(ratio, storeName);
                }
            });
        },
        echart(ratio, storeName) {
            this.$nextTick(() => {
                var transactionVolume = echarts.init(
                    document.getElementById("transaction_volume")
                );
                const option = {
                    tooltip: {
                        trigger: "item",
                        formatter: "{a}:{c} (%)"
                    },
                    legend: {
                        orient: "vertical",
                        left: "right",
                        data: storeName
                    },
                    series: [
                        {
                            name: "收款比例",
                            type: "pie",
                            radius: "66%",
                            center: ["50%", "60%"],
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
                transactionVolume.setOption(option);
                window.addEventListener("resize", function() {
                    transactionVolume.resize();
                });
            });
        }
    }
};
</script>
