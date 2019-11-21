<template>
    <CheckboxGroup v-model="currentValue" size="small" @on-change="handleChange">
        <Checkbox :label="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Checkbox>
    </CheckboxGroup>
</template>

<script>
import { getManagerMerchantStoreList } from "@/actions/selector";
export default {
    name: "manager-store",
    props: {
        value: {
            type: Array,
            default: function() {
                return [];
            }
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
            getManagerMerchantStoreList({ value: query || "" }).then(res => {
                this.loading = false;
                this.data = res.data.rows.map(item => {
                    return {
                        value: item.id,
                        label: item.fullName
                    };
                });
            });
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
