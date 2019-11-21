<template>
    <div>
        <div class="demo-upload-list" v-for="(item,index) in uploadList">
            <template v-if="!visible">
                <ImagePreview :imageUrl="item"></ImagePreview>
                <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                </div>
            </template>
            <template v-else>
                <!-- <div class="demo-spin-container"> -->
                <Spin fix></Spin>
                <!-- </div> -->
            </template>
        </div>
        <Upload
            ref="upload"
            v-show="uploadList.length<6"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="config.format"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-progress="handleProgress"
            :on-error="handleError"
            multiple
            :type="config.type"
            :action="config.serviceUrl"
            style="display: inline-block;width:120px;"
        >
            <div style="width: 120px;height:120px;line-height: 120px;">
                <Icon type="plus" size="20"></Icon>
            </div>
        </Upload>
    </div>
</template>
<script>
import ImagePreview from "components/image-preview";
export default {
    components: {
        ImagePreview
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        // readonly: {
        //     type: Boolean,
        //     default: false
        // },
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
        }
    },
    data() {
        return {
            defaultList: [],
            imgName: "",
            visible: false,
            uploadList: [],
            urlList: ""
        };
    },
    methods: {
        handleRemove(index) {
            this.uploadList.splice(index, 1);
        },
        handleSuccess(res, file) {
            if (res.result) {
                this.uploadList.push(res.data.publicUrl);
                this.$emit("on-change", this.uploadList);
            } else {
                this.$Notice.error({
                    title: res.message || "系统错误"
                });
            }
            this.$nextTick(() => {
                this.visible = false;
            });
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
            const check = this.uploadList.length < 6;
            if (!check) {
                this.$Notice.warning({
                    title: "Up to five pictures can be uploaded."
                });
            }
            return check;
        },
        handleProgress() {
            this.visible = true;
        },
        handleCleanUrl() {
            this.uploadList = this.value.split(",");
        }
    },
    mounted() {
        this.uploadList = this.value.split(",");
    },
    watch: {
        value(val) {
            console.log(val);
            this.uploadList = val.split(",");
        }
    }
};
</script>
<style>
.demo-upload-list {
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}
.demo-upload-list img {
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}
.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
.demo-spin-container {
    display: inline-block;
    width: 120px;
    height: 120px;
    position: relative;
    /* border: 1px solid #eee; */
}
</style>