<template>
    <Page 
        :total="total" 
        :page-size="currentLimit" 
        class-name="pager" 
        size="small" 
        :current.sync="current"
        @on-page-size-change="handlePageSizeChange" 
        @on-change="handleChange" 
        show-total 
        show-elevator 
        show-sizer
        >
    </Page>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        offset: {
            type: [String, Number],
            default: 1,
        },
        limit: {
            type: [String, Number],
            default: 10,
        },
        total: {
            type: [String, Number],
            default: 0,
        },
    },
    data () {
        return {
            current: 1,
            data: [],
            currentOffset: 0,
            currentLimit: 0,
        };
    },
    activated() {
        this.$emit('on-load');
    },
    watch: {
        offset: {
            immediate: true,
            handler(val) {
                this.currentOffset = val;
            },
        },
        limit: {
            immediate: true,
            handler(val) {
                this.currentLimit = parseInt(val);
            },
        },
        currentOffset(val, oldVal) {
            if (val !== oldVal) {
                this.current = val / this.limit + 1;
                this.$emit('update:offset', val);
                this.$emit('on-load');
            }
        },
        currentLimit(val, oldVal) {
            if (val !== oldVal) {
                this.$emit('update:limit', val);
                this.$emit('on-load');
            }
        },
    },
    methods: {
        handlePageSizeChange(pageSize) {
            this.currentLimit = pageSize;
        },
        handleChange(page) {
            this.currentOffset = (page - 1) * this.currentLimit;
        },
    },
};
</script>
