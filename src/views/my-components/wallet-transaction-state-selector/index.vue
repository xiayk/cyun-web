<template>
    <Select transfer clearable v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
        <Option value v-if="all">全部</Option>
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
export default {
    // 转账状态（init("0", "待处理", "init"), success("1", "成功", "success"), processing("2", "处理中", "processing"), failure("3", "失败", "failure")）
    name: "wallet-transaction-state-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        filter: {
            type: Array,
            default() {
                return [];
            }
        },
        all: {
            type: String,
            default: "1"
        }
    },
    data() {
        return {
            currentValue: this.value,
            data: [
                {
                    value: "0",
                    desc: "待处理"
                },
                {
                    value: "1",
                    desc: "成功"
                },
                {
                    value: "2",
                    desc: "处理中"
                },
                {
                    value: "3",
                    desc: "失败"
                }
            ]
        };
    },
    activated() {
        this.data = this.data.filter(item => {
            return this.filter.length > 0
                ? this.filter.includes(item.value)
                : true;
        });
    },
    methods: {
        handleChange(val) {
            this.$emit("input", val);
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
