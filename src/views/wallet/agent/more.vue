<template>
    <div>
        <InputNumber
            v-model="form.value"
            :min="0"
            clearable
            class="m-10"
            :formatter="value=>Number(value.toString().match(/^\d+(?:\.\d{0,2})?/))"
        ></InputNumber>
        <InputNumber
            v-model="form.fee"
            :placeholder="feeMethod=='1'?'元':'万分之'"
            class="m-10"
            :min="0"
        ></InputNumber>
    </div>
</template>

<script>
export default {
    name: "more",
    props: {
        value: {
            type: Object,
            default: {}
        },
        feeMethod: {}
    },
    data() {
        return {
            form: {
                value: null,
                fee: null
            }
        };
    },

    methods: {},
    watch: {
        "form.value"(val, old) {
            this.$emit("input", { value: this.form.value, fee: this.form.fee });
        },
        "form.fee"(val, old) {
            this.$emit("input", { value: this.form.value, fee: this.form.fee });
        },
        value(val) {
            this.form = val;
        }
    }
};
</script>

<style lang='less' >
</style>
