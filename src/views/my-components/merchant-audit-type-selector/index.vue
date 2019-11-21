<template>
    <Select v-bind="$attrs" v-model="currentValue" :name="name" clearable @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'merchant-audit-type-selector',
    props: {
        value: {
            type: String,
            default: ''
        },
        name: '',
    },
    data () {
        return {
            currentValue: this.value,
            data: [
                {
                    value: '新增商户',
                    label: '新增商户',
                },
                {
                    value: '修改商户',
                    label: '修改商户',
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
