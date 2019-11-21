<template>
    <Select v-bind="$attrs" v-model="currentValue" :name="name" clearable @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'store-audit-type-selector',
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
                    value: '新增门店',
                    label: '新增门店',
                },
                {
                    value: '修改门店',
                    label: '修改门店',
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
