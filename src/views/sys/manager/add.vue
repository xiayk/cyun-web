
<template>
  <Card>
    <p slot="title">新增操作员</p>
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
      <FormItem label="登录账号" prop="userName">
        <Input v-model="form.userName" placeholder="登录账号"/>
      </FormItem>
      <FormItem label="登录密码" prop="password">
        <Input type="password" v-model="form.password" placeholder="请输入6-18位字符和字母组合的密码"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="repeatPassword">
        <Input type="password" v-model="form.repeatPassword" placeholder="请再次输入密码"></Input>
      </FormItem>
      <FormItem label="员工姓名" prop="nickName">
        <Input v-model="form.nickName" placeholder="员工姓名"></Input>
      </FormItem>
      <FormItem label="手机号码" prop="mobile">
        <Input v-model="form.mobile" placeholder="手机号码"></Input>
      </FormItem>
      <!-- <FormItem label="身份证号" prop="certificateNo" >
                <Input v-model="form.certificateNo" placeholder="身份证号"></Input>
      </FormItem>-->
      <FormItem label="所属角色" prop="roleIds">
        <manager-role-selector isSingle v-model="form.roleIds"></manager-role-selector>
      </FormItem>
      <FormItem label="所属门店" v-if="storeList.length">
        <CheckboxGroup v-model="form.storeCodes" size="small">
          <Checkbox
            :label="item.code"
            v-for="item in storeList"
            :key="item.value"
          >{{ item.storeName }}</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="状态" prop="state">
        <RadioGroup v-model="form.state">
          <Radio label="-1">冻结</Radio>
          <Radio label="1">启用</Radio>
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
    getManagerDetail,
    getNowStoreList
} from "@/actions/sys";
import { closeCurrentErrPage } from "@/constants/constant";
import { validateData } from "./validate";
let defaultForm = {
    userName: "",
    phone: "",
    password: "",
    repeatPassword: "",
    nickName: "",
    state: "1",
    roleIds: [],
    storeCodes: []
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
                mobile: "",
                password: "",
                repeatPassword: "",
                nickName: "",
                state: "1",
                roleIds: [],
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
                    addOrUpdateManager(formData).then(
                        res => {
                            this.loading = false;
                            this.$refs.form.resetFields();
                            this.$lf.message("保存成功", "success");
                            closeCurrentErrPage(this, "sys-manager");
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    },
    created() {
        getNowStoreList().then(res => {
            this.storeList = res.data;
        });
    },
    activated() {
        getNowStoreList().then(res => {
            this.storeList = res.data;
        });
    },
    components: {
        managerRoleSelector
    }
};
</script>
