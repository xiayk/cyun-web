<template>
    <div>
        <div class="flex_between">
            <Select v-model="form.type" clearable style="width: 35%;">
                <Option value="unlimit" v-if="gradientType == '1'">不限</Option>
                <template v-else>
                    <Option value="less" :disabled="type.less">小于</Option>
                    <Option value="more" :disabled="type.more">大于</Option>
                    <Option value="interval">区间</Option>
                </template>
            </Select>
            <template v-if="form.type !== 'interval'">
                <InputNumber
                    :disabled="gradientType == '1'"
                    v-model="form.value"
                    :min="0"
                    clearable
                    class="m-10"
                    :formatter="value=>Number(value.toString().match(/^\d+(?:\.\d{0,2})?/))"
                ></InputNumber>
            </template>
            <template v-if="form.type == 'interval'">
                <InputNumber
                    v-model="form.intervalValue[0]"
                    :min="0"
                    clearable
                    class="m"
                    :formatter="value=>Number(value.toString().match(/^\d+(?:\.\d{0,2})?/))"
                ></InputNumber>
                <InputNumber
                    v-model="form.intervalValue[1]"
                    :min="0"
                    clearable
                    class="m"
                    :formatter="value=>Number(value.toString().match(/^\d+(?:\.\d{0,2})?/))"
                ></InputNumber>
            </template>
            <InputNumber
                v-model="form.fee"
                :placeholder="feeMethod=='1'?'元':'万分之'"
                class="m"
                :min="0"
            ></InputNumber>
            <div class="ivu-row-icon">
                <Icon
                    type="ios-close-outline"
                    @click="deleteItem"
                    size="25"
                    style="cursor: pointer;"
                    v-if="itemIndex!==0"
                ></Icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "less",
    props: {
        value: {
            type: Object,
            default: function() {
                return {
                    type: "",
                    value: null,
                    intervalValue: [null, null],
                    fee: null
                };
            }
        },
        gradientType: {
            type: String,
            default: "1"
        },
        itemIndex: 0,
        callback: Function,
        type: {
            type: Object,
            default: function() {
                return {};
            }
        },
        feeMethod: {
            type: String,
            default: "1"
        }
    },
    data() {
        return {
            form: this.value
        };
    },
    created() {},
    methods: {
        deleteItem() {
            this.$emit("on-click", this.itemIndex);
        }
    },
    watch: {
        value(val) {
            this.form = val;
        },
        itemIndex(val) {},
        form(val) {
            this.callback && this.callback(val);
            this.$emit("input", val);
        }
    }
};
</script>

<style lang='less' >
.m {
    margin: 0 5px;
}
.flex_between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.m-10 {
    margin: 0 10px;
}
</style>
