
<template>
    <Card>
        <p slot="title">创建商户</p>
        <Form
            style="max-width: 800px;"
            ref="form"
            method="post"
            @submit.prevent.native="submit"
            :model="form"
            :label-width="120"
            label-position="right"
            :rules="rules"
        >
            <FormItem label="商户名称" prop="storeName">
                <Input v-model="form.storeName" placeholder="商户账号" />
            </FormItem>
            <FormItem label="商户昵称" prop="storeNick">
                <Input v-model="form.storeNick" placeholder="姓名"></Input>
            </FormItem>
            <FormItem label="电话号码" prop="phone">
                <Input v-model="form.phone" placeholder="手机号码"></Input>
            </FormItem>
            <FormItem label="登录账号" prop="account">
                <Input v-model="form.account" placeholder="登录账号"></Input>
            </FormItem>
            <FormItem label="登录密码" prop="password">
                <Input v-model="form.password" type="password" placeholder="登录密码"></Input>
            </FormItem>
            <FormItem label="状态" prop="status">
                <RadioGroup v-model="form.storeStatus">
                    <Radio label="0">启用</Radio>
                    <Radio label="1">禁用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import { addStore } from "@/actions/profit";
import { closeCurrentErrPage } from "@/constants/constant";
let defaultForm = {
    storeName: "",
    phone: "",
    storeNick: "",
    storeStatus: 0,
    account: "",
    password: ""
};
export default {
    name: "group-store-add",
    data() {
        return {
            loading: false,
            form: {
                storeName: "",
                phone: "",
                storeNick: "",
                storeStatus: 0,
                account: "",
                password: ""
            },
            storeList: [],
            rules: {
                storeName: [
                    {
                        required: true,
                        message: "请输入商户账号",
                        trigger: "blur"
                    }
                ],
                storeNick: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submit(e) {
            this.loading = true;
            let formData = this.form;
            addStore(formData).then(
                res => {
                    this.loading = false;
                    this.$refs.form.resetFields();
                    this.$lf.message("保存成功", "success");
                    closeCurrentErrPage(this, "group-store");
                },
                () => {
                    this.loading = false;
                }
            );
        }
    },
    components: {}
};
</script>
