<template>
    <div>
        <div v-for="item in uploadList" class="img-container">
            <template v-if="item.status === 'finished'">
                <ImagePreview :imageUrl="item.url"></ImagePreview>
                <Icon
                    @click="handleRemove(item)"
                    v-if="!readonly"
                    type="trash-a"
                    class="i-close"
                    size="20"
                ></Icon>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
            v-show="!uploadList.length"
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="config.format"
            :max-size="1024"
            :on-error="handleError"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :type="config.type"
            :action="config.serviceUrl"
            :headers="config.headers"
            :data="config.data"
            style="display: inline-block;width:58px;"
        >
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="plus" size="20"></Icon>
            </div>
        </Upload>
        <slot></slot>
    </div>
</template>

<script>
import ImagePreview from "components/image-preview";
import Cookies from "js-cookie";
export default {
    name: "image-upload",
    components: {
        ImagePreview
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        readonly: {
            type: Boolean,
            default: false
        },
        config: {
            type: Object,
            default: function() {
                return {
                    maxSize: "",
                    serviceUrl: "",
                    type: "drag",
                    format: ["jpg", "jpeg", "png"]
                };
            }
        },
        type: {
            type: String,
            default: "add"
        }
    },
    data() {
        return {
            defaultList: [],
            uploadList: []
        };
    },
    methods: {
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.$nextTick(() => {
                this.uploadList = this.$refs.upload.fileList;
            });
        },
        handleSuccess(res, file) {
            if (!res.result || res.data.failureMsg) {
                this.$Notice.error({
                    title: "错误提示",
                    desc: `${res.message || res.data.failureMsg}`
                });
                this.defaultList = [];
                this.$nextTick(() => {
                    this.uploadList = this.defaultList;
                });
            } else {
                file.url = res.data.publicUrl;
                file.name = res.data.name;
                this.$emit("on-change", res.data);
                this.$emit("input", res.data.publicUrl);
            }
        },
        handleError(res, file) {
            this.$Notice.error({
                title: res.message || "系统错误"
            });
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "文件格式不正确"
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "文件大小超过限制（1M）"
            });
        },
        handleBeforeUpload() {
            const fileList = this.$refs.upload.fileList;
            fileList.forEach(element => {
                this.handleRemove(element);
            });
            if (this.readonly) {
                this.$lf.message("当前状态不能上传", "error");
            }
            return !this.readonly;
        }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
        this.config.headers = {
            Authorization: "Bearer " + Cookies.get("token")
        };
    },
    watch: {
        value(val) {
            if (val) {
                this.defaultList = [
                    {
                        url: val,
                        name: val
                    }
                ];
                this.$nextTick(() => {
                    this.uploadList = this.defaultList;
                });
            } else {
                this.defaultList = [];
                this.$nextTick(() => {
                    this.uploadList = this.defaultList;
                });
            }
        },
        config(val) {}
    }
};
</script>
<style lang="less" scoped>
.img-container {
    position: relative;
    width: 120px;
    height: 120px;
    .i-close {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
}
</style>


