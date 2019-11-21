<template>
    <Select v-bind="$attrs" v-model="currentValue" clearable filterable  :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'salesman-two-selector',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        agentId: {
            type: [String, Number],
            default: ''
        },
    },
    data () {
        return {
            loading: false,
            currentValue: this.value,
            data: [],
        };
    },
    methods: {
        search(agentId) {
            this.loading = true;
            this.$http.post(`/agent/manager/autocomplete`, { value: "",parentAgentId: agentId, }).then(res => {
                this.loading = false;
                if (res.data.result) {
                    this.data = res.data.data.rows.map(item => {
                        return {
                            value: item.id,
                            label: item.name,
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
        agentId: {
            immediate: true,
            handler(val) {               
                if ((val==="")===false) {
                    this.search(this.agentId);
                }
            },
            
        },
        value(val) {
            this.currentValue = val;
        },
    },
};
</script>
