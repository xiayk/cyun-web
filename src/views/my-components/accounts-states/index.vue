<template>
  <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
    <Option value>请选择</Option>
    <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
  </Select>
</template>

<script>
import { getCheckingFile } from "@/actions/selector";
export default {
    name: "accounts-states",
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            currentValue: this.vlaue,
            data: []
        };
    },
    activated() {
        getCheckingFile().then(res => {
            this.data = res.data;
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
