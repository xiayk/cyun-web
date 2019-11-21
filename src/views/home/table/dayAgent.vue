<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                 <FormItem label="统计时间" prop="_dateRange">
                    <date-range-selector style="width:100%;" v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="渠道名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                 <FormItem label="渠道编号" prop="name">
                    <Input v-model="filter.code"></Input>
                </FormItem>
               <FormItem label="所属渠道" prop="name">
                    <Input v-model="filter.parentAgentName"></Input>
                </FormItem>
                <FormItem label="排序规则" prop="name">
                    <Select v-model="filter.type">
                        <Option value="0">交易金额排序</Option>
                        <Option value="1">手续费排序</Option>
                    </Select>
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
import { getHomePageAgentTopMore } from "@/actions/profit";
import dateRangeSelector from "components/date-range-selector";

export default {
    name: "yesterday-agent",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "name",
                    title: "渠道名称"
                },
                {
                    key: "code",
                    title: "渠道编号"
                },
                {
                    key: "parentAgentName",
                    title: "所属渠道"
                },
                {
                    key: "amount",
                    title: "交易金额"
                },
                {
                    key: "profitAmount",
                    title: "手续费"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                merchantName: "",
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                code: "",
                type: "",
                name: "",
                parentAgentName: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getHomePageAgentTopMore(this.filter).then(
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
                "/settle/home/page/collect/export/agent/top/more",
                this.filter
            );
        }
    },
    mounted() {
        this.filter.offset = 0;
        let yesterday = new Date();
        yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
        let data =
            yesterday.getFullYear() +
            "-" +
            (yesterday.getMonth() + 1) +
            "-" +
            yesterday.getDate();
        this.filter.beginDate = data + " 00:00:00";
        this.filter.endDate = data + " 23:59:59";
        this.filter._dateRange = [this.filter.beginDate, this.filter.endDate];
        this.loadData();
        if (this.$route.params.type == "0") {
            this.filter.type = "0";
        } else {
            this.filter.type = "1";
        }
    },
    activated() {
        this.filter.offset = 0;
    },
    components: {
        pagination,
        dateRangeSelector
    }
};
</script>
