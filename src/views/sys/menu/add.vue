
<template>
    <Card>
        <p slot="title">
            新增菜单
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
            <FormItem label="菜单编码" prop="coe" >
                <Input v-model="form.menuCode"></Input>
            </FormItem>
            <FormItem label="菜单名称" prop="nme" >
                <Input v-model="form.menuName"></Input>
            </FormItem>
            <FormItem label="图标" prop="imag">
                <Input v-model="form.menuIco">
                    <Icon :type="form.menuIco" slot="append"></Icon>
                </Input>
            </FormItem>
            <FormItem label="父菜单名称" prop="arentId">
                <menu-selector v-model="form.parentId"></menu-selector>
            </FormItem>
            <FormItem label="菜单URL" prop="ur" >
                <Input v-model="form.menuUrl"></Input>
            </FormItem>
            <FormItem label="菜单排序" prop="ank" >
                <Input v-model="form.sort"></Input>
            </FormItem>
            <FormItem label="状态" prop="status">
                <RadioGroup v-model="form.status">
                    <Radio :label=0>启用</Radio>
                    <Radio :label=1>禁用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="角色配置" prop="roleIds">
                <menu-role-selector isSingle v-model="form.roleIds"></menu-role-selector>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import menuRoleSelector from "components/menu-role-selector";
import menuSelector from "components/menu-selector";
import menuTypeSelector from "components/menu-type-selector";
import { addOrUpdateMenu, getMenuDetail } from "@/actions/sys";
import { validateData } from "./validate";
import { closeCurrentErrPage } from "@/constants/constant";
let defaultForm = {
    types: "1",
    rank: "1",
    parentId: "0",
    roleIds: []
};
export default {
    name: "sys-menu-add",
    data() {
        return {
            loading: false,
            form: defaultForm,
            rules: validateData
        };
    },
    methods: {
        handlerFunctionAdd() {
            this.form.functions.push({
                code: "",
                name: ""
            });
        },
        handlerFunctionRemove(index) {
            // 为了提高效率，没填内容的项可直接删除
            if (
                this.form.functions[index].name &&
                this.form.functions[index].code
            ) {
                this.$lf.confirm("确认要删除吗？", () => {
                    this.form.functions.splice(index, 1);
                });
            } else {
                this.form.functions.splice(index, 1);
            }
        },
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    console.log(formData)
                    addOrUpdateMenu(formData).then(
                        res => {
                            this.loading = false;
                            this.$refs.form.resetFields();
                            this.$lf.message("添加成功", "success");
                            closeCurrentErrPage(this, "sys-menu");
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    },
    components: {
        menuRoleSelector,
        menuSelector,
        menuTypeSelector
    }
};
</script>
