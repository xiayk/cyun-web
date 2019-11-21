<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
        <Option value="">请选择</Option>
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
import { getCertificateTypes } from "@/actions/selector";
export default {
    name: "id-types-selector",
    props: {
        value: {
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
        this.init();
    },
    methods: {
        init() {
            getCertificateTypes().then(res => {
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
        }
    }
};
</script>
