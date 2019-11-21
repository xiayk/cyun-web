<template>
    <Select v-bind="$attrs" v-model="currentValue" :name="name" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'settle-model-selector',
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
                    value: 'J',
                    label: '差额结算',
                },
                {
                    value: 'Q',
                    label: '全额结算',
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
