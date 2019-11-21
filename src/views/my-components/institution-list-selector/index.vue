<template>
  <Select
    transfer
    :clearable="clearable"
    v-bind="$attrs"
    v-model="currentValue"
    @on-change="handleChange"
  >
    <Option
      :value="mode=='code'?item.code:item.id"
      v-for="item in data"
      :key="item.id"
    >{{ item.name }}</Option>
  </Select>
</template>

<script>
import { getInstitutionList } from "@/actions/selector";
export default {
    name: "institution-list-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        filter: {
            type: Object,
            default: function() {
                return {};
            }
        },
        mode: {
            type: String,
            default: "id"
        },
        clearable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            currentValue: this.value,
            data: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            getInstitutionList(this.filter).then(res => {
                this.data = res.data.rows;
            });
        },
        handleChange(val) {
            let curItem = this.data.filter(v=>{
                return this.mode=='id'? v.id==val: v.code==val;
            })
            this.$emit("input", val);
            this.$emit("on-change",val,curItem[0])
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        filter(val) {
            this.init();
        }
    }
};
</script>
