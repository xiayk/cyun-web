import Vue from "vue";
import iView from "iview";
import { router } from "./router/index";
import { appRouter } from "./router/router";
import store from "./store";
import App from "./app.vue";
import Util from "./libs/util";
import "@/locale";
import "iview/dist/styles/iview.css";
import VueI18n from "vue-i18n";

import Device from "./plugins/device";
import Alert from "./plugins/alert";
import Message from "./plugins/message";
import Confirm from "./plugins/confirm";
import Spin from "./plugins/spin";
import QueryFilter from "./plugins/query-filter";
import CheckPermission from "./plugins/check-permission";
import projectFilters from "./libs/project";
import Print from "./libs/print";
import Bus from "./libs/bus";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
    loading: "./src/images/loading.gif"
});
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(Device);
Vue.use(Alert);
Vue.use(Confirm);
Vue.use(Message);
Vue.use(Spin);
// Vue.use(iviewArea);
Vue.use(QueryFilter);
Vue.use(CheckPermission);
Vue.use(Print);
// filters
Object.keys(projectFilters).forEach((k, v) => {
    Vue.filter(k, projectFilters[k]);
});
Vue.prototype.$util = Util;
Vue.prototype.$bus = Bus;
new Vue({
    el: "#app",
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ""
    },
    mounted() {
        this.currentPageName = this.$route.name;
        //存储用户信息
        this.$store.commit("saveUserInfo");
        // 显示打开的页面的列表
        this.$store.commit("setOpenedList");
        this.$store.commit("initCachepage");
        // 权限菜单过滤相关
        // this.$store.commit("updateMenulist");
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created() {
        let tagsList = [];
        appRouter.map(item => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit("setTagsList", tagsList);
    },
    watch: {
        "$store.state.app.accessRouter"() {
            // 页面初始化时判断是否有相关权限
            /*  if (
                 !(
                     this.$route.meta.access === 1 ||
                     this.checkPermission(this.$route.name)
                 )
             ) {
                 this.$router.replace({
                     name: "error-403"
                 });
             } */
        }
    }
});
