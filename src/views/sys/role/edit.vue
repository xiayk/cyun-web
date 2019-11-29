<template>
    <Card>
        <p slot="title">编辑角色</p>
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
            <FormItem label="角色名称" prop="roleName">
                <Input v-model="form.roleName" placeholder="请输入角色名称"></Input>
            </FormItem>
            <FormItem label="角色Code" prop="roleCode">
                <Input v-model="form.roleCode"></Input>
            </FormItem>
            <FormItem label="角色Code" prop="roleCode">
                <Input v-model="form.roleCode"></Input>
            </FormItem>
            <FormItem label="状态" prop="state">
                <RadioGroup v-model="form.status">
                    <Radio :label=0>启用</Radio>
                    <Radio :label=1>禁用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="权限配置" prop="menuIds">
                <menu-tree-selector
                    :role-id="$route.params.id"
                    :menu-ids.sync="form.menuIds"
                    :function-ids.sync="form.functionIds"
                ></menu-tree-selector>
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
    menuIds: [],
    status: '0',
    roleId: "",
    functionIds: []
};
export default {
    name: "sys-role-edit",
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
        getRoleDetail() {
            let { id } = this.$route.params;
            if (this.form.id !== id) {
                getRoleDetail(id).then(res => {
                    this.form = res.data;
                    this.form.roleId = id;
                    this.form.functionIds = res.data.menuIds;
                });
            }
        },
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    addOrUpdateRole(formData).then(
                        res => {
                            this.loading = false;
                            this.$refs.form.resetFields();
                            this.$lf.message("修改成功", "success");
                            closeCurrentErrPage(this, "sys-role");
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
        this.getRoleDetail();
    },
    components: {
        menuTreeSelector
    }
};
</script>
