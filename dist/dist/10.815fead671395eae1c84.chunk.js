webpackJsonp([10],{291:function(t,e,a){"use strict";function o(t){u||a(868)}Object.defineProperty(e,"__esModule",{value:!0});var n=a(515),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);var s=a(870),l=a.n(s),u=!1,c=a(4),d=o,f=c(i.a,l.a,!1,d,null,null);f.options.__file="src/views/sys/manager/index.vue",e.default=f.exports},327:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"pagination",props:{offset:{type:[String,Number],default:1},limit:{type:[String,Number],default:10},total:{type:[String,Number],default:0}},data:function(){return{current:1,data:[],currentOffset:0,currentLimit:0}},activated:function(){this.$emit("on-load")},watch:{offset:{immediate:!0,handler:function(t){this.currentOffset=t}},limit:{immediate:!0,handler:function(t){this.currentLimit=parseInt(t)}},currentOffset:function(t,e){t!==e&&(this.current=t/this.limit+1,this.$emit("update:offset",t),this.$emit("on-load"))},currentLimit:function(t,e){t!==e&&(this.$emit("update:limit",t),this.$emit("on-load"))}},methods:{handlePageSizeChange:function(t){this.currentLimit=t},handleChange:function(t){this.currentOffset=(t-1)*this.currentLimit}}}},355:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(327),n=a.n(o);for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);var r=a(356),s=a.n(r),l=a(4),u=l(n.a,s.a,!1,null,null,null);u.options.__file="src/views/my-components/pagination/index.vue",e.default=u.exports},356:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){var t=this,e=t.$createElement;return(t._self._c||e)("Page",{attrs:{total:t.total,"page-size":t.currentLimit,"class-name":"pager",size:"small",current:t.current,"show-total":"","show-elevator":"","show-sizer":""},on:{"update:current":function(e){t.current=e},"on-page-size-change":t.handlePageSizeChange,"on-change":t.handleChange}})},n=[];o._withStripped=!0;var i={render:o,staticRenderFns:n};e.default=i},515:function(t,e,a){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(355),i=o(n),r=a(65),s=a(66),l=a(11),u=o(l);e.default={name:"sys-user",data:function(){var t=this;return{uploadConfig:{action:s.ApiUrl+"/sys/manager/export/in",headers:{Authorization:"Bearer "+u.default.get("token")}},uploadLoading:!1,exportModal:!1,loading:!1,columns:[{key:"userName",title:"姓名"},{key:"account",title:"登录账号"},{key:"createDate",title:"创建时间",width:160},{key:"phone",title:"电话号码"},{key:"status",title:"状态",render:function(t,e){return 0===e.row.status?t("div","正常"):1===e.row.status?t("div","禁用"):void 0}},{type:"action",title:"操作",width:200,render:function(e,a){return e("div",[e("Button",{props:{type:"text",size:"small"},on:{click:function(){t.$router.push({name:"sys-manager-edit",params:{id:a.row.id}})}}},"编辑"),e("Button",{props:{type:"text",size:"small"},on:{click:function(){t.$lf.confirm("是否确认删除该操作员？",function(){var e=a.row,o=e.id,n=e.storeCode;(0,r.deleteManagerById)({id:o,status:2,storeCode:n}).then(function(e){t.$lf.message("删除成功","success"),t.data.splice(a.index,1),t.loadData()})})}}},"删除"),e("Button",{props:{type:"text",size:"small"},on:{click:function(){t.$lf.confirm("确认要密码重置吗？",function(){(0,r.resetManagerPwdById)(a.row.id).then(function(e){t.$lf.message("密码重置成功","success")})})}}},"重置密码")])}}],filter:{limit:10,offset:0,userName:"",phone:"",name:"",merchantName:"",storeName:"",agentName:""},data:[],total:0}},methods:{showExportModal:function(){this.exportModal=!0},beforeUpload:function(){return this.uploadLoading=!0,!0},onFormatError:function(){this.$Notice.error({title:"错误提示",desc:"请上传.xls后缀文件"})},onSuccess:function(t,e,a){this.uploadLoading=!1,t.result?(this.$Notice.success({title:"上传提示",desc:"批量导入成功"}),this.loadData(),this.exportModal=!1):this.$Notice.error({title:"上传提示",desc:t.message})},onError:function(t,e,a){this.uploadLoading=!1,console.log(t)},downloadExcel:function(){this.$util.downloadExcel("/sys/manager/export/mould",{})},loadData:function(){var t=this;this.loading=!0,(0,r.getManagers)(this.filter).then(function(e){t.loading=!1,t.data=e.data.data,t.total=e.data.total})},handleFilter:function(){this.filter.offset=0,this.loadData()}},activated:function(){this.uploadConfig={action:s.ApiUrl+"/sys/manager/export/in",headers:{Authorization:"Bearer "+u.default.get("token")}}},components:{pagination:i.default}}},868:function(t,e,a){var o=a(869);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(22)("30fc4881",o,!1)},869:function(t,e,a){e=t.exports=a(21)(!1),e.push([t.i,"",""])},870:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Card",{staticClass:"filter-wrap"},[a("Form",{ref:"filterForm",attrs:{model:t.filter,"label-position":"right","label-width":120},nativeOn:{submit:function(e){e.preventDefault(),t.handleFilter(e)}}},[a("FormItem",{attrs:{label:"登录账号",prop:"userName"}},[a("Input",{attrs:{clearable:""},model:{value:t.filter.userName,callback:function(e){t.$set(t.filter,"userName",e)},expression:"filter.userName"}})],1),t._v(" "),a("FormItem",{attrs:{label:"姓名",prop:"name"}},[a("Input",{attrs:{clearable:""},model:{value:t.filter.name,callback:function(e){t.$set(t.filter,"name",e)},expression:"filter.name"}})],1),t._v(" "),a("FormItem",{attrs:{label:"手机号",prop:"mobile"}},[a("Input",{attrs:{clearable:""},model:{value:t.filter.mobile,callback:function(e){t.$set(t.filter,"mobile",e)},expression:"filter.mobile"}})],1),t._v(" "),a("FormItem",{staticClass:"submit"},[a("Button",{attrs:{type:"primary","html-type":"submit"}},[t._v("筛选")])],1)],1)],1),t._v(" "),a("div",{staticClass:"data-control"},[a("Button",{attrs:{type:"primary"},on:{click:function(e){t.$router.push({name:"sys-manager-add"})}}},[t._v("新建用户")]),t._v(" "),a("Button",{attrs:{type:"primary"},on:{click:t.showExportModal}},[t._v("批量导入")])],1),t._v(" "),a("Table",{attrs:{loading:t.loading,border:"",stripe:"",columns:t.columns,data:t.data}}),t._v(" "),a("pagination",{attrs:{total:t.total,limit:t.filter.limit,offset:t.filter.offset},on:{"update:limit":function(e){t.$set(t.filter,"limit",e)},"update:offset":function(e){t.$set(t.filter,"offset",e)},"on-load":t.loadData}}),t._v(" "),a("Modal",{attrs:{title:"导入"},model:{value:t.exportModal,callback:function(e){t.exportModal=e},expression:"exportModal"}},[a("div",[t.uploadLoading?a("Spin",{attrs:{fix:""}},[a("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"load-c",size:"18"}}),t._v(" "),a("div",[t._v("上传导入中...")])],1):t._e(),t._v(" "),a("Form",{attrs:{"label-position":"right","label-width":100}},[a("FormItem",{attrs:{label:"上传数据"}},[a("Upload",{attrs:{format:["xls"],action:t.uploadConfig.action,headers:t.uploadConfig.headers,"show-upload-list":!1,"before-upload":t.beforeUpload,"on-format-error":t.onFormatError,"on-success":t.onSuccess,"on-error":t.onError}},[a("Button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"}},[t._v("上传文件")])],1)],1),t._v(" "),a("FormItem",{attrs:{label:"数据模板"}},[a("Button",{attrs:{type:"primary"},on:{click:t.downloadExcel}},[t._v("下载")])],1)],1)],1),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})])],1)},n=[];o._withStripped=!0;var i={render:o,staticRenderFns:n};e.default=i}});