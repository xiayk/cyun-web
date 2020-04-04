
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
        >
            <FormItem label="商户账号" prop="account">
                <span>{{form.storeName}}</span>
            </FormItem>
            <FormItem label="姓名" prop="userName">
                <Input v-model="form.storeNick" placeholder="姓名"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="phone">
                <Input v-model="form.phone" placeholder="手机号码"></Input>
            </FormItem>
            <!-- <FormItem label="身份证号" prop="certificateNo" >
                <Input v-model="form.certificateNo" placeholder="身份证号"></Input>
            </FormItem>-->
            <FormItem label="状态" prop="state">
                <RadioGroup v-model="form.storeStatus">
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
import { updateStore, getStoreDetail } from "@/actions/profit";
import { closeCurrentErrPage } from "@/constants/constant";
let defaultForm = {
    storeName: "",
    phone: "",
    storeNick: "",
    storeStatus: 0
};
export default {
    name: "group-store-edit",
    data() {
        return {
            loading: false,
            form: {
                storeName: "",
                phone: "",
                storeNick: "",
                storeStatus: 0
            }
        };
    },
    methods: {
        getStoreDetail() {
            let { id } = this.$route.params;
            if (id) {
                getStoreDetail(id).then(res => {
                    this.form = res.data;
                });
            }
        },
        submit(e) {
            let { id } = this.$route.params;
            this.loading = true;
            let formData = this.form;
            if (id) {
                formData.id = id;
            }
            updateStore(formData).then(
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
    activated() {
        this.getStoreDetail();
        // getNowStoreList().then(res => {
        //     this.storeList = res.data;
        // });
    },
    created() {
        // getNowStoreList().then(res => {
        //     this.storeList = res.data;
        // });
    },
    components: {}
};
</script>
