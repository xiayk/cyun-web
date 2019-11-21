<template>
    <al-cascader
        v-bind="$attrs"
        clearable
        :gutter="gutter"
        data-type="code"
        v-model="currentValue"
        :level="level"
    />
</template>
<style lang="less" scoped>
.ivu-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
}
</style>
<style>
.ivu-select-disabled .ivu-select-selection {
    background-color: #fff;
    opacity: 1;
    cursor: not-allowed;
    color: #888;
}
</style>


<script>
import iviewArea from "../../../libs/iview-area";
import Vue from "vue";
Vue.use(iviewArea);
export default {
    name: "area-cascader",
    props: {
        level: {
            type: [String, Number],
            default: "2"
        },
        provinceCode: "",
        cityCode: "",
        districtCode: "",
        gutter: {
            type: [String, Number],
            default: 0
        },
        value: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            currentValue: this.value
        };
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        currentValue(val, oldVal) {
            if (val.length > 0) {
                if (val[0]) {
                    this.$emit("update:provinceCode", val[0]);
                    if (val[0] !== oldVal[0]) {
                        this.$emit("update:cityCode", "");
                        this.$emit("update:districtCode", "");
                    }
                }
                if (val[1]) {
                    this.$emit("update:cityCode", val[1]);
                    if (val[1] !== oldVal[1]) {
                        this.$emit("update:districtCode", "");
                    }
                }
                if (val[2]) {
                    this.$emit("update:districtCode", val[2]);
                }
            } else {
                this.$emit("update:provinceCode", "");
                this.$emit("update:cityCode", "");
                this.$emit("update:districtCode", "");
            }
            this.$emit("input", val);
        }
    }
};
</script>
