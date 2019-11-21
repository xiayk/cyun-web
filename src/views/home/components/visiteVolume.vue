

<template>
    <div style="width:100%;height:100%;" id="visite_volume_con">
        <div style="text-align: center;line-height:250px;">{{message}}</div>
    </div>
</template>
<script>
import echarts from "echarts";
import themeSwitchVue from "../../main-components/theme-switch/theme-switch.vue";
import { getHomePageCollectDaily } from "@/actions/sys";
export default {
    name: "visiteVolume",
    props: ["activeVisite"],
    data() {
        return {
            message: "暂无数据"
        };
    },
    computed: {
        formData() {
            return {
                days: this.activeVisite
            };
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        "formData.days": {
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
            let data = [];
            let num = [];
            getHomePageCollectDaily(this.formData).then(res => {
                res.data.forEach(element => {
                    console.log(element);
                    data.push(element.daily);
                    num.push(element.num);
                });
                this.echart(data, num);
            });
        },
        echart(data, num) {
            this.ddate = data;
            this.num = num;
            this.$nextTick(() => {
                let visiteVolume = echarts.init(
                    document.getElementById("visite_volume_con")
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
                            name: "新增商户趋势",
                            type: "line",
                            smooth: true,
                            data: num
                        }
                    ]
                };
                visiteVolume.setOption(option);
                window.addEventListener("resize", function() {
                    // 监控浏览器窗口大小
                    visiteVolume.resize();
                });
            });
        }
    }
};
</script>
