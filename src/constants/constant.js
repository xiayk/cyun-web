import axios from "axios";
import Cookies from "js-cookie";
import iView from "iview";
import store from "../store";
import env from "../../build/env";
export const ApiUrl =
    env === "development" ?
    "http://39.105.201.64:8087" :
    env === "demo" ?
    "http://39.105.201.64:8087" :
    env === "production" ?
    "http://39.105.201.64:8087" //https://xlink.91xft.cn/
    :
    "http://120.77.147.241:10000/mock/59db10974720a62cc0517952";

const uploadMaxSize = 2048;
export const uploadConfig = {
    accept: "image/*",
    headers: {
        Authorization: "Bearer " + Cookies.get("token")
    },
    name: "file",
    maxSize: uploadMaxSize,
    serviceUrl: `${ApiUrl}/sys/image/upload`
};

axios.defaults.baseURL = ApiUrl;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.headers.put["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.withCredentials = false;
axios.interceptors.request.use(config => {
    if (Cookies.get("token")) {
        config.headers.common["token"] = Cookies.get("token");
    }
    if (config.method === "post" || config.method === "put") {
        if (config.data) {
            if (
                !(config.data instanceof Array) &&
                config.data.toString() === "[object Object]"
            ) {
                let fd = {};
                for (var item in config.data) {
                    if (item.substring(0, 1) !== "_") {
                        fd[item] =
                            config.data[item] === "true" ||
                            config.data[item] === "false" ?
                            Boolean(config.data[item]) :
                            config.data[item];
                    }
                }
                config.data = fd;
            }
        }
    }
    config.validateStatus = status => {
        return status >= 200 && status <= 502;
    };
    return config;
});

axios.interceptors.response.use(
    response => {
        if (response.status < 200 || response.status >= 400) {
            if (response.config.method === "get" && response.status === 404) {
                window.location.href = "/whoops";
            } else if (response.status === 401) {
                iView.Modal.error({
                    title: "警告",
                    content: "登录超时",
                    onOk() {
                        store.commit("logout", this);
                        store.commit("clearOpenedSubmenu");
                        location.href = "#/login";
                    }
                });
                return;
            } else {
                iView.Notice.error({
                    title: "错误提示",
                    desc: response.data.msg || "未知错误"
                });
            }
            return Promise.reject(response);
        }
        if (response.data.status == 200) {
            return response.data;
        } else {
            iView.Notice.error({
                title: "错误提示",
                desc: response.data.msg || "未知错误"
            });
            return Promise.reject(response);
        }
    },
    error => {
        // iView.Spin.hide();
        return Promise.reject(error);
    }
);
const $axios = axios;
/**
 * 上传图片
 * @param {*} params
 */
export function uploadImage(params) {
    return $axios.post(uploadConfig.serviceUrl, params);
}
export default $axios;

export function closeCurrentErrPage(vm, pathname) {
    vm.$store.commit("removeTag", vm.$route.name);
    vm.$router.push({
        name: pathname || "home_index"
    });
}