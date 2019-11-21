<template>
  <Select
    ref="select"
    placeholder
    v-bind="$attrs"
    v-model="currentValue"
    clearable
    @on-change="handleChange"
  >
    <Option value v-if="all">全部</Option>
    <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>
<script>
import { getInstitution } from "@/actions/selector";
export default {
    name: "agent-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        all: {
            type: String,
            default: "1"
        },
        isNeed: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            data: []
        };
    },
    activated() {
        this.info();
    },
    mounted() {
        this.info();
    },
    methods: {
        info() {
            getInstitution().then(res => {
                this.data = res.data.map(item => {
                    return {
                        value: item.value,
                        label: item.desc
                    };
                });
            });
        },
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
