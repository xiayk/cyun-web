<template>
    <div>
        <Select
            transfer
            ref="select"
            :label="currentLabel"
            v-model="currentValue"
            v-bind="$attrs"
            placeholder="输入关键字搜索"
            filterable
            remote
            clearable
            @on-change="handleChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :disabled="disabled"
        >
            <Option
                v-for="(option, index) in list"
                :value="option.value"
                :key="option.item.code"
            >{{option.label}}</Option>
        </Select>
    </div>
</template>

<script>
import { getBankInfoList } from "@/actions/selector";
export default {
    name: "bank-serach-selector2",
    props: {
        value: {
            type: String,
            default: ""
        },
        bankName: {
            type: String,
            default: ""
        },
        code: {
            type: String,
            default: ""
        },
        callback: Function,
        disabled: {
            type: Boolean,
            default: false
        },
        splices: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            list: []
        };
    },
    computed: {
        currentLabel() {
            return this.bankName;
        }
    },
    methods: {
        remoteMethod(query) {
            if (query !== "") {
                this.loading = true;
                getBankInfoList({
                    name: query
                }).then(
                    res => {
                        this.loading = false;
                        this.list = res.data.rows.map(v => {
                            return {
                                value: v.name,
                                label: v.name,
                                item: v
                            };
                        });
                        if (this.splices) {
                            this.list = this.list.splice(0, this.splices);
                        }
                    },
                    err => {
                        this.loading = false;
                    }
                );
            } else {
                this.list = [];
            }
        },
        handleChange(val) {
            this.list.filter(v => {
                if (v.value === val) {
                    this.$emit("input", v.item.name);
                    this.callback && this.callback(v.item);
                }
            });
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
