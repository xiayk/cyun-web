<template>
  <div>
    <Menu :menuList="menuList" @on-change="handleMenu"></Menu>
    <div style="height:5px;"></div>
    <!-- <enterprise v-if="active==2"></enterprise> -->
    <!-- <individual v-else></individual> -->
  </div>
</template>

<script>
import Menu from "components/wellat-menu"
export default {
  name: 'record-manage',
  components:{
    Menu
  },
  data () {
    return {
      active:"",
      menuList:[
        {
          title:"对帐批资查询",
          icon:"person",
          id:1
        },
        {
          title:"对账查询",
          icon:"person-stalker",
          id:2
        },
        {
          title:"已处理差错查询",
          icon:"person",
          id:3
        }
      ]
    }
  },

  methods: {
    handleMenu(name){
      this.active = name
    }
  }
}
</script>

<style lang='less' >

</style>
