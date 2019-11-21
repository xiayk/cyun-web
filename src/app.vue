<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            theme: this.$store.state.app.themeColor
        };
    },
    mounted() {
        document.querySelector("#xlink-loading").remove();
        function removeTrim() {
            var body_element = document.body;
            var selection;
            selection = window.getSelection();

            if (window.clipboardData) {
                // Internet Explorer
                console.log(selection.anchorNode);
                selection.anchorNode.data.replace(/[, ]/g, "");
                window.clipboardData.setData("Text", selection);
                return false;
            } else {
                console.log(selection.anchorNode);
                selection.anchorNode.data.replace(/[, ]/g, "");
                var newdiv = document.createElement("div");
                newdiv.style.position = "absolute";
                newdiv.style.left = "-99999px";
                body_element.appendChild(newdiv);
                newdiv.innerHTML = selection;
                selection.selectAllChildren(newdiv);
                window.setTimeout(function() {
                    body_element.removeChild(newdiv);
                }, 0);
            }
        }
        document.oncopy = removeTrim;
    },
    beforeDestroy() {},
    methods: {}
};
</script>

<style lang="less">
@import "styles/style.less";
html,
body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main {
    width: 100%;
    height: 100%;
}
.xft-form-title {
    height: 45px;
    line-height: 45px;
    background: #eee;
    padding-left: 25px;
    margin: 25px 0;
}
</style>
