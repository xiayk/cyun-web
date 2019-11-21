<template>
    <div>
        <Form
            ref="feeData"
            method="post"
            @submit.prevent.native="handleFee"
            :model="feeData"
            :label-width="120"
            label-position="right"
            :rules="feeRules"
        >
            <FormItem label="费用类型" prop="feeType">
                <Select v-model="feeData.feeType" clearable>
                    <Option
                        :value="item.value"
                        v-for="item in feeType"
                        :key="item.value"
                    >{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="费用扣除方式" prop="deductType" v-if="feeData.feeType">
                <Select v-model="feeData.deductType" clearable>
                    <Option v-if="openShow" value="1">实时扣除</Option>
                    <Option value="2">记账后收</Option>
                </Select>
            </FormItem>
            <FormItem label="收费方式" prop="feeMethod" v-if="feeData.feeType">
                <Select v-model="feeData.feeMethod" clearable>
                    <Option value="1">按笔</Option>
                    <Option value="2" v-if="openShow">按比例</Option>
                </Select>
            </FormItem>

            <FormItem label="结算周期" prop="cycle">
                <Select v-model="feeData.cycle" clearable>
                    <Option
                        :value="item.value"
                        v-for="item in cycle"
                        :key="item.value"
                    >{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="收费策略" prop="gradientType" v-if="feeData.feeType">
                <Select v-model="feeData.gradientType" clearable @on-change="handleChange">
                    <Option value="1">固定收费</Option>
                    <Option value="2" v-if="openShow">按阶梯收费</Option>
                </Select>
            </FormItem>
            <FormItem label="封顶金额" v-if="feeData.feeMethod && feeData.feeMethod !== '1'">
                <InputNumber v-model="feeData.maxAmount" clearable style="width:100%;"></InputNumber>
            </FormItem>
            <FormItem label="收费金额" required v-show="feeData.gradientType">
                <template v-for="(item,index) in gradient" class="flex_between">
                    <less
                        ref="feeItem"
                        :key="index"
                        v-model="gradient[index]"
                        :feeMethod.sync="feeData.feeMethod"
                        :itemIndex.sync="index"
                        :callback="deleteItem"
                    ></less>
                </template>
            </FormItem>
            <Row type="flex" justify="end" class="code-row-bg" v-if="feeData.gradientType == '2'">
                <Button type="dashed" @click="addItem">添加阶梯收费规则</Button>
            </Row>

            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
                <Button @click="handleSettleState(false)">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { validateFee } from "./validate";
import less from "./less";
import interval from "./interval";
export default {
    name: "",
    components: {
        less,
        interval
    },
    computed: {
        feeType() {
            return [
                {
                    label: "企业开户",
                    value: "1"
                },
                {
                    label: "个人开户",
                    value: "2"
                },
                {
                    label: "企业入金",
                    value: "3"
                },
                {
                    label: "个人入金",
                    value: "4"
                },
                {
                    label: "企业提现",
                    value: "5"
                },
                {
                    label: "个人提现",
                    value: "6"
                }
            ];
        },
        feeMethod() {
            return [
                {
                    label: "按笔",
                    value: "1"
                },
                {
                    label: "按比例",
                    value: "2"
                }
            ];
        },
        cycle() {
            return [
                {
                    label: "按月",
                    value: "1"
                },
                {
                    label: "按季度",
                    value: "2"
                },
                {
                    label: "按年",
                    value: "3"
                }
            ];
        }
    },
    props: {
        form: {
            type: Object,
            default: {}
        },
        callback: Function,
        state: {
            type: String,
            default: "add"
        }
    },
    data() {
        return {
            feeRules: {
                ...validateFee
            },
            gradient: [
                {
                    type: "",
                    value: null,
                    _value: [null, null],
                    fee: null
                }
            ],
            openShow: false,
            feeData: this.form,
            loading: false
        };
    },
    watch: {
        "feeData.feeType"(val) {
            let value = this.feeData;
            if (val == "1" || val == "2") {
                value.deductType =
                    value.deductType == "2" ? value.deductType : "";
                value.feeMethod =
                    value.feeMethod == "2" ? value.deductType : "";
                value.gradientType =
                    value.gradientType == "2" ? value.deductType : "";
                this.openShow = false;
            } else {
                this.openShow = true;
            }
        },
        form(val, old) {
            this.feeData = val;
            this.gradient = val.gradient;
        }
    },
    mounted() {},
    methods: {
        deleteItem(index) {
            this.gradient.splice(index, 1);
        },
        handleCheck() {
            let flag = true,
                { type, _value, value, fee } = this.gradient[
                    this.gradient.length - 1
                ];
            if (!type) {
                this.$Notice.error({
                    title: "错误信息",
                    desc: "收费金额不能为空"
                });
                return (flag = false);
            }
            if (!value) {
                this.$Notice.error({
                    title: "错误信息",
                    desc: "收费金额不能为空"
                });
                return (flag = false);
            }
            if (!_value[0] && !_value[1]) {
                this.$Notice.error({
                    title: "错误信息",
                    desc: "收费金额不能为空"
                });
                return (flag = false);
            }
            return (flag = true);
        },
        addItem() {
            let flag = this.handleCheck();
            // if (flag) {
            this.gradient.push({
                type: "",
                value: null,
                _value: [null, null],
                fee: null
            });
            // }
        },
        handleFeeType(value) {},
        resetFields() {
            this.feeData = {
                cycle: "",
                deductType: "",
                gradient: {},
                feeMethod: "",
                feeType: "",
                maxAmount: 0.01,
                fee: null
            };
            this.gradient = [
                {
                    type: "",
                    value: null,
                    _value: [null, null],
                    fee: null
                }
            ];
        },

        // 改变时收费策略  收费金额清空;
        handleChange(value) {
            // this.gradient = [
            //     {
            //         type: "",
            //         less: { value: null, fee: null },
            //         more: { value: null, fee: null },
            //         interval: { min: null, fee: null, max: null }
            //     }
            // ];
        },
        feeReset(state) {
            let flag = false;
            this.gradient.map(v => {
                if (!state) {
                    v.type == "less"
                        ? (this.lessShow = true)
                        : v.type == "more"
                        ? (this.moreShow = true)
                        : "";
                } else {
                    v.type == "less"
                        ? (this.lessShow = false)
                        : v.type == "more"
                        ? (this.moreShow = false)
                        : "";
                }
            });
        },
        // 添加阶梯 or 删除
        handleGradient(type, index) {
            if (type == "1") {
                if (true) {
                    this.getGradient();
                    // this.feeReset(false);
                }
            } else {
                this.gradient.splice(index, 1);
                // this.feeReset(true);
            }
        },
        handleData() {
            let arr = Object.assign([], this.gradient),
                interval = [];

            let newObj = {};
            arr.filter(v => {
                if (v.type == "less") {
                    newObj.less = v.less;
                }
                if (v.type == "more") {
                    newObj.more = v.more;
                }
                if (v.type == "interval") {
                    interval.push({
                        value: `${v.interval.min},${v.interval.max}`,
                        fee: v.interval.fee
                    });
                    newObj.interval = interval;
                }
            });
            return newObj;
        },
        // 提交费率信息
        handleFee() {
            this.$refs.feeData.validate(valid => {
                if (valid) {
                    let formData = Object.assign({}, this.feeData);
                    formData.gradient = this.gradient;
                    formData.obj = this.handleData();
                    this.$emit("on-submit", formData);
                    this.callback && this.callback(this.handleData());
                }
            });
        }
    }
};
</script>

<style lang='less' >
</style>
