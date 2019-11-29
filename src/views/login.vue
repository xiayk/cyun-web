<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="remember">
                            <Checkbox v-model="form.remember">记住密码</Checkbox>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" :loading="loading" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import { login, getManagerDetail, getUserInfo } from "@/actions/sys";
import Cookies from "js-cookie";

export default {
    data() {
        return {
            form: {
                userName: "",
                password: "",
                userType: "1",
                remember: false
            },
            loading: false,
            rules: {
                userName: [
                    { required: true, message: "账号不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    let { userName, password } = this.form;
                    this.loading = true;
                    login({ account: userName, password }).then(
                        res => {
                            this.loading = false;
                            this.zbRoleDetail(res.data);
                            Cookies.set("token", res.data);
                            getUserInfo().then(res => {
                                Cookies.set("user", JSON.stringify(res.data));
                            })
                            // if (this.form.remember) {
                            //     // localStorage.setItem(
                            //     //     "lf_user",
                            //     //     JSON.stringify(res.data)
                            //     // );
                            //     // localStorage.setItem(
                            //     //     "lf_token",
                            //     //     res.data.token
                            //     // );
                            // }
                            this.$store.commit("saveUserInfo");
                            this.$store.commit("clearAllTags");
                            this.$router.push({
                                name: "home_index"
                            });
                        },
                        err => {
                            this.loading = false;
                        }
                    );
                }
            });
        },
        // 账户获取角色
        zbRoleDetail(data) {
            if (data.userType !== "1") return;
            getManagerDetail(data.id).then(res => {
                Cookies.set("roleId", JSON.stringify(res.data.roleIds));
            });
        }
    }
};
</script>

<style>
</style>
