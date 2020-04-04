webpackJsonp([6],{283:function(t,e,o){"use strict";function n(t){u||o(853)}Object.defineProperty(e,"__esModule",{value:!0});var r=o(509),a=o.n(r);for(var i in r)"default"!==i&&function(t){o.d(e,t,function(){return r[t]})}(i);var l=o(855),s=o.n(l),u=!1,c=o(4),d=n,f=c(a.a,s.a,!1,d,null,null);f.options.__file="src/views/store/index.vue",e.default=f.exports},317:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"pagination",props:{offset:{type:[String,Number],default:1},limit:{type:[String,Number],default:10},total:{type:[String,Number],default:0}},data:function(){return{current:1,data:[],currentOffset:0,currentLimit:0}},activated:function(){this.$emit("on-load")},watch:{offset:{immediate:!0,handler:function(t){this.currentOffset=t}},limit:{immediate:!0,handler:function(t){this.currentLimit=parseInt(t)}},currentOffset:function(t,e){t!==e&&(this.current=t/this.limit+1,this.$emit("update:offset",t),this.$emit("on-load"))},currentLimit:function(t,e){t!==e&&(this.$emit("update:limit",t),this.$emit("on-load"))}},methods:{handlePageSizeChange:function(t){this.currentLimit=t},handleChange:function(t){this.currentOffset=(t-1)*this.currentLimit}}}},334:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(317),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);var i=o(335),l=o.n(i),s=o(4),u=s(r.a,l.a,!1,null,null,null);u.options.__file="src/views/my-components/pagination/index.vue",e.default=u.exports},335:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement;return(t._self._c||e)("Page",{attrs:{total:t.total,"page-size":t.currentLimit,"class-name":"pager",size:"small",current:t.current,"show-total":"","show-elevator":"","show-sizer":""},on:{"update:current":function(e){t.current=e},"on-page-size-change":t.handlePageSizeChange,"on-change":t.handleChange}})},r=[];n._withStripped=!0;var a={render:n,staticRenderFns:r};e.default=a},352:function(t,e,o){"use strict";function n(t){return O.default.post("/store/list",t)}function r(t){return O.default.post("/store/detail/"+t)}function a(t){return O.default.post("/store/del/"+t)}function i(t){return O.default.post("/store/add",t)}function l(t){return O.default.post("/store/edit",t)}function s(t){return O.default.post("/settle/profit/store/daily/collect/detail/"+t)}function u(t){return O.default.post("/settle/profit/agent/daily/collect",t)}function c(t){return O.default.post("/settle/profit/success/rate/list",t)}function d(t){return O.default.post("/settle/home/page/collect/merchant/top",t)}function f(t){return O.default.post("/settle/home/page/collect/agent/top",t)}function p(t){return O.default.post("/settle/home/page/collect/merchant/condition",t)}function m(t){return O.default.post("/settle/home/page/collect/agent/condition",t)}function h(t){return O.default.post("/settle/home/page/collect/merchant/top/more",t)}function g(t){return O.default.post("/settle/home/page/collect/agent/top/more",t)}function v(t){return O.default.post("/settle/home/page/collect/merchant/condition/list",t)}function _(t){return O.default.post("/settle/home/page/collect/agent/condition/list",t)}function y(t){return O.default.post("/settle/reconciliation/batch/list",t)}function b(t){return O.default.post("/settle/reconciliation/detail/list",t)}function x(t){return O.default.post("/meta/types/checking/result",t)}function M(t){return O.default.post("/meta/types/checking/file",t)}function k(t){return O.default.post("/settle/profit/operator/daily/collect",t)}function w(t){return O.default.post("/settle/profit/operator/daily/collect/detail/"+t,{})}function S(t){return O.default.post("/profit/merchant/list",t)}function L(t){var e=t.id?"/profit/merchant/update":"/profit/merchant/add";return O.default.post(e,t)}function P(t){return O.default.post("/profit/merchant/account/list",t)}function $(t){return O.default.post("/profit/merchant/delete/"+t)}function C(t){return O.default.post("/profit/merchant/xft/detail/"+t)}function F(t){return O.default.post("/profit/merchant/batch/enable",t)}function N(t){return O.default.post("/profit/merchant/batch/disable",t)}function A(t){return O.default.post("/profit/merchant/detail/list",t)}Object.defineProperty(e,"__esModule",{value:!0}),e.getStoreList=n,e.getStoreDetail=r,e.delStore=a,e.addStore=i,e.updateStore=l,e.getProfitStoreDetail=s,e.getProfitAgentList=u,e.getProfitRateList=c,e.getHomePageMerchantTop=d,e.getHomePageAgentTop=f,e.getHomePageMerchantCondition=p,e.getHomePageAgentCondition=m,e.getHomePageMerchantTopMore=h,e.getHomePageAgentTopMore=g,e.getHomePageMerchantTopList=v,e.getHomePageAgentTopList=_,e.getSeleleReconciliationList=y,e.getSeleleDetailList=b,e.getTypeCheckingResult=x,e.getTypeCheckingFile=M,e.getOperatorDailyList=k,e.getOperatorDailyDetail=w,e.getProfitMerchantList=S,e.addOrUpdateMerchantAccount=L,e.getMerchantAccountList=P,e.deleteAccountById=$,e.getAccountDetail=C,e.enableAccount=F,e.disableAccount=N,e.getMerchantFzDetail=A;var D=o(65),O=function(t){return t&&t.__esModule?t:{default:t}}(D)},509:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=o(334),a=n(r),i=o(352),l=o(65),s=o(11),u=n(s);e.default={name:"group-store",data:function(){var t=this;return{uploadConfig:{action:l.ApiUrl+"/sys/manager/export/in",headers:{Authorization:"Bearer "+u.default.get("token")}},uploadLoading:!1,exportModal:!1,loading:!1,columns:[{key:"storeNick",title:"商家昵称"},{key:"storeName",title:"商家账号"},{key:"createDate",title:"创建时间",width:160},{key:"phone",title:"电话号码"},{key:"storeStatus",title:"状态",render:function(t,e){return 0===e.row.storeStatus?t("div","正常"):1===e.row.storeStatus?t("div","禁用"):void 0}},{type:"action",title:"操作",width:200,render:function(e,o){return e("div",[e("Button",{props:{type:"text",size:"small"},on:{click:function(){t.$router.push({name:"group-store-edit",params:{id:o.row.id}})}}},"编辑"),e("Button",{props:{type:"text",size:"small"},style:{disabled:!0},on:{click:function(){t.$lf.confirm("是否确认删除该商户？",function(){var e=o.row,n=e.id;e.storeCode;(0,i.delStore)({id:n}).then(function(e){t.$lf.message("删除成功","success"),t.data.splice(o.index,1),t.loadData()})})}}},"删除")])}}],filter:{limit:10,offset:0,userName:"",phone:"",name:"",account:""},data:[],total:0}},methods:{showExportModal:function(){this.exportModal=!0},beforeUpload:function(){return this.uploadLoading=!0,!0},onFormatError:function(){this.$Notice.error({title:"错误提示",desc:"请上传.xls后缀文件"})},onSuccess:function(t,e,o){this.uploadLoading=!1,t.result?(this.$Notice.success({title:"上传提示",desc:"批量导入成功"}),this.loadData(),this.exportModal=!1):this.$Notice.error({title:"上传提示",desc:t.message})},onError:function(t,e,o){this.uploadLoading=!1,console.log(t)},downloadExcel:function(){this.$util.downloadExcel("/sys/manager/export/mould",{})},loadData:function(){var t=this;this.loading=!0,(0,i.getStoreList)(this.filter).then(function(e){t.loading=!1,t.data=e.data.data,t.total=e.data.total})},handleFilter:function(){this.filter.offset=0,this.loadData()}},activated:function(){this.uploadConfig={action:l.ApiUrl+"/sys/manager/export/in",headers:{Authorization:"Bearer "+u.default.get("token")}}},components:{pagination:a.default}}},853:function(t,e,o){var n=o(854);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(22)("b80a3ec0",n,!1)},854:function(t,e,o){e=t.exports=o(21)(!1),e.push([t.i,"",""])},855:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("Card",{staticClass:"filter-wrap"},[o("Form",{ref:"filterForm",attrs:{model:t.filter,"label-position":"right","label-width":120},nativeOn:{submit:function(e){e.preventDefault(),t.handleFilter(e)}}},[o("FormItem",{attrs:{label:"商户名称",prop:"userName"}},[o("Input",{attrs:{clearable:""},model:{value:t.filter.storeNick,callback:function(e){t.$set(t.filter,"storeNick",e)},expression:"filter.storeNick"}})],1),t._v(" "),o("FormItem",{attrs:{label:"商户账号",prop:"name"}},[o("Input",{attrs:{clearable:""},model:{value:t.filter.storeName,callback:function(e){t.$set(t.filter,"storeName",e)},expression:"filter.storeName"}})],1),t._v(" "),o("FormItem",{attrs:{label:"手机号",prop:"mobile"}},[o("Input",{attrs:{clearable:""},model:{value:t.filter.phone,callback:function(e){t.$set(t.filter,"phone",e)},expression:"filter.phone"}})],1),t._v(" "),o("FormItem",{staticClass:"submit"},[o("Button",{attrs:{type:"primary","html-type":"submit"}},[t._v("筛选")])],1)],1)],1),t._v(" "),o("div",{staticClass:"data-control"},[o("Button",{attrs:{type:"primary"},on:{click:function(e){t.$router.push({name:"group-store-add"})}}},[t._v("添加商户")]),t._v(" "),o("Button",{attrs:{type:"primary"},on:{click:t.showExportModal}},[t._v("批量导入")])],1),t._v(" "),o("Table",{attrs:{loading:t.loading,border:"",stripe:"",columns:t.columns,data:t.data}}),t._v(" "),o("pagination",{attrs:{total:t.total,limit:t.filter.limit,offset:t.filter.offset},on:{"update:limit":function(e){t.$set(t.filter,"limit",e)},"update:offset":function(e){t.$set(t.filter,"offset",e)},"on-load":t.loadData}}),t._v(" "),o("Modal",{attrs:{title:"导入"},model:{value:t.exportModal,callback:function(e){t.exportModal=e},expression:"exportModal"}},[o("div",[t.uploadLoading?o("Spin",{attrs:{fix:""}},[o("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"load-c",size:"18"}}),t._v(" "),o("div",[t._v("上传导入中...")])],1):t._e(),t._v(" "),o("Form",{attrs:{"label-position":"right","label-width":100}},[o("FormItem",{attrs:{label:"上传数据"}},[o("Upload",{attrs:{format:["xls"],action:t.uploadConfig.action,headers:t.uploadConfig.headers,"show-upload-list":!1,"before-upload":t.beforeUpload,"on-format-error":t.onFormatError,"on-success":t.onSuccess,"on-error":t.onError}},[o("Button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"}},[t._v("上传文件")])],1)],1),t._v(" "),o("FormItem",{attrs:{label:"数据模板"}},[o("Button",{attrs:{type:"primary"},on:{click:t.downloadExcel}},[t._v("下载")])],1)],1)],1),t._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"})])],1)},r=[];n._withStripped=!0;var a={render:n,staticRenderFns:r};e.default=a}});