<template>
  <div>
    <Menu :menuList="menuList" @on-change="handleMenu"></Menu>
    <div style="height:5px;"></div>
    <enterprise v-if="active==2"></enterprise>
    <individual v-else></individual>
  </div>
</template>

<script>
import Menu from "components/wellat-menu";
import individual from "./individual";
import enterprise from "./enterprise";
export default {
    name: "account-manage",
    components: {
        Menu,
        enterprise,
        individual
    },
    data() {
        return {
            active: "",
            menuList: [
                {
                    title: "个人账户",
                    icon: "person",
                    id: 1
                },
                {
                    title: "企业账户",
                    icon: "person-stalker",
                    id: 2
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
