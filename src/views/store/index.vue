<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form
                @submit.native.prevent="handleFilter"
                :model="filter"
                ref="filterForm"
                label-position="right"
                :label-width="120"
            >
                <FormItem label="商户名称" prop="userName">
                    <Input v-model="filter.storeNick" clearable></Input>
                </FormItem>
                <FormItem label="商户账号" prop="name">
                    <Input v-model="filter.storeName" clearable></Input>
                </FormItem>
                <FormItem label="手机号" prop="mobile">
                    <Input v-model="filter.phone" clearable></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'group-store-add' })">添加商户</Button>
            <Button type="primary" @click="showExportModal">批量导入</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination
            :total="total"
            :limit.sync="filter.limit"
            :offset.sync="filter.offset"
            @on-load="loadData"
        ></pagination>
        <Modal v-model="exportModal" title="导入">
            <div>
                <Spin fix v-if="uploadLoading">
                    <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
                    <div>上传导入中...</div>
                </Spin>
                <Form label-position="right" :label-width="100">
                    <FormItem label="上传数据">
                        <Upload
                            :format="['xls']"
                            :action="uploadConfig.action"
                            :headers="uploadConfig.headers"
                            :show-upload-list="false"
                            :before-upload="beforeUpload"
                            :on-format-error="onFormatError"
                            :on-success="onSuccess"
                            :on-error="onError"
                        >
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="数据模板">
                        <Button type="primary" @click="downloadExcel">下载</Button>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <!-- <Button type="text">取消</Button>
                <Button type="primary">确认</Button>-->
            </div>
        </Modal>
    </div>
</template>

<script>
import pagination from "components/pagination";
import { getStoreList, delStore } from "@/actions/profit";

import { ApiUrl } from "@/constants/constant";
import Cookies from "js-cookie";
export default {
    name: "group-store",
    data() {
        return {
            uploadConfig: {
                action: ApiUrl + "/sys/manager/export/in",
                headers: {
                    Authorization: "Bearer " + Cookies.get("token")
                }
            },
            uploadLoading: false,
            exportModal: false,
            loading: false,
            columns: [
                {
                    key: "storeNick",
                    title: "商家昵称"
                },
                {
                    key: "storeName",
                    title: "商家账号"
                },
                {
                    key: "createDate",
                    title: "创建时间",
                    width: 160
                },
                {
                    key: "phone",
                    title: "电话号码"
                },
                {
                    key: "storeStatus",
                    title: "状态",
                    render: (h, params) => {
                        let re = "";
                        if (params.row.storeStatus === 0) {
                            return h("div", "正常");
                        } else if (params.row.storeStatus === 1) {
                            return h("div", "禁用");
                        }
                    }
                },
                {
                    type: "action",
                    title: "操作",
                    width: 200,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "group-store-edit",
                                                params: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        disabled: true
                                    },
                                    on: {
                                        click: () => {
                                            this.$lf.confirm(
                                                "是否确认删除该商户？",
                                                () => {
                                                    let {
                                                        id,
                                                        storeCode
                                                    } = params.row;
                                                    delStore({
                                                        id: id
                                                    }).then(res => {
                                                        this.$lf.message(
                                                            "删除成功",
                                                            "success"
                                                        );
                                                        this.data.splice(
                                                            params.index,
                                                            1
                                                        );
                                                        this.loadData();
                                                    });
                                                }
                                            );
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                userName: "",
                phone: "",
                name: "",
                account: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        showExportModal() {
            this.exportModal = true;
        },
        beforeUpload() {
            this.uploadLoading = true;
            return true;
        },
        onFormatError() {
            this.$Notice.error({
                title: "错误提示",
                desc: "请上传.xls后缀文件"
            });
        },
        onSuccess(res, file, fileList) {
            this.uploadLoading = false;
            if (res.result) {
                this.$Notice.success({
                    title: "上传提示",
                    desc: "批量导入成功"
                });
                this.loadData();
                this.exportModal = false;
            } else {
                this.$Notice.error({
                    title: "上传提示",
                    desc: res.message
                });
            }
        },
        onError(error, file, fileList) {
            this.uploadLoading = false;
            console.log(error);
        },
        downloadExcel() {
            this.$util.downloadExcel("/sys/manager/export/mould", {});
        },
        loadData() {
            this.loading = true;
            getStoreList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.data;
                this.total = res.data.total;
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    activated() {
        this.uploadConfig = {
            action: ApiUrl + "/sys/manager/export/in",
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        };
    },
    components: {
        pagination
    }
};
</script>
