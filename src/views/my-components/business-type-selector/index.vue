<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
        <Option value="">请选择</Option>
        <Option v-for="item in data" :value="item.value" :key="item.value">{{ item.desc }}({{item.rateDesc}})</Option>
    </Select>
</template>

<script>
import { getBusinessTypesSelectList } from "@/actions/selector";
export default {
    name: "business-type-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        agentId: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            currentValue: this.value,
            data: []
        };
    },
    created() {
        this.getTypes();
    },
    methods: {
        getTypes() {
            getBusinessTypesSelectList({
                agentId: this.agentId || ""
            }).then(res => {
                this.data = res.data;
            });
        },
        handleChange(val) {
            this.$emit("input", val);
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        agentId(val) {
            this.getTypes();
        }
    }
};
</script>
