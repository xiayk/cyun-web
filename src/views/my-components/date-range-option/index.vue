<template>
    <DatePicker transfer v-bind="$attrs" type="datetimerange" :options="options" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择.." v-model="currentValue"></DatePicker>
</template>

<script>
import moment from "moment-mini";
export default {
    name: "date-range-option",
    props: {
        value: {
            type: Array,
            default: ["", ""]
        },
        startDate: "",
        endDate: ""
    },
    data() {
        return {
            currentValue: this.value,
            data: [],
            options: {},
            endTime: "",
            startTime: "",
            defaultShow: true,
            defaultTime: ""
        };
    },
    activated() {
        this.handleTime();
    },
    methods: {
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
            let arr = [start + " 00:00:00", end];
            this.currentValue = arr;
        }
    },
    watch: {
        currentValue(val, oldVal) {
            if (val !== oldVal) {
                let flag = false,
                    endDate = "";
                if (val[1]) {
                    endDate = moment(val[1]).format("YYYY-MM-DD HH:mm:ss");
                    endDate = endDate.replace(/00:00:00/, "23:59:59");
                    val[1] = moment(endDate);
                }
                this.$emit("input", val);
                this.$emit(
                    "update:startDate",
                    val[0] ? moment(val[0]).format("YYYY-MM-DD HH:mm:ss") : ""
                );
                this.$emit("update:endDate", endDate);
            }
        },
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>

