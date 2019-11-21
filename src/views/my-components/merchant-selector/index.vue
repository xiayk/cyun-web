<template>
    <Select
        transfer
        v-bind="$attrs"
        v-model="currentValue"
        clearable
        filterable
        :label="currentLabel"
        :loading="loading"
        remote
        :remote-method="search"
        @on-change="handleChange"
    >
        <Option :value="item.id" v-for="item in data" :key="item.id">{{ item.fullName }}</Option>
    </Select>
</template>

<script>
import { getMechantSelectList } from "@/actions/selector";
export default {
    name: "merchant-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        state: {
            type: [String, Number],
            default: "1"
        },
        label: {
            type: [String, Number],
            default: ""
        },
        processState: {
            type: [String, Number],
            default: "2"
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            currentLabel: this.label,
            data: []
        };
    },
    methods: {
        search(query) {
            this.loading = true;
            getMechantSelectList({
                value: query || "",
                state: this.state,
                processState: this.processState
            }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
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
        },
        label(val) {
            this.currentLabel = val;
            this.search(val);
        }
    }
};
</script>
