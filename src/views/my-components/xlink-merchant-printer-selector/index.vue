<template>
  <Select
    transfer
    v-bind="$attrs"
    v-model="currentValue"
    @on-change="handleChange"
    clearable
  >
    <Option :value="item.code" v-for="item in data" :key="item.code">打印机编号：{{ item.code }}</Option>
  </Select>
</template>

<script>
import { getPrinterList } from "@/actions/selector";
export default {
    name: "xlink-merchant-printer-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        storeCode:{
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            data: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let {storeCode}=this;
            getPrinterList({
                storeCode
            }).then(
                res => {
                    this.data=res.data;
                    if(res.data.length==1&&!this.value){
                        this.handleChange(this.data[0].code);
                    }
                }
            );
        },
        handleChange(val) {
            this.$emit("input", val);
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        storeCode(){
            this.init();
        }
    }
};
</script>
