<template>
    <Select v-model="currentValue" clearable filterable remote :remote-method="search" :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    name: 'paytype-selector',
    props: {
        value: {
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
    activated() {
        this.search();
    },
    methods: {
        search(query) {
            this.loading = true;
            this.$http.post(`/meta/institution/list`, { value: query || '' }).then(res => {
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
        value(val) {
            this.currentValue = val;
        },
    },
};
</script>
