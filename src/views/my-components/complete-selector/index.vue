<template>
  <div>
    <Select
      transfer
      v-bind="$attrs"
      v-model="currentValue"
      clearable
      filterable
      :loading="loading"
      @on-change="handleChange"
      @on-clear="handleClear"
      placeholder
    >
      <Option value v-if="all">全部</Option>
      <Option
        :value="item.accountNo"
        v-for="item in data"
        :key="item.accountNo"
      >{{ item.accountName }}</Option>
    </Select>
  </div>
</template>

<script>
import { getAccountAutoComplete } from "@/actions/selector";
export default {
    name: "complete-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        processState: {
            type: [String, Number],
            default: "2"
        },
        all: {
            type: String,
            default: "1"
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            data: []
        };
    },
    created() {},
    mounted() {
        this.search(this.value || "");
    },
    methods: {
        search(query) {
            this.loading = true;
            getAccountAutoComplete({
                value: query || ""
            }).then(
                res => {
                    this.loading = false;
                    this.data = res.data;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleChange(val) {
            this.data.filter(v => {
                if (v.accountNo == val) {
                    this.$emit("update:account", v);
                }
            });
        },
        handleClear() {
            this.$emit("update:account", {});
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
            console.log(0);
        }
    }
};
</script>
