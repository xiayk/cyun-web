<template>
  <Select transfer clearable v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
    <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.desc }}</Option>
  </Select>
</template>

<script>
export default {
    name: "xlink-interface-state-selector",
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
                    value: "0",
                    desc: "成功"
                },
                {
                    value: "1",
                    desc: "失败"
                },
                {
                    value: "2",
                    desc: "进件审核中"
                },
                {
                    value: "3",
                    desc: "进件已驳回"
                },
                {
                    value: "4",
                    desc: "进件已冻结"
                },
                {
                    value: "5",
                    desc: "进件待签约"
                },
                {
                    value: "6",
                    desc: "进件已完成"
                },
                {
                    value: "7",
                    desc: "升级资料校验中"
                },
                {
                    value: "8",
                    desc: "升级待账户验证"
                },
                {
                    value: "9",
                    desc: "升级审核中"
                },
                {
                    value: "10",
                    desc: "升级已驳回"
                },
                {
                    value: "11",
                    desc: "升级待签约"
                },
                {
                    value: "12",
                    desc: "升级已完成"
                },
                {
                    value: "13",
                    desc: "升级冻结"
                },
                {
                    value: "14",
                    desc: "进件中"
                },
                {
                    value: "15",
                    desc: "未激活"
                },
                {
                    value: "16",
                    desc: "需要再次审核"
                },
                {
                    value: "17",
                    desc: "需要再次激活"
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
