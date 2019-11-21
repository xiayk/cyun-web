<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
        <Option value="">请选择</Option>
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
import { getAgentAuditStatesList } from "@/actions/selector";
export default {
    name: "agent-audit-state-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        filter: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            currentValue: this.vlaue,
            data: [
                {
                    value: "-1",
                    desc: "待完善"
                },
                {
                    value: "0",
                    desc: "待进件"
                },
                {
                    value: "1",
                    desc: "已进件"
                },
                {
                    value: "2",
                    desc: "已完成"
                }
            ]
        };
    },
    activated() {
        // getAgentAuditStatesList().then(res => {
        //     this.data = res.data.filter(item => {
        //         return this.filter.length > 0
        //             ? this.filter.includes(parseInt(item.value))
        //             : true;
        //     });
        // });
    },
    methods: {
        handleChange(val) {
            this.$emit("input", val);
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
