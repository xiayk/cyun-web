<template>
    <div>
        <Select
            transfer
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
                :value="item.code"
                v-for="item in data"
                :key="item.code"
            >{{ !code?item.name:item.code }}</Option>
        </Select>
    </div>
</template>

<script>
import { getZbAdminAgenComplete } from "@/actions/selector";
export default {
    name: "complete-selector",
    props: {
        value: {
            type: String || Number,
            default: ""
        },
        all: {
            type: String,
            default: "1"
        },
        code: {
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
    created() {},
    mounted() {
        this.search(this.value || "");
    },
    methods: {
        search(query) {
            this.loading = true;
            getZbAdminAgenComplete({ value: query || "" }).then(
                res => {
                    this.loading = false;
                    this.data = res.data;
                    if (
                        !this.all &&
                        this.$store.state.user.userInfo.userType == "7"
                    ) {
                        this.currentValue = res.data[0].code;
                        this.$emit("update:account", res.data[0]);
                        this.$emit("input", res.data[0].code);
                    }
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleChange(val) {
            this.$emit("input", val);
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
        }
    }
};
</script>
