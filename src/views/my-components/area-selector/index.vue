<template>
    <al-selector
        ref="alSelector"
        :disabled="currentDisable"
        searchable
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

<script>
import iviewArea from "../../../libs/iview-area";
import Vue from "vue";
Vue.use(iviewArea);
export default {
    name: "area-selector",
    props: {
        level: {
            type: [String, Number],
            default: "1"
        },
        provinceId: "",
        cityId: "",
        gutter: {
            type: [String, Number],
            default: 10
        },
        disable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentValue: [],
            currentDisable: this.disable
        };
    },
    updated() {
        this.$refs.alSelector.isInit = true;
        this.$refs.alSelector.init();
    },
    watch: {
        currentValue(val, oldVal) {
            if (val.length > 0) {
                if (val[0]) {
                    this.$emit("update:provinceId", val[0]);
                    if (val[0] !== oldVal[0]) {
                        this.$emit("update:cityId", "");
                    }
                }
                if (val[1]) {
                    this.$emit("update:cityId", val[1]);
                }
            } else {
                this.$emit("update:provinceId", "");
                this.$emit("update:cityId", "");
            }
            this.$emit("input", val);
        },
        provinceId(val) {
            if (this.currentValue.length >= 1) {
                this.currentValue.splice(0, 1, val);
            } else {
                this.currentValue.push(val);
            }
        },
        cityId(val) {
            if (this.currentValue.length >= 2) {
                this.currentValue.splice(1, 1, val);
            } else {
                this.currentValue.push(val);
            }
        },
        disable(val) {
            this.currentDisable = val;
        }
    }
};
</script>
