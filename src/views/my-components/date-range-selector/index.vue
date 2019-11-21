<template>
    <DatePicker
        split-panels
        transfer
        v-bind="$attrs"
        type="datetimerange"
        :options="options"
        format="yyyy-MM-dd HH:mm:ss"
        :placeholder="placeholder"
        v-model="currentValue"
    ></DatePicker>
</template>

<script>
import moment from "moment-mini";
export default {
    name: "date-range-selector",
    props: {
        value: {
            type: Array,
            default: ["", ""]
        },
        startDate: "",
        endDate: "",
        placeholder: {
            type: String,
            default: "请选择"
        }
    },
    data() {
        return {
            currentValue: this.value,
            data: [],
            options: {
                shortcuts: [
                    {
                        text: "今天",
                        value() {
                            return [
                                moment().format("YYYY-MM-DD 00:00:00"),
                                moment().format("YYYY-MM-DD 23:59:59")
                            ];
                        }
                    },
                    {
                        text: "昨天",
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            return [start, end];
                        }
                    },
                    {
                        text: "近7天",
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            return [start, end];
                        }
                    },
                    {
                        text: "本周",
                        value() {
                            const start = new Date(
                                moment()
                                    .weekday(1)
                                    .format("YYYY-MM-DD 00:00:00")
                            );
                            const end = new Date(
                                moment()
                                    .weekday(7)
                                    .format("YYYY-MM-DD 00:00:00")
                            );
                            return [start, end];
                        }
                    },
                    {
                        text: "上周",
                        value() {
                            const start = new Date(
                                moment()
                                    .weekday(-6)
                                    .format("YYYY-MM-DD 00:00:00")
                            );
                            const end = new Date(
                                moment()
                                    .weekday(0)
                                    .format("YYYY-MM-DD 00:00:00")
                            );
                            return [start, end];
                        }
                    },
                    {
                        text: "本月",
                        value() {
                            const start = new Date(
                                moment()
                                    .startOf("month")
                                    .format("YYYY-MM-DD 00:00:00")
                            );
                            const end = new Date(
                                moment()
                                    .endOf("month")
                                    .format("YYYY-MM-DD 00:00:00")
                            );
                            return [start, end];
                        }
                    },
                    {
                        text: "上个月",
                        value() {
                            const start = new Date(
                                moment()
                                    .subtract(1, "month")
                                    .startOf("month")
                                    .format("YYYY-MM-DD 00:00:00")
                            );
                            const end = new Date(
                                moment()
                                    .subtract(1, "month")
                                    .endOf("month")
                                    .format("YYYY-MM-DD 00:00:00")
                            );
                            return [start, end];
                        }
                    }
                ]
            }
        };
    },
    activated() {},
    watch: {
        currentValue(val, oldVal) {
            if (val !== oldVal) {
                let flag = false,
                    endDate = "";
                if (val[1]) {
                    endDate = moment(val[1]).format("YYYY-MM-DD HH:mm:ss");
                    flag = /00:00:00/.test(endDate);
                    endDate = flag
                        ? endDate.replace(/00:00:00/, "23:59:59")
                        : endDate;
                    val[1] = moment(endDate);
                }
                this.$emit("input", val);
                this.$emit(
                    "update:startDate",
                    val[0] ? moment(val[0]).format("YYYY-MM-DD HH:mm:ss") : ""
                );
                this.$emit(
                    "update:endDate",
                    val[1] ? moment(val[1]).format("YYYY-MM-DD HH:mm:ss") : ""
                );
            }
        },
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>

