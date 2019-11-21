<template>
    <Select v-bind="$attrs" v-model="currentValue" :name="name" clearable @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'agent-audit-type-selector',
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
                    value: '新增渠道',
                    label: '新增渠道',
                },
                {
                    value: '修改渠道',
                    label: '修改渠道',
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
