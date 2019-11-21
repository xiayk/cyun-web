<template>
      <Select ref="select" v-model="currentValue" :name="name" clearable filterable remote :remote-method="search" :loading="loading" @on-change="handleChange">
          <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
      </Select>
</template>

<script>
export default {
  name: "branch-line-selector",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    filterable: false,
    name: ""
  },
  data() {
    return {
      loading: false,
      currentValue: this.value,
      data: [],
      filter: {
        cityId: "",
        provinceId: ""
      }
    };
  },
  activated() {
    this.search().then(() => {
      this.$forceUpdate(); //
      this.$nextTick(() => {
        this.$refs.select.value = this.currentValue;
        this.$refs.select.updateSingleSelected();
      });
    });
  },
  methods: {
    search(query) {
      this.loading = true;
      return this.$http
        .post(`/meta/bankInfo/list`, { value: query || "",privinceId: this.agentId.privinceId,cityId: this.agentId.cityId })
        .then(res => {
          this.loading = false;
          if (res.data.result) {
            this.data = res.data.data.rows.map(item => {
              return {
                value: item.bankNo,
                label: item.bankName
              };
            });
          }
        });
    },
    handleChange(val) {
      this.$emit("input", val);
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  components: {}
};
</script>
