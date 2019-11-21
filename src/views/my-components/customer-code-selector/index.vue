<template>
    <Select v-model="currentValue" clearable filterable :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="(item,index) in data" :key="index">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { getCustomerManagerSelectList } from "@/actions/selector";
export default {
    name: "customer-code-selector",
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
            getCustomerManagerSelectList({ value: query || "" }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows.map(item => {
                        return {
                            value: item.code,
                            label: item.code
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
