webpackJsonp([7],{286:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(509),a=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,function(){return n[t]})}(o);var s=r(861),u=r.n(s),i=r(4),l=i(a.a,u.a,!1,null,null,null);l.options.__file="src/views/sys/manager/edit.vue",e.default=l.exports},310:function(t,e,r){"use strict";function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W;return J.default.post("/role/tree",t)}function a(){return J.default.post("/sys/menu/types")}function o(){return J.default.post("/menu/select/parent")}function s(t){var e="";return e=t?"/menu/tree/"+t:"/menu/tree",J.default.post(e)}function u(t){return J.default.post("/merchant/autocomplete",t)}function i(t){return J.default.post("/sys/customer/manager/autocomplete",t)}function l(t){return J.default.post("/agent/manager/autocomplete",t)}function c(t){return J.default.post("/agent/parent/list",t)}function d(t){return J.default.post("/meta/states/merchant",t)}function f(t){return J.default.post("/meta/types/business",t)}function p(t){return J.default.post("/meta/types/merchant",t)}function m(t){return J.default.post("/meta/mcc/list/"+t)}function g(){return J.default.post("/meta/types/certificate")}function h(t){return J.default.post("/meta/states/merchant/audit")}function v(t){return J.default.post("/meta/states/merchant",t)}function y(t){return J.default.post("/merchant/store/list",t)}function b(t){return J.default.post("/merchant/store/autocomplete",t)}function _(t){return J.default.post("/merchant/store/autocomplete",t)}function S(t){return J.default.post("/meta/types/agent",t)}function M(t){return J.default.post("/meta/bank/info/list",t)}function L(t){return J.default.post("/meta/states/agent/audit",t)}function w(t){return J.default.post("/meta/institution/product/all")}function I(t){return J.default.post("/meta/states/charge",t)}function $(t){return J.default.post("/meta/states/refund/type",t)}function k(t){return J.default.post("/meta/types/checking/batch",t)}function C(t){return J.default.post("/meta/states/checking/batch",t)}function P(t){return J.default.post("/meta/types/product",t)}function R(t){return J.default.post("/meta/states/charge",t)}function O(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return J.default.post("/meta/institution/list",t)}function A(t){return J.default.post("/meta/institution/product/list",t)}function x(t){return J.default.post("/merchant/autocomplete",t)}function q(t){return J.default.post("/merchant/store/autocomplete",t)}function F(t){return J.default.post("/merchant/store/operator/autocomplete",t)}function N(t){return J.default.post("/transaction/unify/create/qrcode",t)}function T(t){return J.default.post("/transaction/unify/save/qrcode",t)}function j(t){return J.default.post("/transaction/unify/list/qrcode",t)}function B(t){return J.default.post("/transaction/unify/delete/qrcode/"+t)}function D(t){return J.default.post("/merchant/device/query/StoreDevices",t)}function E(t){return J.default.post("/settle/transaction/export/task/list",t)}function z(){return J.default.post("/zb/admin/clear/institution/list")}function V(){return J.default.post("/meta/types/wallet/sub/account/type")}function Q(){return J.default.post("/meta/states/account/checking/file")}function G(t){return J.default.post("/zb/admin/account/auto/complete",t)}function U(t){return J.default.post("/zb/admin/agent/auto/complete",t)}Object.defineProperty(e,"__esModule",{value:!0}),e.getSysRoles=n,e.getSysMenuTypes=a,e.getSysMenuSelect=o,e.getSysMenuTree=s,e.getMechantSelectList=u,e.getCustomerManagerSelectList=i,e.getAgentManagerSelectList=l,e.getAgentSelectList=c,e.getMechantStatesSelectList=d,e.getBusinessTypesSelectList=f,e.getMerchantTypesSelectList=p,e.getBusinessCategorySelectList=m,e.getCertificateTypes=g,e.getMerchantAuditStates=h,e.getMerchantStatesList=v,e.getMerchantStoreSelectList=y,e.getCashierMerchantStoreList=b,e.getManagerMerchantStoreList=_,e.getAgentTypesList=S,e.getBankInfoList=M,e.getAgentAuditStatesList=L,e.getPayChannels=w,e.getOrderChargeStatus=I,e.getStatesRefundType=$,e.getCheckingBatchTypes=k,e.getCheckingBatchStates=C,e.getPayTypesList=P,e.getSettleStatesList=R,e.getInstitutionList=O,e.getInstitutionProductList=A,e.getMerchantListSelect=x,e.getStoreListSelect=q,e.getStoreOperatorListSelect=F,e.createQrcodeUrl=N,e.saveQrcodeRecord=T,e.getQrcodeRecordList=j,e.deleteQrcodeById=B,e.getPrinterList=D,e.getOrderTaskList=E,e.getInstitution=z,e.getWalletAccountType=V,e.getCheckingFile=Q,e.getAccountAutoComplete=G,e.getZbAdminAgenComplete=U;var Z=r(66),J=function(t){return t&&t.__esModule?t:{default:t}}(Z),W={limit:9999,offset:0}},316:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(310);e.default={name:"manager-role-selector",props:{value:{type:String,default:function(){return""}},isSingle:{type:Boolean,default:!1},name:"",disabled:{type:Boolean,default:!1}},inheritAttrs:!1,data:function(){return{currentValue:this.value,data:[]}},created:function(){this.getSysRoles()},methods:{getSysRoles:function(){var t=this;(0,n.getSysRoles)().then(function(e){t.data=e.data.map(function(t){return{value:t.id,label:t.roleName,disabled:1===t.status}})})},handleChange:function(t){console.log(t),this.$emit("input",t)}},watch:{value:function(t){this.currentValue=t}}}},334:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(316),a=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,function(){return n[t]})}(o);var s=r(335),u=r.n(s),i=r(4),l=i(a.a,u.a,!1,null,null,null);l.options.__file="src/views/my-components/manager-role-selector/index.vue",e.default=l.exports},335:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("RadioGroup",{attrs:{size:"small"},on:{"on-change":t.handleChange},model:{value:t.currentValue,callback:function(e){t.currentValue=e},expression:"currentValue"}},t._l(t.data,function(e){return r("Radio",{key:e.value,attrs:{disabled:e.disabled,label:e.value}},[t._v(t._s(e.label))])}))},a=[];n._withStripped=!0;var o={render:n,staticRenderFns:a};e.default=o},397:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.validateData=void 0;var n=r(398),a=function(t,e,r){e.length<6||e.length>18?r(new Error("请输入6-18位密码")):/^(?![^a-zA-Z]+$)(?!\D+$)/.test(e)?r():r(new Error("密码格式不正确"))};e.validateData={account:{required:!0,message:"请填写登录名称",trigger:"blur"},userName:{required:!0,message:"请填写员姓名",trigger:"blur"},phone:[{required:!0,message:"请填写手机号",trigger:"blur"},{validator:n.validePhone,trigger:"blur"}],certificateNo:[{required:!0,message:"请填写身份证号",trigger:"blur"},{validator:n.valideCertificateNo,trigger:"blur"}],password:[{required:!0,message:"请填写登录密码",trigger:"blur"},{validator:a,trigger:"blur"}],status:{required:!0,message:"请选择状态",trigger:"change"}}},398:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.valideCertificateNo=function(t,e,r){/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e)?r():r(new Error("请输入正确身份证号"))},e.validePhone=function(t,e,r){/^[1]\d{10}$/.test(e)?r():r(new Error("请输入正确手机号"))},e.valideEmail=function(t,e,r){/[\w!#$%&'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(e)?r():r(new Error("请输入正确邮箱"))}},509:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(334),a=function(t){return t&&t.__esModule?t:{default:t}}(n),o=r(65),s=r(66),u=r(397);e.default={name:"sys-manager-edit",data:function(){return{loading:!1,form:{userName:"",phone:"",password:"",_rePassword:"",name:"",certificateNo:"",status:1,roleId:"",roleIds:[]},rules:u.validateData,storeList:[]}},methods:{getManagerDetail:function(){var t=this,e=this.$route.params.id;e&&(0,o.getManagerDetail)(e).then(function(e){t.form=e.data;var r=e.data.roleId;t.form.roleIds=r})},submit:function(t){var e=this,r=this.$route.params.id;this.$refs.form.validate(function(t){if(t){e.loading=!0;var n=e.form;r&&(n.id=r),(0,o.addOrUpdateManager)(n).then(function(t){e.loading=!1,e.$refs.form.resetFields(),e.$lf.message("保存成功","success"),(0,s.closeCurrentErrPage)(e,"sys-user")},function(){e.loading=!1})}})}},activated:function(){this.getManagerDetail()},created:function(){},components:{managerRoleSelector:a.default}}},861:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[t._v("编辑用户")]),t._v(" "),r("Form",{ref:"form",staticStyle:{"max-width":"800px"},attrs:{method:"post",model:t.form,"label-width":120,"label-position":"right",rules:t.rules},nativeOn:{submit:function(e){e.preventDefault(),t.submit(e)}}},[r("FormItem",{attrs:{label:"登录账号",prop:"account"}},[r("span",[t._v(t._s(t.form.account))])]),t._v(" "),r("FormItem",{attrs:{label:"员工姓名",prop:"userName"}},[r("Input",{attrs:{placeholder:"员工姓名"},model:{value:t.form.userName,callback:function(e){t.$set(t.form,"userName",e)},expression:"form.userName"}})],1),t._v(" "),r("FormItem",{attrs:{label:"手机号码",prop:"phone"}},[r("Input",{attrs:{placeholder:"手机号码"},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1),t._v(" "),r("FormItem",{attrs:{label:"所属角色",prop:"roleIds"}},[r("manager-role-selector",{attrs:{isSingle:""},model:{value:t.form.roleIds,callback:function(e){t.$set(t.form,"roleIds",e)},expression:"form.roleIds"}})],1),t._v(" "),r("FormItem",{attrs:{label:"状态",prop:"state"}},[r("RadioGroup",{model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[r("Radio",{attrs:{label:0}},[t._v("启用")]),t._v(" "),r("Radio",{attrs:{label:1}},[t._v("冻结")])],1)],1),t._v(" "),r("FormItem",[r("Button",{attrs:{type:"primary",loading:t.loading,"html-type":"submit"}},[t._v("提交")])],1)],1)],1)},a=[];n._withStripped=!0;var o={render:n,staticRenderFns:a};e.default=o}});