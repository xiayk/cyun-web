<template>
  <div v-bind="$attrs" class="images" v-viewer="options">
    <img
      v-if="filter"
      :src="imageUrl|getUploadUrl(0, 90, '')"
      :data-source="imageUrl|getUploadUrl(0, 2000, '')"
    >
    <img v-else :src="imageUrl" :data-source="imageUrl|getUploadUrl(0, 2000, '')">
  </div>
</template>

<script>
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer, {
    defaultOptions: {
        navbar: false,
        title: false,
        toolbar: {
            zoomIn: 1,
            zoomOut: 1,
            reset: 1,
            rotateLeft: 1,
            rotateRight: 1
        }
    }
});
export default {
    name: "image-preview",
    props: ["imageUrl", "filter"],
    data() {
        return {
            options: {
                url: "data-source"
            }
        };
    }
};
</script>

<style lang="less" scoped>
.images {
    width: 120px;
    height: 120px;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
