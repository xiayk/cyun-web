<template>
    <!-- <CheckboxGroup v-model="currentValue" size="small" @on-change="handleChange">
        <Checkbox :disabled="item.disabled" :label="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Checkbox>
    </CheckboxGroup> -->
    <RadioGroup v-model="currentValue" size="small" @on-change="handleChange">
        <Radio :disabled="item.disabled" :label="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Radio>
    </RadioGroup>
</template>

<script>
import { getSysRoles } from "@/actions/selector";
export default {
    name: "manager-role-selector",
    props: {
        value: {
            type: String,
            default: function() {
                return "";
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
            console.log(val)
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
