<template>
    <Card>
        <p slot="title">Cyun - 客户自助注册</p>
        <Form
            style="max-width: 800px;"
            ref="form"
            method="post"
            @submit.prevent.native="submit"
            :model="form"
            :label-width="120"
            label-position="right"
        >
            <FormItem label="负责人ID" prop="account">
                <span>{{form.createUserId}}</span>
            </FormItem>
            <FormItem label="姓名" prop="userName">
                <Input v-model="form.cusName" placeholder="姓名"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="phone">
                <Input v-model="form.phoneNumber" placeholder="手机号码"></Input>
            </FormItem>
            <FormItem prop="province" label="省份">
                <Select
                    v-model="formValidate.province"
                    placeholder="请选择省份"
                    @on-change="changeProvince"
                >
                    <Option
                        v-for="(item,index) in provinceArr"
                        :key="item.value"
                        :value="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem prop="city" label="城市">
                <Select v-model="formValidate.city" placeholder="请选择城市" @on-change="changeCity">
                    <Option
                        v-for="(item,index) in citiesArr"
                        :key="item.value"
                        :value="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem prop="county" label="区县">
                <Select v-model="formValidate.county" placeholder="请选择区县">
                    <Option
                        v-for="(item,index) in countyArr"
                        :key="item.value"
                        :value="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="详细地址" prop="desc">
                <Input
                    v-model="formValidate.desc"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    placeholder="请输入详细地址信息，如街道，小区，门牌号，楼栋号，单元等信息"
                ></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import provinces from "./provinces.json";

export default {
    name: "addCus",
    data() {
        return {
            loading: false,
            isMultiple: false,
            provinceArr: [],
            citiesArr: [],
            countyArr: [],
            form: {
                createUserId: "",
                cusName: "",
                phoneNumber: ""
            },
            formValidate: {
                province: "",
                city: "",
                county: "",
                // 地址是否为默认地址
                interest: false,
                mobile: "",
                // 地址详情
                desc: ""
            }
        };
    },
    methods: {
        init() {
            let { id } = this.$route.params;
            this.form.createUserId = id;
            this.provinceArr = provinces.data;
            console.log(this.provinceArr);
        },
        changeProvince(val) {
            for (var i = 0; i < this.provinceArr.length; i++) {
                if (val == this.provinceArr[i].value) {
                    this.citiesArr = this.provinceArr[i].children;
                    this.formValidate.county = "";
                    this.formValidate.city = "";
                    this.countyArr = [];
                }
            }
        },
        changeCity(val) {
            for (var i = 0; i < this.citiesArr.length; i++) {
                if (val == this.citiesArr[i].value) {
                    this.countyArr = this.citiesArr[i].children;
                    this.formValidate.county = "";
                }
            }
        }
    },
    created() {
        this.init();
    }
};
</script>

<style>
</style>