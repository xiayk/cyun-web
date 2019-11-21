<template>
    <Select v-bind="$attrs" v-model="currentValue" :name="name" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'settle-cycle-selector',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        name: '',
    },
    data () {
        return {
            currentValue: this.value,
            data: [
                {
                    value: '0',
                    label: '秒到',
                },
                {
                    value: '1',
                    label: '天',
                },
                {
                    value: '2',
                    label: '星期',
                },
                {
                    value: '3',
                    label: '半月',
                },
                {
                    value: '4',
                    label: '月',
                },
                {
                    value: '5',
                    label: '季度',
                },
                {
                    value: '6',
                    label: '半年',
                },
                {
                    value: '7',
                    label: '年',
                },
            ],
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
