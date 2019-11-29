<template>
    <Select v-bind="$attrs" v-model="currentValue" placeholder="无父级菜单" clearable filterable @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.id">{{ item.menuName }}</Option>
    </Select>
</template>

<script>
import { getSysMenuSelect } from "@/actions/selector";
export default {
    name: "salesman-selector",
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
        this.getSysMenuSelect();
    },
    methods: {
        handleChange(val) {
            this.$emit("input", val);
        },
        getSysMenuSelect() {
            getSysMenuSelect().then(res => {
                this.data = res.data
                console.log(this.data)
                // let arr = res.data
                // arr.forEach(item => {
                    
                // });
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
