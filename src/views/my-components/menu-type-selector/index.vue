<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { getSysMenuTypes } from "@/actions/selector";
export default {
    name: "menu-type-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            currentValue: this.value,
            data: []
        };
    },
    created() {
        this.getSysMenuTypes();
    },
    methods: {
        handleChange(val) {
            this.$emit("input", val);
        },
        getSysMenuTypes() {
            getSysMenuTypes().then(res => {
                this.data = res.data.map(item => {
                    return {
                        value: item.id,
                        label: item.menuName
                    };
                });
            });
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
