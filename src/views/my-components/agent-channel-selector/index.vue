<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange" :name="name" clearable :loading="loading">
        <Option value="">请选择</Option>
        <Option :value="item.value" v-for="(item, index) in data" :key="index">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'agent-channel-selector',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        agentId: {
            type: [String, Number],
            default: ''
        },
        businessId: {
            type: [String, Number],
            default: ''
        },
        name: '',
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            data: [],
        };
    },
    methods: {
        search(agentId,businessId) {
            // this.loading = true;            
            return this.$http.post(`/merchant/channel/number/select/${agentId}/${businessId}`).then(res => {
                if (res.data.result) {
                    this.data = res.data.data.map(item => {
                        return {
                            value: item.channelNumber,
                            label: item.agentName,
                        };
                    });
                }
            });
        },
        handleChange(val) {
            this.$emit('input', val);
        },
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        businessId: {
            // immediate: true,
            handler(val) {
                this.search(this.agentId,this.businessId);
            },
        },
    },
};
</script>
