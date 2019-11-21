<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
        <Option value="">请选择</Option>
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'cashier-selector',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
    },
    data () {
        return {
            currentValue: this.value,
            data: [
                {
                    value: '5',
                    desc: '店长',
                }, {
                    value: '4',
                    desc: '收银员',
                },
            ],
        };
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
