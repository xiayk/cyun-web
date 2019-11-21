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
        <FormItem label="创建时间" prop="_dateRange">
            <date-range-selector style="width:100%;" v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
    <Table
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
import { mapState } from "vuex";
import pagination from "components/pagination";
import {getOrderTaskList  } from "@/actions/selector";
import dateRangeSelector from "components/date-range-selector";
export default {
    name: "download-task-list",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "createdAt",
                    title: "创建时间"
                },
                {
                    key: "fileName",
                    title: "文件名称"
                },
                {
                    key: "stateDesc",
                    title: "任务状态",
                    align:'center',
                    width:120
                },
                {
                    type: "action",
                    title: "操作",
                    align:'center',
                    width: 120,
                    render: (h, params) => {
                        const {state,fileName}=params.row
                        return params.row.state==1&&h("Button", {
                            props:{
                                type:'text',
                            },
                            on:{
                                click:()=>{
                                    this.down({
                                        fileName
                                    })
                                }
                            }
                        },'下载');
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                 _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getOrderTaskList(this.filter).then(
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
            this.loadData();
        },
        down(params={}){
            this.$util.downloadExcel(
                "/settle/transaction/export/task/download",
                params
            );
        }
    },
    computed: mapState({
        userType: state => state.user.userInfo.userType,
        operatorType: state => state.user.userInfo.operatorType
    }),
    components: {
        pagination,
        dateRangeSelector
    }
};
</script>
