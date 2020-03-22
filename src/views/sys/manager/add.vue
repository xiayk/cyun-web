
<template>
  <Card>
    <p slot="title">新增用户</p>
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
      <FormItem label="登录账号" prop="account">
        <Input v-model="form.account" placeholder="登录账号"/>
      </FormItem>
      <FormItem label="登录密码" prop="password">
        <Input type="password" v-model="form.password" placeholder="请输入6-18位字符和字母组合的密码"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="repeatPassword">
        <Input type="password" v-model="form.repeatPassword" placeholder="请再次输入密码"></Input>
      </FormItem>
      <FormItem label="姓名" prop="userName">
        <Input v-model="form.userName" placeholder="姓名"></Input>
      </FormItem>
      <FormItem label="手机号码" prop="phone">
        <Input v-model="form.phone" placeholder="手机号码"></Input>
      </FormItem>
      <FormItem label="角色配置" prop="roleIds">
        <manager-role-selector v-model="form.roleId"></manager-role-selector>
      </FormItem>
      <FormItem label="状态" prop="status">
        <RadioGroup v-model="form.status">
          <Radio label="1">禁用</Radio>
          <Radio label="0">启用</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading" html-type="submit">提交</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import managerRoleSelector from "components/manager-role-selector";
import {
    addOrUpdateManager,
    getManagerDetail
} from "@/actions/sys";
import { closeCurrentErrPage } from "@/constants/constant";
import { validateData } from "./validate";
let defaultForm = {
    userName: "",
    phone: "",
    account: "",
    password: "",
    repeatPassword: "",
    roleId: ""
};
export default {
    name: "sys-manager-add",
    data() {
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            form: {
                userName: "",
                account: "",
                password: "",
                repeatPassword: "",
                status: 0,
                roleId: "",
                storeCodes: []
            },
            storeList: [],
            rules: {
                ...validateData,
                repeatPassword: [
                    {
                        required: true,
                        message: "请填写确认密码",
                        trigger: "blur"
                    },
                    { validator: valideRePassword, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    formData.roleId = formData.roleId || formData.roleIds[0]
                    addOrUpdateManager(formData).then(
                        res => {
                            this.loading = false;
                            this.$refs.form.resetFields();
                            this.$lf.message("保存成功", "success");
                            closeCurrentErrPage(this, "sys-user");
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    },
    // created() {
    //     getNowStoreList().then(res => {
    //         this.storeList = res.data;
    //     });
    // },
    // activated() {
    //     getNowStoreList().then(res => {
    //         this.storeList = res.data;
    //     });
    // },
    components: {
        managerRoleSelector
    }
};
</script>
