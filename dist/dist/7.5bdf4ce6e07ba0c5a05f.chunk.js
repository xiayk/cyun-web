webpackJsonp([7],{283:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(508),a=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,function(){return n[t]})}(o);var s=r(855),u=r.n(s),i=r(4),l=i(a.a,u.a,!1,null,null,null);l.options.__file="src/views/sys/manager/edit.vue",e.default=l.exports},307:function(t,e,r){"use strict";function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W;return J.default.post("/role/tree",t)}function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W;return J.default.post("/sys/menu/types",t)}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W;return J.default.post("/sys/menu/select",t)}function s(t){var e="";return e=t?"/menu/tree/"+t:"/menu/tree",J.default.post(e)}function u(t){return J.default.post("/merchant/autocomplete",t)}function i(t){return J.default.post("/sys/customer/manager/autocomplete",t)}function l(t){return J.default.post("/agent/manager/autocomplete",t)}function c(t){return J.default.post("/agent/parent/list",t)}function d(t){return J.default.post("/meta/states/merchant",t)}function f(t){return J.default.post("/meta/types/business",t)}function m(t){return J.default.post("/meta/types/merchant",t)}function p(t){return J.default.post("/meta/mcc/list/"+t)}function g(){return J.default.post("/meta/types/certificate")}function h(t){return J.default.post("/meta/states/merchant/audit")}function v(t){return J.default.post("/meta/states/merchant",t)}function b(t){return J.default.post("/merchant/store/list",t)}function y(t){return J.default.post("/merchant/store/autocomplete",t)}function _(t){return J.default.post("/merchant/store/autocomplete",t)}function S(t){return J.default.post("/meta/types/agent",t)}function L(t){return J.default.post("/meta/bank/info/list",t)}function M(t){return J.default.post("/meta/states/agent/audit",t)}function k(t){return J.default.post("/meta/institution/product/all")}function w(t){return J.default.post("/meta/states/charge",t)}function C(t){return J.default.post("/meta/states/refund/type",t)}function $(t){return J.default.post("/meta/types/checking/batch",t)}function I(t){return J.default.post("/meta/states/checking/batch",t)}function x(t){return J.default.post("/meta/types/product",t)}function N(t){return J.default.post("/meta/states/charge",t)}function P(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return J.default.post("/meta/institution/list",t)}function A(t){return J.default.post("/meta/institution/product/list",t)}function O(t){return J.default.post("/merchant/autocomplete",t)}function R(t){return J.default.post("/merchant/store/autocomplete",t)}function F(t){return J.default.post("/merchant/store/operator/autocomplete",t)}function q(t){return J.default.post("/transaction/unify/create/qrcode",t)}function T(t){return J.default.post("/transaction/unify/save/qrcode",t)}function j(t){return J.default.post("/transaction/unify/list/qrcode",t)}function B(t){return J.default.post("/transaction/unify/delete/qrcode/"+t)}function D(t){return J.default.post("/merchant/device/query/StoreDevices",t)}function E(t){return J.default.post("/settle/transaction/export/task/list",t)}function z(){return J.default.post("/zb/admin/clear/institution/list")}function V(){return J.default.post("/meta/types/wallet/sub/account/type")}function Q(){return J.default.post("/meta/states/account/checking/file")}function G(t){return J.default.post("/zb/admin/account/auto/complete",t)}function U(t){return J.default.post("/zb/admin/agent/auto/complete",t)}Object.defineProperty(e,"__esModule",{value:!0}),e.getSysRoles=n,e.getSysMenuTypes=a,e.getSysMenuSelect=o,e.getSysMenuTree=s,e.getMechantSelectList=u,e.getCustomerManagerSelectList=i,e.getAgentManagerSelectList=l,e.getAgentSelectList=c,e.getMechantStatesSelectList=d,e.getBusinessTypesSelectList=f,e.getMerchantTypesSelectList=m,e.getBusinessCategorySelectList=p,e.getCertificateTypes=g,e.getMerchantAuditStates=h,e.getMerchantStatesList=v,e.getMerchantStoreSelectList=b,e.getCashierMerchantStoreList=y,e.getManagerMerchantStoreList=_,e.getAgentTypesList=S,e.getBankInfoList=L,e.getAgentAuditStatesList=M,e.getPayChannels=k,e.getOrderChargeStatus=w,e.getStatesRefundType=C,e.getCheckingBatchTypes=$,e.getCheckingBatchStates=I,e.getPayTypesList=x,e.getSettleStatesList=N,e.getInstitutionList=P,e.getInstitutionProductList=A,e.getMerchantListSelect=O,e.getStoreListSelect=R,e.getStoreOperatorListSelect=F,e.createQrcodeUrl=q,e.saveQrcodeRecord=T,e.getQrcodeRecordList=j,e.deleteQrcodeById=B,e.getPrinterList=D,e.getOrderTaskList=E,e.getInstitution=z,e.getWalletAccountType=V,e.getCheckingFile=Q,e.getAccountAutoComplete=G,e.getZbAdminAgenComplete=U;var Z=r(65),J=function(t){return t&&t.__esModule?t:{default:t}}(Z),W={limit:9999,offset:0}},312:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(307);e.default={name:"manager-role-selector",props:{value:{type:Array,default:function(){return[]}},isSingle:{type:Boolean,default:!1},name:"",disabled:{type:Boolean,default:!1}},inheritAttrs:!1,data:function(){return{currentValue:this.value,data:[]}},created:function(){this.getSysRoles()},methods:{getSysRoles:function(){var t=this;(0,n.getSysRoles)().then(function(e){t.data=e.data.map(function(t){return{value:t.roleId,label:t.roleName}})})},handleChange:function(t){this.isSingle&&t.length&&(t=[t[t.length-1]]),this.$emit("input",t)}},watch:{value:function(t){this.currentValue=t}}}},331:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(312),a=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,function(){return n[t]})}(o);var s=r(332),u=r.n(s),i=r(4),l=i(a.a,u.a,!1,null,null,null);l.options.__file="src/views/my-components/manager-role-selector/index.vue",e.default=l.exports},332:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("CheckboxGroup",{attrs:{size:"small"},on:{"on-change":t.handleChange},model:{value:t.currentValue,callback:function(e){t.currentValue=e},expression:"currentValue"}},t._l(t.data,function(e){return r("Checkbox",{key:e.value,attrs:{disabled:t.disabled,label:e.value}},[t._v(t._s(e.label))])}))},a=[];n._withStripped=!0;var o={render:n,staticRenderFns:a};e.default=o},395:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.validateData=void 0;var n=r(396),a=function(t,e,r){e.length<6||e.length>18?r(new Error("请输入6-18位密码")):/^(?![^a-zA-Z]+$)(?!\D+$)/.test(e)?r():r(new Error("密码格式不正确"))};e.validateData={userName:{required:!0,message:"请填写登录名称",trigger:"blur"},nickName:{required:!0,message:"请填写员姓名",trigger:"blur"},phone:[{required:!0,message:"请填写手机号",trigger:"blur"},{validator:n.validePhone,trigger:"blur"}],certificateNo:[{required:!0,message:"请填写身份证号",trigger:"blur"},{validator:n.valideCertificateNo,trigger:"blur"}],password:[{required:!0,message:"请填写登录密码",trigger:"blur"},{validator:a,trigger:"blur"}],status:{required:!0,message:"请选择状态",trigger:"change"}}},396:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.valideCertificateNo=function(t,e,r){/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e)?r():r(new Error("请输入正确身份证号"))},e.validePhone=function(t,e,r){/^[1]\d{10}$/.test(e)?r():r(new Error("请输入正确手机号"))},e.valideEmail=function(t,e,r){/[\w!#$%&'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(e)?r():r(new Error("请输入正确邮箱"))}},508:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(331),a=function(t){return t&&t.__esModule?t:{default:t}}(n),o=r(112),s=r(65),u=r(395);e.default={name:"sys-manager-edit",data:function(){return{loading:!1,form:{userName:"",phone:"",password:"",_rePassword:"",name:"",certificateNo:"",state:1,roleIds:[],storeCodes:[]},rules:u.validateData,storeList:[]}},methods:{getManagerDetail:function(){var t=this,e=this.$route.params.id;e&&(0,o.getManagerDetail)(e).then(function(e){t.form=e.data})},submit:function(t){var e=this,r=this.$route.params.id;this.$refs.form.validate(function(t){if(t){e.loading=!0;var n=e.form;r&&(n.id=r),(0,o.addOrUpdateManager)(n).then(function(t){e.loading=!1,e.$refs.form.resetFields(),e.$lf.message("保存成功","success"),(0,s.closeCurrentErrPage)(e,"sys-manager")},function(){e.loading=!1})}})}},activated:function(){var t=this;this.getManagerDetail(),(0,o.getNowStoreList)().then(function(e){t.storeList=e.data})},created:function(){var t=this;(0,o.getNowStoreList)().then(function(e){t.storeList=e.data})},components:{managerRoleSelector:a.default}}},855:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[t._v("编辑操作员")]),t._v(" "),r("Form",{ref:"form",staticStyle:{"max-width":"800px"},attrs:{method:"post",model:t.form,"label-width":120,"label-position":"right",rules:t.rules},nativeOn:{submit:function(e){e.preventDefault(),t.submit(e)}}},[r("FormItem",{attrs:{label:"登录账号",prop:"userName"}},[r("span",[t._v(t._s(t.form.userName))])]),t._v(" "),r("FormItem",{attrs:{label:"员工姓名",prop:"nickName"}},[r("Input",{attrs:{placeholder:"员工姓名"},model:{value:t.form.nickName,callback:function(e){t.$set(t.form,"nickName",e)},expression:"form.nickName"}})],1),t._v(" "),r("FormItem",{attrs:{label:"手机号码",prop:"mobile"}},[r("Input",{attrs:{placeholder:"手机号码"},model:{value:t.form.mobile,callback:function(e){t.$set(t.form,"mobile",e)},expression:"form.mobile"}})],1),t._v(" "),r("FormItem",{attrs:{label:"所属角色",prop:"roleIds"}},[r("manager-role-selector",{attrs:{isSingle:""},model:{value:t.form.roleIds,callback:function(e){t.$set(t.form,"roleIds",e)},expression:"form.roleIds"}})],1),t._v(" "),t.storeList.length?r("FormItem",{attrs:{label:"所属门店"}},[r("CheckboxGroup",{attrs:{size:"small"},model:{value:t.form.storeCodes,callback:function(e){t.$set(t.form,"storeCodes",e)},expression:"form.storeCodes"}},t._l(t.storeList,function(e){return r("Checkbox",{key:e.value,attrs:{label:e.code}},[t._v(t._s(e.storeName))])}))],1):t._e(),t._v(" "),r("FormItem",{attrs:{label:"状态",prop:"state"}},[r("RadioGroup",{model:{value:t.form.state,callback:function(e){t.$set(t.form,"state",e)},expression:"form.state"}},[r("Radio",{attrs:{label:"-1"}},[t._v("冻结")]),t._v(" "),r("Radio",{attrs:{label:"1"}},[t._v("启用")])],1)],1),t._v(" "),r("FormItem",[r("Button",{attrs:{type:"primary",loading:t.loading,"html-type":"submit"}},[t._v("提交")])],1)],1)],1)},a=[];n._withStripped=!0;var o={render:n,staticRenderFns:a};e.default=o}});