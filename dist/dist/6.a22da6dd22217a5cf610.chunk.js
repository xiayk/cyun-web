webpackJsonp([6],{285:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(508),n=r.n(a);for(var o in a)"default"!==o&&function(e){r.d(t,e,function(){return a[e]})}(o);var s=r(860),u=r.n(s),l=r(4),i=l(n.a,u.a,!1,null,null,null);i.options.__file="src/views/sys/manager/add.vue",t.default=i.exports},310:function(e,t,r){"use strict";function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W;return J.default.post("/role/tree",e)}function n(){return J.default.post("/sys/menu/types")}function o(){return J.default.post("/menu/select/parent")}function s(e){var t="";return t=e?"/menu/tree/"+e:"/menu/tree",J.default.post(t)}function u(e){return J.default.post("/merchant/autocomplete",e)}function l(e){return J.default.post("/sys/customer/manager/autocomplete",e)}function i(e){return J.default.post("/agent/manager/autocomplete",e)}function c(e){return J.default.post("/agent/parent/list",e)}function d(e){return J.default.post("/meta/states/merchant",e)}function f(e){return J.default.post("/meta/types/business",e)}function p(e){return J.default.post("/meta/types/merchant",e)}function m(e){return J.default.post("/meta/mcc/list/"+e)}function g(){return J.default.post("/meta/types/certificate")}function v(e){return J.default.post("/meta/states/merchant/audit")}function h(e){return J.default.post("/meta/states/merchant",e)}function b(e){return J.default.post("/merchant/store/list",e)}function y(e){return J.default.post("/merchant/store/autocomplete",e)}function _(e){return J.default.post("/merchant/store/autocomplete",e)}function S(e){return J.default.post("/meta/types/agent",e)}function w(e){return J.default.post("/meta/bank/info/list",e)}function M(e){return J.default.post("/meta/states/agent/audit",e)}function I(e){return J.default.post("/meta/institution/product/all")}function L(e){return J.default.post("/meta/states/charge",e)}function k(e){return J.default.post("/meta/states/refund/type",e)}function P(e){return J.default.post("/meta/types/checking/batch",e)}function C(e){return J.default.post("/meta/states/checking/batch",e)}function $(e){return J.default.post("/meta/types/product",e)}function x(e){return J.default.post("/meta/states/charge",e)}function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return J.default.post("/meta/institution/list",e)}function R(e){return J.default.post("/meta/institution/product/list",e)}function A(e){return J.default.post("/merchant/autocomplete",e)}function F(e){return J.default.post("/merchant/store/autocomplete",e)}function q(e){return J.default.post("/merchant/store/operator/autocomplete",e)}function T(e){return J.default.post("/transaction/unify/create/qrcode",e)}function j(e){return J.default.post("/transaction/unify/save/qrcode",e)}function E(e){return J.default.post("/transaction/unify/list/qrcode",e)}function N(e){return J.default.post("/transaction/unify/delete/qrcode/"+e)}function B(e){return J.default.post("/merchant/device/query/StoreDevices",e)}function V(e){return J.default.post("/settle/transaction/export/task/list",e)}function z(){return J.default.post("/zb/admin/clear/institution/list")}function D(){return J.default.post("/meta/types/wallet/sub/account/type")}function Q(){return J.default.post("/meta/states/account/checking/file")}function G(e){return J.default.post("/zb/admin/account/auto/complete",e)}function U(e){return J.default.post("/zb/admin/agent/auto/complete",e)}Object.defineProperty(t,"__esModule",{value:!0}),t.getSysRoles=a,t.getSysMenuTypes=n,t.getSysMenuSelect=o,t.getSysMenuTree=s,t.getMechantSelectList=u,t.getCustomerManagerSelectList=l,t.getAgentManagerSelectList=i,t.getAgentSelectList=c,t.getMechantStatesSelectList=d,t.getBusinessTypesSelectList=f,t.getMerchantTypesSelectList=p,t.getBusinessCategorySelectList=m,t.getCertificateTypes=g,t.getMerchantAuditStates=v,t.getMerchantStatesList=h,t.getMerchantStoreSelectList=b,t.getCashierMerchantStoreList=y,t.getManagerMerchantStoreList=_,t.getAgentTypesList=S,t.getBankInfoList=w,t.getAgentAuditStatesList=M,t.getPayChannels=I,t.getOrderChargeStatus=L,t.getStatesRefundType=k,t.getCheckingBatchTypes=P,t.getCheckingBatchStates=C,t.getPayTypesList=$,t.getSettleStatesList=x,t.getInstitutionList=O,t.getInstitutionProductList=R,t.getMerchantListSelect=A,t.getStoreListSelect=F,t.getStoreOperatorListSelect=q,t.createQrcodeUrl=T,t.saveQrcodeRecord=j,t.getQrcodeRecordList=E,t.deleteQrcodeById=N,t.getPrinterList=B,t.getOrderTaskList=V,t.getInstitution=z,t.getWalletAccountType=D,t.getCheckingFile=Q,t.getAccountAutoComplete=G,t.getZbAdminAgenComplete=U;var Z=r(66),J=function(e){return e&&e.__esModule?e:{default:e}}(Z),W={limit:9999,offset:0}},315:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(310);t.default={name:"manager-role-selector",props:{value:{type:Array,default:function(){return[]}},isSingle:{type:Boolean,default:!1},name:"",disabled:{type:Boolean,default:!1}},inheritAttrs:!1,data:function(){return{currentValue:this.value,data:[]}},created:function(){this.getSysRoles()},methods:{getSysRoles:function(){var e=this;(0,a.getSysRoles)().then(function(t){e.data=t.data.map(function(e){return{value:e.id,label:e.roleName,disabled:1===e.status}})}),console.log(this,"123131231")},handleChange:function(e){console.log(e,1),this.$emit("input",e)}},watch:{value:function(e){this.currentValue=e},isSingle:function(e,t){}}}},334:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(315),n=r.n(a);for(var o in a)"default"!==o&&function(e){r.d(t,e,function(){return a[e]})}(o);var s=r(335),u=r.n(s),l=r(4),i=l(n.a,u.a,!1,null,null,null);i.options.__file="src/views/my-components/manager-role-selector/index.vue",t.default=i.exports},335:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.isSingle?r("CheckboxGroup",{attrs:{size:"small"},on:{"on-change":e.handleChange},model:{value:e.currentValue,callback:function(t){e.currentValue=t},expression:"currentValue"}},e._l(e.data,function(t){return r("Checkbox",{key:t.value,attrs:{disabled:t.disabled,label:t.value}},[e._v(e._s(t.label))])})):r("RadioGroup",{attrs:{size:"small"},on:{"on-change":e.handleChange},model:{value:e.currentValue,callback:function(t){e.currentValue=t},expression:"currentValue"}},e._l(e.data,function(t){return r("Radio",{key:t.value,attrs:{disabled:t.disabled,label:t.value}},[e._v(e._s(t.label))])}))],1)},n=[];a._withStripped=!0;var o={render:a,staticRenderFns:n};t.default=o},397:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validateData=void 0;var a=r(398),n=function(e,t,r){t.length<6||t.length>18?r(new Error("请输入6-18位密码")):/^(?![^a-zA-Z]+$)(?!\D+$)/.test(t)?r():r(new Error("密码格式不正确"))};t.validateData={account:{required:!0,message:"请填写登录名称",trigger:"blur"},userName:{required:!0,message:"请填写员姓名",trigger:"blur"},phone:[{required:!0,message:"请填写手机号",trigger:"blur"},{validator:a.validePhone,trigger:"blur"}],certificateNo:[{required:!0,message:"请填写身份证号",trigger:"blur"},{validator:a.valideCertificateNo,trigger:"blur"}],password:[{required:!0,message:"请填写登录密码",trigger:"blur"},{validator:n,trigger:"blur"}],status:{required:!0,message:"请选择状态",trigger:"change"}}},398:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.valideCertificateNo=function(e,t,r){/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(t)?r():r(new Error("请输入正确身份证号"))},t.validePhone=function(e,t,r){/^[1]\d{10}$/.test(t)?r():r(new Error("请输入正确手机号"))},t.valideEmail=function(e,t,r){/[\w!#$%&'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(t)?r():r(new Error("请输入正确邮箱"))}},508:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(859),o=a(n),s=r(334),u=a(s),l=r(65),i=r(66),c=r(397);t.default={name:"sys-manager-add",data:function(){var e=this,t=function(t,r,a){r!==e.form.password?a(new Error("两次输入密码不一致")):a()};return{loading:!1,form:{userName:"",account:"",password:"",repeatPassword:"",status:0,roleId:"",storeCodes:[]},storeList:[],rules:(0,o.default)({},c.validateData,{repeatPassword:[{required:!0,message:"请填写确认密码",trigger:"blur"},{validator:t,trigger:"blur"}]})}},methods:{submit:function(e){var t=this;this.$refs.form.validate(function(e){if(e){t.loading=!0;var r=t.form;r.roleId=r.roleId||r.roleIds[0],(0,l.addOrUpdateManager)(r).then(function(e){t.loading=!1,t.$refs.form.resetFields(),t.$lf.message("保存成功","success"),(0,i.closeCurrentErrPage)(t,"sys-user")},function(){t.loading=!1})}})}},components:{managerRoleSelector:u.default}}},859:function(e,t,r){"use strict";t.__esModule=!0;var a=r(32),n=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=n.default||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}},860:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[e._v("新增用户")]),e._v(" "),r("Form",{ref:"form",staticStyle:{"max-width":"800px"},attrs:{method:"post",model:e.form,"label-width":120,"label-position":"right",rules:e.rules},nativeOn:{submit:function(t){t.preventDefault(),e.submit(t)}}},[r("FormItem",{attrs:{label:"登录账号",prop:"account"}},[r("Input",{attrs:{placeholder:"登录账号"},model:{value:e.form.account,callback:function(t){e.$set(e.form,"account",t)},expression:"form.account"}})],1),e._v(" "),r("FormItem",{attrs:{label:"登录密码",prop:"password"}},[r("Input",{attrs:{type:"password",placeholder:"请输入6-18位字符和字母组合的密码"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),r("FormItem",{attrs:{label:"确认密码",prop:"repeatPassword"}},[r("Input",{attrs:{type:"password",placeholder:"请再次输入密码"},model:{value:e.form.repeatPassword,callback:function(t){e.$set(e.form,"repeatPassword",t)},expression:"form.repeatPassword"}})],1),e._v(" "),r("FormItem",{attrs:{label:"姓名",prop:"userName"}},[r("Input",{attrs:{placeholder:"姓名"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),e._v(" "),r("FormItem",{attrs:{label:"手机号码",prop:"phone"}},[r("Input",{attrs:{placeholder:"手机号码"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),e._v(" "),r("FormItem",{attrs:{label:"所属角色",prop:"roleIds"}},[r("manager-role-selector",{model:{value:e.form.roleId,callback:function(t){e.$set(e.form,"roleId",t)},expression:"form.roleId"}})],1),e._v(" "),r("FormItem",{attrs:{label:"状态",prop:"status"}},[r("RadioGroup",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[r("Radio",{attrs:{label:"1"}},[e._v("禁用")]),e._v(" "),r("Radio",{attrs:{label:"0"}},[e._v("启用")])],1)],1),e._v(" "),r("FormItem",[r("Button",{attrs:{type:"primary",loading:e.loading,"html-type":"submit"}},[e._v("提交")])],1)],1)],1)},n=[];a._withStripped=!0;var o={render:a,staticRenderFns:n};t.default=o}});