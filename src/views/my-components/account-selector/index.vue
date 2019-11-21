<template>
  <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange" placeholder>
    <Option value>全部</Option>
    <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
  </Select>
</template>

<script>
import { getWalletAccountType } from "@/actions/selector";
export default {
    name: "account-selector",
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
            data: []
        };
    },
    activated() {
        getWalletAccountType().then(res => {
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
