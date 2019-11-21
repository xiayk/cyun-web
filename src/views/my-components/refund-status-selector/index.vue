<template>
    <Select v-model="currentValue" @on-change="handleChange">
        <Option value="">请选择</Option>
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'refund-status-selector',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
    },
    data () {
        return {
            currentValue: this.value,
            data: [{
                "value": "00",
                "desc": "成功"
            },
            {
                "value": "09",
                "desc": "初始"
            }],
        };
    },
    activated() {
    },
    methods: {
        handleChange(val) {
            this.$emit('input', val);
        },
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
    },
};
</script>
