<style lang="less">
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="key"></Icon>
                修改密码
            </p>
            <Form style="max-width: 400px;" 
                ref="editPasswordForm" 
                method="post" 
                @submit.prevent.native="submit" 
                :model="editPasswordForm" 
                :label-width="100" 
                label-position="right" 
                :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPassword" :error="oldPasswordError">
                    <Input name="oldPassword" v-model="editPasswordForm.oldPassword" type="password" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPassword">
                    <Input name="newPassword" v-model="editPasswordForm.newPassword" type="password" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="reNewPassword">
                    <Input name="reNewPassword" v-model="editPasswordForm.reNewPassword" type="password" placeholder="请再次输入新密码" ></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" html-type="submit">确定</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import { changePWd } from "@/actions/sys";
export default {
    name: "account-password",
    data() {
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPassword) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            oldPasswordError: "",
            editPasswordForm: {
                oldPassword: "",
                newPassword: "",
                reNewPassword: ""
            },
            passwordValidate: {
                oldPassword: [
                    { required: true, message: "请输入原密码", trigger: "blur" }
                ],
                newPassword: [
                    { required: true, message: "请输入新密码", trigger: "blur" }
                ],
                reNewPassword: [
                    {
                        required: true,
                        message: "请再次输入新密码",
                        trigger: "blur"
                    },
                    { validator: valideRePassword, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        submit(e) {
            this.$refs.editPasswordForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    changePWd(this.editPasswordForm).then(
                        res => {
                            this.loading = false;
                            if (res.status == 200) {
                                this.$lf.alert.success(
                                    "保存成功，请重新登录",
                                    null,
                                    () => {
                                        this.$store.commit("logout", this);
                                        this.$store.commit(
                                            "clearOpenedSubmenu"
                                        );
                                        this.$router.push({
                                            name: "login"
                                        });
                                    }
                                );
                            } else {
                                this.$lf.alert.error(res.msg);
                            }
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        },
        reset() {
            this.$refs.editPasswordForm.resetFields();
        }
    }
};
</script>
