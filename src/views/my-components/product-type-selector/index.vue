<template>
  <Select
    transfer
    :clearable="clearable"
    v-bind="$attrs"
    v-model="currentValue"
    @on-change="handleChange"
  >
    <Option :value="item.id" v-for="item in data" :key="item.id">{{ item.name }}</Option>
  </Select>
</template>

<script>
export default {
    name: "product-type-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        clearable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            currentValue: this.value,
            data: [
                {
                    id: "1",
                    name: "线下"
                },
                {
                    id: "2",
                    name: "线上"
                },
                {
                    id: "3",
                    name: "公益"
                },
                {
                    id: "4",
                    name: "民生"
                },
                {
                    id: "5",
                    name: "其他"
                }
            ]
        };
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
