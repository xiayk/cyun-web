<template>
    <Select v-model="currentValue" clearable filterable :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { getPayChannels } from "@/actions/selector";
export default {
    name: "payment-channels-selector",
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
            getPayChannels({ value: query || "" }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.map(item => {
                        return {
                            value: item.code,
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
            this.currentValue = val;
        }
    }
};
</script>
