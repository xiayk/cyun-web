<template>
    <div class="demo-spin-container">
        <merchantDetail v-if="state == '3'" :info.sync="info"></merchantDetail>
        <personDetail v-else :info.sync="info"></personDetail>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
import merchantDetail from "./info.vue";
import personDetail from "./base-detail";
import { getAdmitPersonOrEntDetail } from "@/actions/wallet";
export default {
    name: "account-manage-detail",
    components: {
        merchantDetail,
        personDetail
    },
    data() {
        return {
            account: 0,
            state: "",
            info: {},
            spinShow: false
        };
    },

    methods: {
        getAdmitPersonOrEntDetail() {
            this.spinShow = true;
            let type = this.state == "1" ? "ent" : "person";
            getAdmitPersonOrEntDetail(type, this.$route.params.id).then(res => {
                this.info = res.data;
                this.spinShow = false;
            });
        }
    },
    activated() {
        this.state = this.$route.query.state;
        this.getAdmitPersonOrEntDetail();
    }
};
</script>

<style lang='less' >
.demo-spin-container {
    // width: 200px;
    // height: 100px;
    position: relative;
    border: 1px solid #eee;
}
// .xft-form-title {
//     height: 45px;
//     line-height: 45px;
//     background: #eee;
//     padding-left: 25px;
//     margin: 25px;
// }
</style>
