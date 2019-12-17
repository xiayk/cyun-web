<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" ref="filterForm" label-position="right" :label-width="120">
                <FormItem label="菜单名称" prop="name">
                    <Input v-model="filter.menuName" clearable></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'sys-menu-add',query:{from:$route.name} })">新建菜单</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import { getSysMenuList, deleteMenuById } from "@/actions/sys";
export default {
    name: "sys-menu",
    data() {
        return {
            loading: false,
            columns: [
                {
                    title: "图标",
                    align: "center",
                    width: 70,
                    render: (h, params) => {
                        return h("Icon", {
                            props: {
                                type: params.row.menuIco
                            }
                        });
                    }
                },
                {
                    key: "menuName",
                    title: "菜单名称"
                },
                {
                    key: "menuCode",
                    title: "菜单编码"
                },
                {
                    key: "parentName",
                    title: "父级菜单"
                },
                {
                    key: "status",
                    title: "状态",
                    render: (h, params) => {
                        let re = "";
                        if (params.row.status === 0) {
                            return h("div", "正常");
                        } else if (params.row.status === 1) {
                            return h("div", "禁用");
                        }
                    }
                },
                {
                    key: "createDate",
                    title: "创建时间",
                    width: 150
                },
                {
                    key: "sort",
                    title: "排序",
                    width: 70
                },
                {
                    type: "action",
                    title: "操作",
                    width: 150,
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
                                                name: "sys-menu-edit",
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
                                    on: {
                                        click: () => {
                                            this.$lf.confirm(
                                                "是否确认删除该菜单？",
                                                () => {
                                                    deleteMenuById(
                                                        params.row.id
                                                    ).then(res => {
                                                        this.$lf.message(
                                                            "删除成功",
                                                            "success"
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
                menuName: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSysMenuList(this.filter).then(res => {
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
    components: {
        pagination
    }
};
</script>
