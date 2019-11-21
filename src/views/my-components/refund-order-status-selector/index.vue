<template>
    <Select v-model="currentValue" clearable filterable remote :remote-method="search" :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { getStatesRefundType } from "@/actions/selector";
export default {
    name: "refund-order-status-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
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
            getStatesRefundType({ value: query || "" }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.map(item => {
                        return {
                            value: item.value,
                            label: item.desc
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
            this.currentValue = val;
        }
    }
};
</script>
