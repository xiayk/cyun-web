export default {
    getUploadUrl: (url, width = 0, height = 0, mode = "fill") => {
        if (!url) {
            return "";
        }
        let thumbUrl = "";
        let query = [];
        if (!width && !height) {
            width = 80;
        }
        if (width === 0) {
            query.push(`height=${height}`);
        } else if (height === 0) {
            query.push(`width=${width}`);
        } else {
            query.push(`height=${height}`);
            query.push(`width=${width}`);
        }
        if (mode) {
            // fit: 长边等比缩放
            // fill: 裁剪
            query.push(`mode=${mode}`);
        }
        if (url) {
            thumbUrl = url + `?` + query.join("&");
        } else {
            thumbUrl = `http://placeholder.qiniudn.com/${width}x${height}`;
        }
        return thumbUrl;
    },
    go: (url, $router) => {
        if (/^javas/.test(url) || !url) return;
        const useRouter =
            typeof url === "object" ||
            ($router && typeof url === "string" && !/http/.test(url));
        if (useRouter) {
            $router.go(url);
        } else {
            window.location.href = url;
        }
    },
    getUrl: (url, $router) => {
        // Make sure the href is right in hash mode
        if (
            $router &&
            !$router._history &&
            typeof url === "string" &&
            !/http/.test(url)
        ) {
            return `#!${url}`;
        }
        return url && typeof url !== "object" ? url : "javascript:void(0);";
    },
    join: (array, separator) => {
        return array.length === 1 ? array[0] : array.join(separator || " ");
    },
    format_date: (t, fmt = "yyyy-MM-dd hh:mm") => {
        if (!t) return "";
        var time = t;
        let date =
            typeof time === "number"
                ? new Date(time)
                : new Date((time || "").replace(/-/g, "/"));

        let isValidDate =
            Object.prototype.toString.call(date) === "[object Date]" &&
            !isNaN(date.getTime());

        if (!isValidDate) {
            console.error("not a valid date");
        }
        const formatDate = function(date, fmt) {
            var o = {
                "y+": date.getFullYear(),
                "M+": date.getMonth() + 1, // 月份
                "d+": date.getDate(), // 日
                "h+": date.getHours(), // 小时
                "m+": date.getMinutes(), // 分
                "s+": date.getSeconds(), // 秒
                "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
                "S+": date.getMilliseconds() // 毫秒
            };
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    if (k === "y+") {
                        fmt = fmt.replace(
                            RegExp.$1,
                            ("" + o[k]).substr(4 - RegExp.$1.length)
                        );
                    } else if (k === "S+") {
                        var lens = RegExp.$1.length;
                        lens = lens === 1 ? 3 : lens;
                        fmt = fmt.replace(
                            RegExp.$1,
                            ("00" + o[k]).substr(("" + o[k]).length - 1, lens)
                        );
                    } else {
                        fmt = fmt.replace(
                            RegExp.$1,
                            RegExp.$1.length === 1
                                ? o[k]
                                : ("00" + o[k]).substr(("" + o[k]).length)
                        );
                    }
                }
            }
            return fmt;
        };

        return formatDate(date, fmt);
    },
    toFixed: (currency = 0, decimal = 2) => {
        return currency.toFixed(decimal);
    },
    friendlyDate: (t, showTime) => {
        if (!t) return "";
        var time = t;
        let date =
            typeof time === "number"
                ? new Date(time)
                : new Date((time || "").replace(/-/g, "/"));
        let diff = (new Date().getTime() - date.getTime()) / 1000;
        let dayDiff = Math.floor(diff / 86400);

        let isValidDate =
            Object.prototype.toString.call(date) === "[object Date]" &&
            !isNaN(date.getTime());

        if (!isValidDate) {
            console.error("not a valid date");
        }
        const formatDate = function(date) {
            let today = new Date(date);
            let year = today.getFullYear();
            let month = ("0" + (today.getMonth() + 1)).slice(-2);
            let day = ("0" + today.getDate()).slice(-2);
            let hour = today.getHours();
            let minute = today.getMinutes();
            let second = today.getSeconds();
            if (year === new Date().getFullYear()) {
                if (showTime) {
                    return `${month}月${day}日 ${hour}:${minute}`;
                } else {
                    return `${month}月${day}日`;
                }
            } else {
                if (showTime) {
                    return `${year}年${month}月${day}日 ${hour}:${minute}`;
                } else {
                    return `${year}年${month}月${day}日`;
                }
            }
        };

        if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 3) {
            return formatDate(date);
        }

        if (dayDiff === 0) {
            return (
                (diff < 60 && "刚刚") ||
                (diff < 120 && "1分钟前") ||
                (diff < 3600 && Math.floor(diff / 60) + "分钟前") ||
                (diff < 7200 && "1小时前") ||
                (diff < 86400 && Math.floor(diff / 3600) + "小时前")
            );
        } else if (dayDiff < 3) {
            return dayDiff + "天前";
        }
    }
};
