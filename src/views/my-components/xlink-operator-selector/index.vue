<template>
  <Select
    transfer
    v-bind="$attrs"
    v-model="currentValue"
    clearable
    filterable
    remote
    :disabled="!storeId"
    :remote-method="search"
    :loading="loading"
    @on-change="handleChange"
    @on-clear="handleClear"
  >
    <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>

<script>
import { getStoreOperatorListSelect } from "@/actions/selector";
export default {
    name: "xlink-operator-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        storeId: {
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
    methods: {
        handleClear() {
            this.search();
        },
        search(query) {
            const { storeId } = this;
            if (!storeId) return;
            this.loading = true;
            getStoreOperatorListSelect({
                value: query || "",
                id: storeId
            }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows.map(item => {
                        return {
                            value: item.userId,
                            label: item.name
                        };
                    });
                },
                err => {
                    this.loading = false;
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
        storeId: {
            immediate: true,
            handler(val, oldVal) {
                if (val) {
                    this.search(this.value);
                } else {
                    this.$children[0] && this.$children[0].clearSingleSelect();
                }
            }
        }
    }
};
</script>
