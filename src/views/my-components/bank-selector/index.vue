<template>
    <div class="bank-selector">
        <Input />
        <Icon type="ios-close" :class="[prefixCls + '-arrow']" v-show="showCloseIcon" @click.native.stop="clearSelect"></Icon>
        <Icon type="arrow-down-b" :class="[prefixCls + '-arrow']"></Icon>   
    </div>
    
</template>

<script>
export default {
    name:"bank-selector",
    data(){
        return {
            showCloseIcon:false
        }
    },
    methods:{
        clearSelect(){
            console.log(1)
        }
    }
};
</script>

<style>

</style>
