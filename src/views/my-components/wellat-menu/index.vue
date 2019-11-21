<template>
  <div>
    <Menu mode="horizontal" theme="dark" active-name="1" @on-select="handleMenu">
        <MenuItem :name="item.id" v-for="(item,index) in menuList" :key="index">
            <Icon :type="item.icon"></Icon>
            {{item.title}}
        </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'wellat-menu',
  props:{
    menuList:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
   data () {
    return {
      active:""
    }
  },

  methods: {
    handleMenu(name){
      this.$emit("on-change",name)
    }
  }
}
</script>

<style lang='less' >

</style>
