<template>
    <CheckboxGroup v-model="currentValue" size="small" @on-change="handleChange">
        <Checkbox :disabled="item.disabled" :label="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Checkbox>
    </CheckboxGroup>
</template>

<script>
import { getSysRoles } from "@/actions/selector";
export default {
    name: "manager-role-selector",
    props: {
        value: {
            type: Array,
            default: function() {
                return [];
            }
        },
        isSingle: {
            type: Boolean,
            default: false
        },
        name: "",
        disabled: {
            type: Boolean,
            default: false
        }
    },
    inheritAttrs: false,
    data() {
        return {
            currentValue: this.value,
            data: []
        };
    },
    created() {
        this.getSysRoles();
    },
    methods: {
        getSysRoles() {
            getSysRoles().then(res => {
                this.data = res.data.map(item => {
                    return {
                        value: item.id,
                        label: item.roleName,
                        disabled: item.status === 1
                    };
                });
            });
        },
        handleChange(val) {
            if (this.isSingle && val.length) {
                val = [val[val.length - 1]];
            }
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
