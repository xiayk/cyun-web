<template>
    <Select ref="select" v-model="currentValue" :name="name" clearable filterable remote :remote-method="search" :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'bank-search-selector',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        filterable: false,
        name: '',
    },
    data () {
        return {
            loading: false,
            currentValue: this.value,
            data: [],
        };
    },
    activated() {
        this.search()
    },
    methods: {
        search(query) {
            this.loading = true;
            return this.$http.post(`/meta/bankClass/list`, { bankName: query || '' }).then(res => {
                this.loading = false;
                if (res.data.result) {
                    this.data = res.data.data.rows.map(item => {
                        return {
                            value: item.bankCode,
                            label: item.bankName,
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
