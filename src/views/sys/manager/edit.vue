
<template>
    <Card>
        <p slot="title">编辑用户</p>
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
                <span>{{form.account}}</span>
            </FormItem>
            <FormItem label="员工姓名" prop="userName">
                <Input v-model="form.userName" placeholder="员工姓名"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="phone">
                <Input v-model="form.phone" placeholder="手机号码"></Input>
            </FormItem>
            <!-- <FormItem label="身份证号" prop="certificateNo" >
                <Input v-model="form.certificateNo" placeholder="身份证号"></Input>
            </FormItem>-->
            <FormItem label="所属角色" prop="roleIds">
                <manager-role-selector isSingle v-model="form.roleIds"></manager-role-selector>
            </FormItem>
            <!-- <FormItem label="所属门店" v-if="storeList.length">
        <CheckboxGroup v-model="form.storeCodes" size="small">
          <Checkbox
            :label="item.code"
            v-for="item in storeList"`
            :key="item.value"
          >{{ item.storeName }}</Checkbox>
        </CheckboxGroup>
            </FormItem>-->
            <FormItem label="状态" prop="state">
                <RadioGroup v-model="form.status">
                    <Radio :label="0">启用</Radio>
                    <Radio :label="1">冻结</Radio>
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
import { addOrUpdateManager, getManagerDetail } from "@/actions/sys";
import { closeCurrentErrPage } from "@/constants/constant";
import { validateData } from "./validate";
let defaultForm = {
    userName: "",
    phone: "",
    password: "",
    _rePassword: "",
    name: "",
    certificateNo: "",
    status: 1,
    roleId: ""
};
export default {
    name: "sys-manager-edit",
    data() {
        return {
            loading: false,
            form: {
                userName: "",
                phone: "",
                password: "",
                _rePassword: "",
                name: "",
                certificateNo: "",
                status: 1,
                roleId: ""
            },
            rules: validateData,
            storeList: []
        };
    },
    methods: {
        getManagerDetail() {
            let { id } = this.$route.params;
            if (id) {
                getManagerDetail(id).then(res => {
                    this.form = res.data;
                });
            }
        },
        submit(e) {
            let { id } = this.$route.params;
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    formData.roleId = formData.roleId || formData.roleIds[0]
                    if (id) {
                        formData.id = id;
                    }
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
    activated() {
        this.getManagerDetail();
        // getNowStoreList().then(res => {
        //     this.storeList = res.data;
        // });
    },
    created() {
        // getNowStoreList().then(res => {
        //     this.storeList = res.data;
        // });
    },
    components: {
        managerRoleSelector
    }
};
</script>
