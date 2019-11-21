<template>
    <div>
        <Cascader v-bind="$attrs" ref="element" v-model="currentValue" :data="data" :load-data="loadData" @on-change="handleChange"></Cascader>
    </div>
</template>

<script>
import { getBusinessCategorySelectList } from "@/actions/selector";
export default {
    name: "business-category-selector",
    props: {
        value: {
            type: [Array, String],
            default: () => {
                return [0, "", ""];
            }
        },
        callback: Function
    },
    data() {
        return {
            currentValue: this.value,
            data: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            getBusinessCategorySelectList(this.currentValue[0] || 0).then(
                res => {
                    this.data = res.data.rows.map(item => {
                        return {
                            value: item.id,
                            label: item.name,
                            level: item.level,
                            children: [],
                            loading: false
                        };
                    });
                }
            );
        },
        loadData(item, callback) {
            item.loading = true;
            getBusinessCategorySelectList(item.value).then(res => {
                item.loading = false;
                item.children = res.data.rows.map(item => {
                    let child = {
                        value: item.id,
                        label: item.name,
                        level: item.level
                    };
                    if (parseInt(item.level) < 3) {
                        child.children = [];
                        child.loading = false;
                    }
                    return child;
                });
                callback();
            });
        },
        handleChange(val) {
            if (val && val.length === 3) {
                this.$emit("input", val);
                this.callback(val);
            }
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
