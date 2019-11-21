<template>
    <Select v-model="currentValue" @on-change="handleChange">
        <Option value="">请选择</Option>
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
import { getCheckingBatchTypes } from "@/actions/selector";
export default {
    name: "batch-result-selector",
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
            currentValue: this.value,
            data: []
        };
    },
    activated() {
        getCheckingBatchTypes().then(res => {
            this.data = res.data.filter(item => {
                return this.filter.length > 0
                    ? this.filter.includes(parseInt(item.value))
                    : true;
            });
        });
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
