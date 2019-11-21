<style lang="less">
._flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
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
        <FormItem label="商户名称">
          <Input clearable v-model="filter.merchantName"></Input>
        </FormItem>
        <FormItem label="商户编号">
          <Input clearable v-model="filter.merchantCode"></Input>
        </FormItem>
        <FormItem label="所属渠道">
          <Input clearable v-model="filter.agentName"></Input>
        </FormItem>
        <FormItem label="分账状态">
          <Select clearable v-model="filter.state" style="width:100%">
            <Option value="-1">关闭</Option>
            <Option value="1">启用</Option>
          </Select>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
    <div class="data-control">
      <Button
        type="primary"
        @click="$router.push({ name: 'fz-merchant-add'})"
        v-if="checkPermission('fz-merchant-add')"
      >新建</Button>
      <Button @click="handleBatchFreeze()" :loading="disable">批量启用</Button>
      <Button @click="handleBatchUnfreeze()" :loading="enable">批量关闭</Button>
    </div>
    <Table
      @on-selection-change="handleSelectChange"
      :loading="loading"
      border
      stripe
      :columns="columns"
      :data="data"
    ></Table>
    <pagination
      :total="total"
      :limit.sync="filter.limit"
      :offset.sync="filter.offset"
      @on-load="loadData"
    ></pagination>
  </div>
</template>

<script>
import pagination from "components/pagination";
import {
    getProfitMerchantList,
    enableAccount,
    disableAccount
} from "@/actions/profit";
export default {
    name: "fz-merchant-list",
    data() {
        return {
            loading: false,
            columns: [
                {
                    type: "selection",
                    width: 60
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "merchantCode",
                    title: "商户编号"
                },
                {
                    key: "agentName",
                    title: "所属渠道"
                },
                {
                    key: "rate",
                    title: "分账技术服务费",
                    render: (h, params) => {
                        return h("span", params.row.rate + "‱");
                    }
                },

                {
                    key: "state",
                    title: "分账状态",
                    render: (h, params) => {
                        return h(
                            "span",
                            params.row.state == "-1" ? "关闭" : "启用"
                        );
                    }
                },
                {
                    key: "createdAt",
                    title: "创建时间"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 120,
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
                                                name: "fz-merchant-edit",
                                                params: {
                                                    id: params.row.merchantId
                                                }
                                            });
                                        }
                                    }
                                },
                                "编辑"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                merchantCode: "",
                merchantName: "",
                agentName: "",
                state: ""
            },
            data: [],
            total: 0,
            disable: false,
            enable: false,
            selection: []
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getProfitMerchantList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleFilter() {
            this.filter.offset = 0;
            this.selection = [];
            this.loadData();
        },
        handleSelectChange(selection) {
            this.selection = selection;
        },
        handleBatchFreeze() {
            if (this.selection.length) {
                this.disable = true;
                let merchantIds = this.selection.map(v => v.merchantId);
                enableAccount({
                    merchantIds
                }).then(
                    res => {
                        this.disable = false;
                        this.handleFilter();
                        this.$lf.message("操作成功", "success");
                    },
                    () => {
                        this.disable = false;
                    }
                );
            }
        },
        handleBatchUnfreeze() {
            if (this.selection.length) {
                this.enable = true;
                let merchantIds = this.selection.map(v => v.merchantId);
                disableAccount({
                    merchantIds
                }).then(
                    res => {
                        this.enable = false;
                        this.handleFilter();
                        this.$lf.message("操作成功", "success");
                    },
                    () => {
                        this.enable = false;
                    }
                );
            }
        }
    },
    components: {
        pagination
    }
};
</script>