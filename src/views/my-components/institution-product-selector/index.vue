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
import { getInstitutionProductList } from "@/actions/selector";
export default {
    name: "institution-product-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        insId: {
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
            this.getList(this.filter);
        },
        getList(params) {
            if (params) {
                getInstitutionProductList(params).then(res => {
                    this.data = res.data.rows;
                    this.currentValue = this.value;
                });
            } else {
                this.data = [];
            }
        },
        handleChange(val) {
            if (val != undefined) {
                this.$emit("input", val);
            }
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        filter(val) {
            this.getList(val);
        }
    }
};
</script>
