<template>
    <Select v-bind="$attrs" v-model="currentValue" :name="name" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'settle-account-type-selector',
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
                    label: '对公账户',
                },
                {
                    value: '1',
                    label: '借记卡',
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
