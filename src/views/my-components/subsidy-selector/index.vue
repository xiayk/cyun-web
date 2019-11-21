<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
        <Option value="">请选择</Option>
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'subsidy-selector',
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
                "value": "1",
                "desc": "是"
            },
            {
                "value": "2",
                "desc": "否"
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
