/**
 * 系统相关请求
 */
import $axios from "../constants/constant";

/**
 * 登录
 * @param {*} params
 */
export function login(params) {
    return $axios.post("/users/login", params);
};

/**
 * 解锁
 * @param {*} password 
 */
export function unlock(password) {
    return $axios.post(`/users/lock/login/${password}`);
};

/**
 * 修改密码
 */
export function changePWd(params) {
    return $axios.post("/users/update/password", params);
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
    return $axios.post("/users/info/my");
}



/**
 *  ┏┓　　　┏┓
 *┏┛┻━━━┛┻┓
 *┃　　　　　　　┃
 *┃　　　━　　　┃
 *┃　┳┛　┗┳　┃
 *┃　　　　　　　┃
 *┃　　　┻　　　┃
 *┃　　　　　　　┃
 *┗━┓　　　┏━┛
 *　　┃　　　┃
 *　　┃　　　┃
 *　　┃　　　┗━━━┓
 *　　┃　　　　　　　┣┓
 *　　┃　　　　　　　┏┛
 *　　┗┓┓┏━┳┓┏┛
 *　　　┃┫┫　┃┫┫
 *　　　┗┻┛　┗┻┛
 * 操作员相关action
 */

/**
 * 重置操作员密码
 * @param {*} userId
 */
export function resetManagerPwdById(userId) {
    return $axios.post(`/users/reset/${userId}`);
}

/**
 * 删除操作员
 * @param {*} managerId
 */
export function deleteManagerById(params) {
    return $axios.post(`/sys/manager/delete`, params);
};



/**
 * 获取登录角色菜单
 */
export function getMenus() {
    return $axios.post("/menu/my");
}

/**
 * 获取操作员
 * @param {*} params
 */
export function getManagers(params) {
    return $axios.post("/users/list", params);
}

/**
 * 增加或编辑操作员
 * @param {*} params
 */
export function addOrUpdateManager(params) {
    let url = "/users/addOrUpdate";
    return $axios.post(url, params);
}

/**
 * 获取用户信息
 * @param {*} id
 */
export function getManagerDetail(id) {
    return $axios.post(`/users/detail/${id}`);
}

/**
 *  ┏┓　　　┏┓
 *┏┛┻━━━┛┻┓
 *┃　　　　　　　┃
 *┃　　　━　　　┃
 *┃　┳┛　┗┳　┃
 *┃　　　　　　　┃
 *┃　　　┻　　　┃
 *┃　　　　　　　┃
 *┗━┓　　　┏━┛
 *　　┃　　　┃
 *　　┃　　　┃
 *　　┃　　　┗━━━┓
 *　　┃　　　　　　　┣┓
 *　　┃　　　　　　　┏┛
 *　　┗┓┓┏━┳┓┏┛
 *　　　┃┫┫　┃┫┫
 *　　　┗┻┛　┗┻┛
 * 菜单相关action
 */

/**
 * 获取系统菜单列表
 */
export function getSysMenuList(params) {
    return $axios.post("/menu/list", params);
}

/**
 * 添加或编辑系统菜单
 */
export function addOrUpdateMenu(params) {
    let url = "";
    if (params.id) {
        url = "/menu/edit";
    } else {
        url = "/menu/save";
    }
    return $axios.post(url, params);
}

/**
 * 获取菜单信息
 * @param {*} id
 */
export function getMenuDetail(id) {
    return $axios.post(`/menu/detail/${id}`);
}

export function deleteMenuById(menuId) {
    return $axios.post(`/menu/del/${menuId}`);
}

/**
 *  ┏┓　　　┏┓
 *┏┛┻━━━┛┻┓
 *┃　　　　　　　┃
 *┃　　　━　　　┃
 *┃　┳┛　┗┳　┃
 *┃　　　　　　　┃
 *┃　　　┻　　　┃
 *┃　　　　　　　┃
 *┗━┓　　　┏━┛
 *　　┃　　　┃
 *　　┃　　　┃
 *　　┃　　　┗━━━┓
 *　　┃　　　　　　　┣┓
 *　　┃　　　　　　　┏┛
 *　　┗┓┓┏━┳┓┏┛
 *　　　┃┫┫　┃┫┫
 *　　　┗┻┛　┗┻┛
 * 角色相关action
 */

/**
 * 获取系统角色列表
 */
export function getSysRoleList(params) {
    return $axios.post("/role/list", params);
}

/**
 * 新增编辑角色
 * @param {*} params
 */
export function addOrUpdateRole(params) {
    let url = "";
    if (params.id) {
        url = "/role/edit";
    } else {
        url = "/role/save";
    }
    return $axios.post(url, params);
}

/**
 * 获取角色信息
 * @param {*} id
 */
export function getRoleDetail(id) {
    return $axios.post(`/role/detail/${id}`);
}

/**
 * 删除角色
 * @param {*} roleId
 */
export function deleteRoleById(roleId) {
    return $axios.post(`/role/del/${roleId}`);
}
/**
 * 获取首页review
 * @param {*} params
 */
export function getHomePageReviewCount(params) {
    return $axios.post("/sys/home/page/review/count", params);
}

/**
 * 获取首页refund review
 * @param {*} params
 */
export function getHomePageRefundReviewCount(params) {
    return $axios.post("/sys/home/page/refund/review/count", params);
}

/**
 * 首页图表
 */

export function getHomePageDailyAgentProfitCount(params) {
    return $axios.post("/sys//home/page/daily/agent/profit/count", params);
}

export function getHomePageDailyPayRatioStore(params) {
    return $axios.post("/settle/home/page/collect/type/yesterday", params);
}

export function getHomePageDailyAmountOrNumCount(type, params) {
    return $axios.post(`/sys/home/page/daily/${type}/count`, params);
}

export function getHomePagePayRatioInstitution(params) {
    return $axios.post("/sys/home/page/pay/ratio/institution", params);
}
export function getHomePageDailyAddMerchantCount(params) {
    return $axios.post("/sys/home/page/daily/add/merchant/count", params);
}

/* 昨日交易数据 */
export function getHomePageTransaction(type = "yesterday", params) {
    return $axios.post(`/settle/home/page/collect/transaction/${type}`, params);
}
/* 昨日进件 */
export function getHomePageCollectAddYesterday(params) {
    return $axios.post("/settle/home/page/collect/add/yesterday", params);
}
/* 时间段交易 */
export function getHomePageCollectDaily(params) {
    return $axios.post("/settle/home/page/collect/daily", params);
}
/* 昨日银行 */
export function getHomePageCollectYesterday(params) {
    return $axios.post("/settle/home/page/collect/type/yesterday", params);
}


/**
 * 获取当前用户门店列表
 */
export function getNowStoreList() {
    return $axios.post("/sys/role/store/list");
}