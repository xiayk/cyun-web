<template>
    <Card>
        <p slot="title">
            新建角色
        </p>
        <Form 
            style="max-width: 800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="submit" 
            :model="form" 
            :label-width="120" 
            label-position="right"
            :rules="rules">
            <FormItem label="角色名称" prop="1">
                <Input v-model="form.roleName" placeholder="请以『ROLE_』开头"></Input>
            </FormItem>
            <FormItem label="角色Code" prop="n1ame">
                <Input v-model="form.roleCode" placeholder="请以『ROLE_』开头"></Input>
            </FormItem>
            <FormItem label="角色状态" prop="na1me">
                <Input v-model="form.status" placeholder="请以『ROLE_』开头"></Input>
            </FormItem>
            <FormItem label="类型" prop="remar2k">
                <Input v-model="form.type"></Input>
            </FormItem>
            <FormItem label="权限配置" prop="me2nuIds">
                <menu-tree-selector :role-id="$route.params.id" :menu-ids.sync="form.menuIds"></menu-tree-selector>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import menuTreeSelector from "components/menu-tree-selector";
import { addOrUpdateRole, getRoleDetail } from "@/actions/sys";
import { closeCurrentErrPage } from "@/constants/constant";
let defaultForm = {
    roleName: "",
    roleCode: "",
    status: 0,
    type: 0,
    menuIds: []
};
export default {
    name: "sys-role-add",
    data() {
        return {
            loading: false,
            form: defaultForm,
            rules: {
                name: {
                    required: true,
                    message: "请输入角色名称",
                    trigger: "blur"
                },
                remark: {
                    required: true,
                    message: "请输入备注",
                    trigger: "blur"
                }
            }
        };
    },
    
    methods: {
        submit(e) {
            console.log(this.form.menuIds)
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    // addOrUpdateRole(formData).then(
                    //     res => {
                    //         this.loading = false;
                    //         this.$refs.form.resetFields();
                    //         this.$lf.message("添加成功", "success");
                    //         closeCurrentErrPage(this, "sys-role");
                    //     },
                    //     () => {
                    //         this.loading = false;
                    //     }
                    // );
                }
            });
        }
    },
    components: {
        menuTreeSelector
    }
};
</script>
