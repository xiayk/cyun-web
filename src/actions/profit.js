/**
 * 分润管理 -- 结算对账 相关请求
 */
import $axios from "../constants/constant";

/**
 * 分润管理 -- 日结列表
 * @param {*} params
 */
export function getProfitDailyList(params) {
    return $axios.post("/settle/profit/merchant/daily/collect", params);
}

export function getProfitDailyDetail(id, params) {
    return $axios.post(
        `/settle/profit/merchant/daily/collect/detail/${id}`,
        params
    );
}

export function getProfitStoreList(params) {
    return $axios.post(`/settle/profit/store/daily/collect`, params);
}

export function getProfitStoreDetail(id) {
    return $axios.post(`/settle/profit/store/daily/collect/detail/${id}`);
}

export function getProfitAgentList(params) {
    return $axios.post(`/settle/profit/agent/daily/collect`, params);
}

export function getProfitRateList(params) {
    return $axios.post(`/settle/profit/success/rate/list`, params);
}

/* 商户渠道报表 */
export function getHomePageMerchantTop(params) {
    return $axios.post(`/settle/home/page/collect/merchant/top`, params);
}

export function getHomePageAgentTop(params) {
    return $axios.post(`/settle/home/page/collect/agent/top`, params);
}

export function getHomePageMerchantCondition(params) {
    return $axios.post(`/settle/home/page/collect/merchant/condition`, params);
}

export function getHomePageAgentCondition(params) {
    return $axios.post(`/settle/home/page/collect/agent/condition`, params);
}

/* 商户渠道列表 */
export function getHomePageMerchantTopMore(params) {
    return $axios.post(`/settle/home/page/collect/merchant/top/more`, params);
}

export function getHomePageAgentTopMore(params) {
    return $axios.post(`/settle/home/page/collect/agent/top/more`, params);
}

export function getHomePageMerchantTopList(params) {
    return $axios.post(
        `/settle/home/page/collect/merchant/condition/list`,
        params
    );
}

export function getHomePageAgentTopList(params) {
    return $axios.post(
        `/settle/home/page/collect/agent/condition/list`,
        params
    );
}

/* 结算对账 */

export function getSeleleReconciliationList(params) {
    return $axios.post("/settle/reconciliation/batch/list", params);
}

export function getSeleleDetailList(params) {
    return $axios.post("/settle/reconciliation/detail/list", params);
}

export function getTypeCheckingResult(params) {
    return $axios.post("/meta/types/checking/result", params);
}

export function getTypeCheckingFile(params) {
    return $axios.post("/meta/types/checking/file", params);
}

export function getOperatorDailyList(params) {
    return $axios.post("/settle/profit/operator/daily/collect", params);
}

export function getOperatorDailyDetail(id) {
    return $axios.post(
        `/settle/profit/operator/daily/collect/detail/${id}`,
        {}
    );
}

/**
 * 微信分账
 */

/**
 * 分账商户列表
 * @param {*} params
 */
export function getProfitMerchantList(params) {
    return $axios.post("/profit/merchant/list", params);
}

/**
 * 新增修改分账账户
 * @param {*} params
 */
export function addOrUpdateMerchantAccount(params) {
    let url = params.id ? "/profit/merchant/update" : "/profit/merchant/add";
    return $axios.post(url, params);
}

/**
 * 获取分账账号列表
 * @param {*} params
 */
export function getMerchantAccountList(params) {
    return $axios.post("/profit/merchant/account/list", params);
}

/**
 * 删除分账方
 * @param {*} id
 */
export function deleteAccountById(id) {
    return $axios.post(`/profit/merchant/delete/${id}`);
}

/**
 * 获取详情
 * @param {*} merchantId
 */
export function getAccountDetail(merchantId) {
    return $axios.post(`/profit/merchant/xft/detail/${merchantId}`);
}

/**
 * 解冻
 * @param {*} params
 */
export function enableAccount(params) {
    return $axios.post("/profit/merchant/batch/enable", params);
}

/**
 * 冻
 * @param {*} params
 */
export function disableAccount(params) {
    return $axios.post("/profit/merchant/batch/disable", params);
}

/**
 * 获取分账详情
 * @param {*} params
 */
export function getMerchantFzDetail(params) {
    return $axios.post("/profit/merchant/detail/list", params);
}
