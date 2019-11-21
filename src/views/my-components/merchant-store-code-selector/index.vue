<template>
    <Select ref="select" v-bind="$attrs" v-model="currentValue" :name="name" clearable filterable  :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { getMerchantStoreSelectList } from "@/actions/selector";
export default {
    name: "merchant-store-code-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        filterable: false,
        name: ""
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
            getMerchantStoreSelectList({ value: query || "" }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows.map(item => {
                        return {
                            value: item.id,
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
