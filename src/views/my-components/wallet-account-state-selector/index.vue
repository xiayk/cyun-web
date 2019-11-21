<template>
  <Select transfer clearable v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
    <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
  </Select>
</template>

<script>
export default {
    name: "wallet-account-state-selector",
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
        }
    },
    data() {
        return {
            currentValue: this.value,
            data: [
                {
                    value: "1",
                    desc: "启用"
                },
                {
                    value: "-1",
                    desc: "冻结"
                },
                {
                    value: "2",
                    desc: "已删除"
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
