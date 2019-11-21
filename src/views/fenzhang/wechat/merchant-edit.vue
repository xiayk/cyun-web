<template>
  <merchantForm :id="$route.params.id"></merchantForm>
</template>

<script>
import merchantForm from "./merchant-form";
export default {
    name: "fz-merchant-edit",
    components: {
        merchantForm
    }
};
</script>

<style>
</style>
