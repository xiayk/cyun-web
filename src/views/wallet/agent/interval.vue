<template>
    <div style="display:flex">
        <InputNumber
            v-model="form.min"
            :min="0"
            clearable
            class="m"
            :formatter="value=>Number(value.toString().match(/^\d+(?:\.\d{0,2})?/))"
        ></InputNumber>
        <InputNumber
            v-model="form.max"
            :min="0"
            clearable
            class="m"
            :formatter="value=>Number(value.toString().match(/^\d+(?:\.\d{0,2})?/))"
        ></InputNumber>
        <InputNumber v-model="form.fee" :placeholder="feeMethod=='1'?'元':'万分之'" class="m" :min="0"></InputNumber>
    </div>
</template>

<script>
export default {
    name: "less",
    props: {
        value: {
            type: Object,
            default: {}
        },
        feeMethod: {
            type: String,
            default: "1"
        },
        callback: Function
    },
    data() {
        return {
            form: {
                min: null,
                max: null,
                fee: null
            }
        };
    },

    methods: {
        updataValue() {
            let { min, max, fee } = this.form,
                item = {
                    value: `${min},${max}`,
                    fee: fee
                };
            // this.$emit("input", item);
            this.callback && this.callback(item);
        }
    },
    watch: {
        "form.min"(val, old) {
            let { min, max, fee } = this.form;
            this.$emit("input", {
                min: min,
                max: max,
                fee: fee
            });
        },
        "form.max"(val, old) {
            let { min, max, fee } = this.form;
            this.$emit("input", {
                min: min,
                max: max,
                fee: fee
            });
        },
        "form.fee"(val, old) {
            let { min, max, fee } = this.form;
            this.$emit("input", {
                min: min,
                max: max,
                fee: fee
            });
        },
        value(val) {
            this.form = val;
        }
    }
};
</script>

<style lang='less' >
.m {
    margin: 0 5px;
}
</style>
