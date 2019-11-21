<template>
  <div>
    <Menu :menuList="menuList" @on-change="handleMenu"></Menu>
    <div style="height:5px;"></div>
    <cash v-if="active==2"></cash>
    <refund v-if="active == 3"></refund>
    <audit v-if="active == 4"></audit>
    <account v-if="active == 1 || active == ''"></account>
  </div>
</template>

<script>
import Menu from "components/wellat-menu";
import account from "./account_balance";
import audit from "./audit_manage";
import cash from "./cash_audit";
import refund from "./refund_audit";
export default {
    name: "finance-manage",
    components: {
        Menu,
        cash,
        account,
        refund,
        audit
    },
    data() {
        return {
            active: "",
            menuList: [
                {
                    title: "账户余额",
                    icon: "person",
                    id: 1
                },
                {
                    title: "提现审核",
                    icon: "person-stalker",
                    id: 2
                },
                {
                    title: "退款审核",
                    icon: "person-stalker",
                    id: 3
                },
                {
                    title: "已审核退款管理",
                    icon: "person",
                    id: 4
                }
            ]
        };
    },

    methods: {
        handleMenu(name) {
            this.active = name;
        }
    }
};
</script>

<style lang='less' >
</style>
