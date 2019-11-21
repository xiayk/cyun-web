<template>
  <Select
    ref="select"
    v-bind="$attrs"
    v-model="currentValue"
    clearable
    filterable
    :loading="loading"
    @on-change="handleChange"
  >
    <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>
<script>
import { getAgentSelectList } from "@/actions/selector";
export default {
    name: "agent-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        isNeed: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            data: []
        };
    },
    activated() {
        this.search();
    },
    methods: {
        search(query) {
            this.loading = true;
            getAgentSelectList().then(
                res => {
                    this.loading = false;
                    this.data = res.data.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        };
                    });
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleChange(val) {
            this.$emit("input", val);
        }
    },
    watch: {
        value(val) {
            this.currentValue = val + "";
        }
    }
};
</script>
