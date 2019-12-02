webpackJsonp([3],{286:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(508),a=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);var o=n(858),s=n.n(o),l=n(4),i=l(a.a,s.a,!1,null,null,null);i.options.__file="src/views/sys/menu/add.vue",t.default=i.exports},309:function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z;return W.default.post("/role/tree",e)}function a(){return W.default.post("/sys/menu/types")}function u(){return W.default.post("/menu/select/parent")}function o(e){var t="";return t=e?"/menu/tree/"+e:"/menu/tree",W.default.post(t)}function s(e){return W.default.post("/merchant/autocomplete",e)}function l(e){return W.default.post("/sys/customer/manager/autocomplete",e)}function i(e){return W.default.post("/agent/manager/autocomplete",e)}function c(e){return W.default.post("/agent/parent/list",e)}function f(e){return W.default.post("/meta/states/merchant",e)}function d(e){return W.default.post("/meta/types/business",e)}function m(e){return W.default.post("/meta/types/merchant",e)}function p(e){return W.default.post("/meta/mcc/list/"+e)}function g(){return W.default.post("/meta/types/certificate")}function v(e){return W.default.post("/meta/states/merchant/audit")}function h(e){return W.default.post("/meta/states/merchant",e)}function y(e){return W.default.post("/merchant/store/list",e)}function _(e){return W.default.post("/merchant/store/autocomplete",e)}function b(e){return W.default.post("/merchant/store/autocomplete",e)}function S(e){return W.default.post("/meta/types/agent",e)}function I(e){return W.default.post("/meta/bank/info/list",e)}function M(e){return W.default.post("/meta/states/agent/audit",e)}function k(e){return W.default.post("/meta/institution/product/all")}function C(e){return W.default.post("/meta/states/charge",e)}function x(e){return W.default.post("/meta/states/refund/type",e)}function L(e){return W.default.post("/meta/types/checking/batch",e)}function F(e){return W.default.post("/meta/states/checking/batch",e)}function $(e){return W.default.post("/meta/types/product",e)}function O(e){return W.default.post("/meta/states/charge",e)}function w(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return W.default.post("/meta/institution/list",e)}function P(e){return W.default.post("/meta/institution/product/list",e)}function R(e){return W.default.post("/merchant/autocomplete",e)}function A(e){return W.default.post("/merchant/store/autocomplete",e)}function T(e){return W.default.post("/merchant/store/operator/autocomplete",e)}function V(e){return W.default.post("/transaction/unify/create/qrcode",e)}function j(e){return W.default.post("/transaction/unify/save/qrcode",e)}function q(e){return W.default.post("/transaction/unify/list/qrcode",e)}function B(e){return W.default.post("/transaction/unify/delete/qrcode/"+e)}function z(e){return W.default.post("/merchant/device/query/StoreDevices",e)}function N(e){return W.default.post("/settle/transaction/export/task/list",e)}function U(){return W.default.post("/zb/admin/clear/institution/list")}function E(){return W.default.post("/meta/types/wallet/sub/account/type")}function D(){return W.default.post("/meta/states/account/checking/file")}function Q(e){return W.default.post("/zb/admin/account/auto/complete",e)}function G(e){return W.default.post("/zb/admin/agent/auto/complete",e)}Object.defineProperty(t,"__esModule",{value:!0}),t.getSysRoles=r,t.getSysMenuTypes=a,t.getSysMenuSelect=u,t.getSysMenuTree=o,t.getMechantSelectList=s,t.getCustomerManagerSelectList=l,t.getAgentManagerSelectList=i,t.getAgentSelectList=c,t.getMechantStatesSelectList=f,t.getBusinessTypesSelectList=d,t.getMerchantTypesSelectList=m,t.getBusinessCategorySelectList=p,t.getCertificateTypes=g,t.getMerchantAuditStates=v,t.getMerchantStatesList=h,t.getMerchantStoreSelectList=y,t.getCashierMerchantStoreList=_,t.getManagerMerchantStoreList=b,t.getAgentTypesList=S,t.getBankInfoList=I,t.getAgentAuditStatesList=M,t.getPayChannels=k,t.getOrderChargeStatus=C,t.getStatesRefundType=x,t.getCheckingBatchTypes=L,t.getCheckingBatchStates=F,t.getPayTypesList=$,t.getSettleStatesList=O,t.getInstitutionList=w,t.getInstitutionProductList=P,t.getMerchantListSelect=R,t.getStoreListSelect=A,t.getStoreOperatorListSelect=T,t.createQrcodeUrl=V,t.saveQrcodeRecord=j,t.getQrcodeRecordList=q,t.deleteQrcodeById=B,t.getPrinterList=z,t.getOrderTaskList=N,t.getInstitution=U,t.getWalletAccountType=E,t.getCheckingFile=D,t.getAccountAutoComplete=Q,t.getZbAdminAgenComplete=G;var J=n(65),W=function(e){return e&&e.__esModule?e:{default:e}}(J),Z={limit:9999,offset:0}},314:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(309);t.default={name:"manager-role-selector",props:{value:{type:Array,default:function(){return[]}},isSingle:{type:Boolean,default:!1},name:"",disabled:{type:Boolean,default:!1}},inheritAttrs:!1,data:function(){return{currentValue:this.value,data:[]}},created:function(){this.getSysRoles()},methods:{getSysRoles:function(){var e=this;(0,r.getSysRoles)().then(function(t){e.data=t.data.map(function(e){return{value:e.roleId,label:e.roleName}})})},handleChange:function(e){this.isSingle&&e.length&&(e=[e[e.length-1]]),this.$emit("input",e)}},watch:{value:function(e){this.currentValue=e}}}},333:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(314),a=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);var o=n(334),s=n.n(o),l=n(4),i=l(a.a,s.a,!1,null,null,null);i.options.__file="src/views/my-components/manager-role-selector/index.vue",t.default=i.exports},334:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("CheckboxGroup",{attrs:{size:"small"},on:{"on-change":e.handleChange},model:{value:e.currentValue,callback:function(t){e.currentValue=t},expression:"currentValue"}},e._l(e.data,function(t){return n("Checkbox",{key:t.value,attrs:{disabled:e.disabled,label:t.value}},[e._v(e._s(t.label))])}))},a=[];r._withStripped=!0;var u={render:r,staticRenderFns:a};t.default=u},351:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(309);t.default={name:"salesman-selector",props:{value:{type:String,default:""}},data:function(){return{currentValue:this.value,data:[]}},created:function(){this.getSysMenuSelect()},methods:{handleChange:function(e){this.$emit("input",e)},getSysMenuSelect:function(){var e=this;(0,r.getSysMenuSelect)().then(function(t){e.data=t.data,console.log(e.data)})}},watch:{value:function(e){this.currentValue=e}}}},398:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(351),a=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);var o=n(399),s=n.n(o),l=n(4),i=l(a.a,s.a,!1,null,null,null);i.options.__file="src/views/my-components/menu-selector/index.vue",t.default=i.exports},399:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Select",e._b({attrs:{placeholder:"无父级菜单",clearable:""},on:{"on-change":e.handleChange},model:{value:e.currentValue,callback:function(t){e.currentValue=t},expression:"currentValue"}},"Select",e.$attrs,!1),e._l(e.data,function(t){return n("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.menuName))])}))},a=[];r._withStripped=!0;var u={render:r,staticRenderFns:a};t.default=u},400:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.validateData={types:{required:!0,message:"请选择菜单类别",trigger:"blur"},menuCode:{required:!0,message:"请选择菜单编码",trigger:"blur"},menuName:{required:!0,message:"请选择菜单名称",trigger:"blur"},menuUrl:{required:!0,message:"请选择菜单URL",trigger:"blur"},sort:{required:!0,message:"请选择菜单排序",trigger:"blur"}}},508:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(333),u=r(a),o=n(398),s=r(o),l=n(856),i=r(l),c=n(112),f=n(400),d=n(65),m={code:"",name:"",image:"",url:"",types:"1",rank:"1",parentId:"",roleIds:[]};t.default={name:"sys-menu-add",data:function(){return{loading:!1,form:m,rules:f.validateData}},methods:{handlerFunctionAdd:function(){this.form.functions.push({code:"",name:""})},handlerFunctionRemove:function(e){var t=this;this.form.functions[e].name&&this.form.functions[e].code?this.$lf.confirm("确认要删除吗？",function(){t.form.functions.splice(e,1)}):this.form.functions.splice(e,1)},submit:function(e){var t=this;this.$refs.form.validate(function(e){if(e){t.loading=!0;var n=t.form;(0,c.addOrUpdateMenu)(n).then(function(e){t.loading=!1,t.$refs.form.resetFields(),t.$lf.message("添加成功","success"),(0,d.closeCurrentErrPage)(t,"sys-menu")},function(){t.loading=!1})}})}},components:{managerRoleSelector:u.default,menuSelector:s.default,menuTypeSelector:i.default}}},509:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(309);t.default={name:"menu-type-selector",props:{value:{type:[String,Number],default:""}},data:function(){return{currentValue:this.value,data:[]}},created:function(){this.getSysMenuTypes()},methods:{handleChange:function(e){this.$emit("input",e)},getSysMenuTypes:function(){var e=this;(0,r.getSysMenuTypes)().then(function(t){e.data=t.data.map(function(e){return{value:e.id,label:e.menuName}})})}},watch:{value:function(e){this.currentValue=e}}}},856:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(509),a=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);var o=n(857),s=n.n(o),l=n(4),i=l(a.a,s.a,!1,null,null,null);i.options.__file="src/views/my-components/menu-type-selector/index.vue",t.default=i.exports},857:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Select",e._b({on:{"on-change":e.handleChange},model:{value:e.currentValue,callback:function(t){e.currentValue=t},expression:"currentValue"}},"Select",e.$attrs,!1),e._l(e.data,function(t){return n("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}))},a=[];r._withStripped=!0;var u={render:r,staticRenderFns:a};t.default=u},858:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[e._v("\n        新增菜单\n    ")]),e._v(" "),n("Form",{ref:"form",staticStyle:{"max-width":"800px"},attrs:{method:"post",model:e.form,"label-width":120,"label-position":"right",rules:e.rules},nativeOn:{submit:function(t){t.preventDefault(),e.submit(t)}}},[n("FormItem",{attrs:{label:"菜单编码",prop:"coe"}},[n("Input",{model:{value:e.form.menuCode,callback:function(t){e.$set(e.form,"menuCode",t)},expression:"form.menuCode"}})],1),e._v(" "),n("FormItem",{attrs:{label:"菜单名称",prop:"nme"}},[n("Input",{model:{value:e.form.menuName,callback:function(t){e.$set(e.form,"menuName",t)},expression:"form.menuName"}})],1),e._v(" "),n("FormItem",{attrs:{label:"图标",prop:"imag"}},[n("Input",{model:{value:e.form.menuIco,callback:function(t){e.$set(e.form,"menuIco",t)},expression:"form.menuIco"}},[n("Icon",{attrs:{slot:"append",type:e.form.menuIco},slot:"append"})],1)],1),e._v(" "),n("FormItem",{attrs:{label:"父菜单名称",prop:"arentId"}},[n("menu-selector",{model:{value:e.form.parentId,callback:function(t){e.$set(e.form,"parentId",t)},expression:"form.parentId"}})],1),e._v(" "),n("FormItem",{attrs:{label:"菜单URL",prop:"ur"}},[n("Input",{model:{value:e.form.menuUrl,callback:function(t){e.$set(e.form,"menuUrl",t)},expression:"form.menuUrl"}})],1),e._v(" "),n("FormItem",{attrs:{label:"菜单排序",prop:"ank"}},[n("Input",{model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",t)},expression:"form.sort"}})],1),e._v(" "),n("FormItem",{style:{width:"450px"},attrs:{label:"功能按钮"}},[e._l(e.form.functions,function(t,r){return e.form.functions.length>0?n("Row",{key:r},[n("Col",{attrs:{span:"9"}},[n("FormItem",{attrs:{prop:"functions["+r+"].name",rules:{required:!0,trigger:"blur"},"show-message":!1}},[n("Input",{attrs:{type:"text",size:"small",placeholder:"功能说明..."},model:{value:t.name,callback:function(n){e.$set(t,"name","string"==typeof n?n.trim():n)},expression:"fun.name"}})],1)],1),e._v(" "),n("Col",{attrs:{span:"9",offset:"1"}},[n("FormItem",{attrs:{prop:"functions["+r+"].code",rules:{required:!0,trigger:"blur"},"show-message":!1}},[n("Input",{attrs:{type:"text",size:"small",placeholder:"功能编码（字母、-）"},model:{value:t.code,callback:function(n){e.$set(t,"code","string"==typeof n?n.trim():n)},expression:"fun.code"}})],1)],1),e._v(" "),n("Col",{attrs:{span:"4",offset:"1"}},[n("Button",{attrs:{type:"ghost",size:"small"},on:{click:function(t){e.handlerFunctionRemove(r)}}},[e._v("删除")])],1)],1):e._e()}),e._v(" "),n("Row",[n("Col",{attrs:{span:"24"}},[n("Button",{attrs:{size:"small",type:"primary",icon:"plus-round"},on:{click:e.handlerFunctionAdd}},[e._v("新增功能")])],1)],1)],2),e._v(" "),n("FormItem",{attrs:{label:"分配给角色",prop:"roleIds"}},[n("manager-role-selector",{model:{value:e.form.roleIds,callback:function(t){e.$set(e.form,"roleIds",t)},expression:"form.roleIds"}})],1),e._v(" "),n("FormItem",[n("Button",{attrs:{type:"primary",loading:e.loading,"html-type":"submit"}},[e._v("提交")])],1)],1)],1)},a=[];r._withStripped=!0;var u={render:r,staticRenderFns:a};t.default=u}});