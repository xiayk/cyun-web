<template>
    <Select v-bind="$attrs" v-model="currentValue" clearable filterable  :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'merchant-selector',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        auditState:{
            type: [String, Number],
            default: ''
        }
    },
    data () {
        return {
            loading: false,
            currentValue: this.value,
            data: [],
        };
    },
    activated() {
        this.search();
    },
    methods: {
        search(query) {
            this.loading = true;
            this.$http.post(`/merchant/autocomplete`, { value: query || '',auditState:"2" }).then(res => {
                this.loading = false;
                if (res.data.result) {
                    this.data = res.data.data.rows.map(item => {
                        return {
                            value: item.id,
                            label: item.fullName,
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
    },
};
</script>
