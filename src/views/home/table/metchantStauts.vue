<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="商户名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                 <FormItem label="商户编号" prop="name">
                    <Input v-model="filter.code"></Input>
                </FormItem>
               <FormItem label="所属渠道" prop="name">
                    <Input v-model="filter.parentAgentName"></Input>
                </FormItem>
                <FormItem label="交易时间" prop="_dateRange">
                    <date-range-selector style="width:100%;" v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="交易状况" prop="name">
                    <Select v-model="filter.type">
                        <Option value="1">有交易</Option>
                        <Option value="0">无交易</Option>
                    </Select>
                </FormItem>
                <FormItem label="新增时间" prop="_dateRange">
                    <date-range-selector style="width:100%;" v-model="filter._addateRange" :start-date.sync="filter.addBeginDate" :end-date.sync="filter.addEndDate"></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">查询</Button>
                    <Button type="primary" @click="downloadExcel">导出</Button>
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import { getHomePageMerchantTopList } from "@/actions/profit";
import dateRangeSelector from "components/date-range-selector";

export default {
    name: "merchant-stauts",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "name",
                    title: "商户名称"
                },
                {
                    key: "code",
                    title: "商户编号"
                },
                {
                    key: "parentAgentName",
                    title: "所属渠道"
                },
                {
                    key: "payAmount",
                    title: "交易金额"
                },
                {
                    key: "payCount",
                    title: "交易笔数"
                },
                {
                    key: "addDate",
                    title: "新增时间"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                code: "",
                type: "",
                name: "",
                parentAgentName: "",
                addBeginDate: "",
                addEndDate: "",
                _addateRange: ["", ""]
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getHomePageMerchantTopList(this.filter).then(
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
        downloadExcel() {
            this.$util.downloadExcel(
                "/settle/home/page/collect/export/merchant/condition/list",
                this.filter
            );
        }
    },
    mounted() {
        this.filter.offset = 0;
        let time = this.$route.params.form.filter;
        if (this.$route.params.form.type !== "") {
            this.filter.beginDate = time.beginDate;
            this.filter.endDate = time.endDate;
            this.filter._dateRange = time._dateRange;
            this.filter.type = this.$route.params.form.type;

            if (this.$route.params.form.add) {
                this.filter.addBeginDate = time.beginDate;
                this.filter.addEndDate = time.endDate;
                this.filter._addateRange = time._dateRange;
            } else {
                this.filter.addBeginDate = "";
                this.filter.addEndDate = "";
                this.filter._addateRange = ["", ""];
            }
        }
    },
    activated() {
        this.filter.offset = 0;
        let time = this.$route.params.form.filter;
        if (this.$route.params.form.type !== "") {
            this.filter.beginDate = time.beginDate;
            this.filter.endDate = time.endDate;
            this.filter._dateRange = time._dateRange;
            this.filter.type = this.$route.params.form.type;
            if (this.$route.params.form.add) {
                this.filter.addBeginDate = time.beginDate;
                this.filter.addEndDate = time.endDate;
                this.filter._addateRange = time._dateRange;
            } else {
                this.filter.addBeginDate = "";
                this.filter.addEndDate = "";
                this.filter._addateRange = ["", ""];
            }
        }
    },
    components: {
        pagination,
        dateRangeSelector
    }
};
</script>
