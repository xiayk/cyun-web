<template>
  <Select
    transfer
    v-bind="$attrs"
    v-model="currentValue"
    :clearable="!init"
    filterable
    :remote="!init"
    :remote-method="!init?search:''"
    :loading="loading"
    @on-change="handleChange"
    @on-clear="handleClear"
  >
    <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>

<script>
import { getMerchantListSelect } from "@/actions/selector";
export default {
    name: "xlink-merchant-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        mode: {
            type: String,
            default: "id"
        },
        init: {
            type: Boolean,
            default: false
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
        this.search();
    },
    methods: {
        handleClear() {
            this.search();
        },
        search(query) {
            this.loading = true;
            let { mode } = this;
            getMerchantListSelect({
                value: query || ""
            }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows.map(item => {
                        return {
                            value:
                                mode == "id"
                                    ? item.id
                                    : mode == "code"
                                    ? item.code
                                    : item.id,
                            label: item.fullName,
                            item
                        };
                    });
                    if (this.init) {
                        // this.currentValue = this.data[0].value;
                        this.handleChange(this.data[0].value);
                    }
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleChange(val) {
            this.$emit("input", val);
            const item = this.data.filter(v => {
                return v.value === val;
            });
            if (item.length) {
                this.$emit("update:merchantInfo", item[0].item);
            }
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
