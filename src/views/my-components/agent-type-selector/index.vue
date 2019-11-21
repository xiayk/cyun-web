<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange" :disabled="currentDisable">
        <Option value="">请选择</Option>
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
import { getAgentTypesList } from "@/actions/selector";
export default {
    name: "agent-type-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        disable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentValue: this.value,
            currentDisable: this.disable,
            data: [
                {
                    value: "0",
                    desc: "内部代理商"
                },
                {
                    value: "1",
                    desc: "外部代理商"
                }
            ]
        };
    },
    activated() {
        // getAgentTypesList().then(res => {
        //     this.data = res.data;
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
        },
        disable(val) {
            this.currentDisable = val;
        }
    }
};
</script>
