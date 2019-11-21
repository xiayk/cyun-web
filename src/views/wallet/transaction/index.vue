<template>
  <div>
    <Menu :menuList="menuList" @on-change="handleMenu"></Menu>
    <div style="height:5px;"></div>
    <platform v-if="active == '1' || active == ''"></platform>
    <withdrawal v-if="active == '2'"></withdrawal>
    <order v-if="active == '3'"></order>
    <refund v-if="active == '4'"></refund>
  </div>
</template>

<script>
import Menu from "components/wellat-menu";
import order from "./order_record";
import platform from "./platform_record";
import refund from "./refund_record";
import withdrawal from "./withdrawal_record";
export default {
    name: "transaction-record",
    components: {
        Menu,
        order,
        platform,
        refund,
        withdrawal
    },
    data() {
        return {
            active: "",
            menuList: [
                {
                    title: "平台交易记录",
                    icon: "person-stalker",
                    id: 1
                },
                {
                    title: "提现记录",
                    icon: "person",
                    id: 2
                },
                {
                    title: "转账记录",
                    icon: "person",
                    id: 3
                },

                {
                    title: "退款记录",
                    icon: "person-stalker",
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
