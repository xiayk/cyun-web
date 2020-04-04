<template>
    <Tree :data="data" @on-check-change="handleCheck" ref="tree" show-checkbox></Tree>
</template>
<script>
import { getSysMenuTree } from "@/actions/selector";
export default {
    name: "menu-tree-selector",
    props: {
        roleId: {
            type: [String, Number],
            default: ""
        },
        menuIds: {
            type: Array,
            default: () => {
                return [];
            }
        },
        functionIds: {
            type: Array,
            default: () => {
                return [];
            }
        },
        disabled: false
    },
    data() {
        return {
            data: [],
            currentMenuIds: [],
            currentFunctionIds: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (this.roleId) {
                getSysMenuTree(this.roleId).then(res => {
                    this.currentMenuIds = res.data;
                    console.log("role", res.data);
                    this.data = res.data;
                    this.formatTreeData(res.data);
                });
            } else {
                getSysMenuTree().then(res => {
                    this.data = res.data;
                    this.formatTreeData(res.data);
                });
            }
        },
        handleCheck(arr) {
            this.formatSelectData(arr);
        },
        //格式化选择数据
        formatSelectData(arr) {
            let menuIds = [],
                functionIds = [];
            arr &&
                arr.forEach(v1 => {
                    console.log(v1)
                    if (v1.parentId === "0") {
                        menuIds.push(v1.id);
                        v1.childrens.forEach(v2 => {
                            menuIds.push(v2.id);
                            // if (v2.types === "1") {
                            //     menuIds.push(v2.id);
                                
                            //     // v2.nodes.forEach(v3 => {
                            //     //     if (v3.types === "1") {
                            //     //         menuIds.push(v3.id);
                            //     //     }
                            //     //     if (v3.types === "2") {
                            //     //         functionIds.push(v3.id);
                            //     //     }
                            //     // });
                            // }
                            // if (v2.types === "2") {
                            //     functionIds.push(v2.id);
                            // }
                        });
                    }
                    if (v1.types === "2") {
                        functionIds.push(v1.id);
                    }
                });
            this.currentMenuIds = Array.from(new Set(menuIds));
            this.currentFunctionIds = Array.from(new Set(functionIds));
        },
        //格式化树形数据
        formatTreeData(data) {
            let _this = this;
            data && 
                data.forEach(v1 => {
                    v1.title = v1.menuName;
                    v1.children = v1.childrens;
                    v1.disabled = v1.status === 1;
                    // if (_this.currentMenuIds.length) {
                    //     _this.currentMenuIds.forEach(vv => {
                    //         v1.checked = vv.checked;
                    //         // if (v1.parentId == "0" && v1.id == vv.id) {
                    //         //     v1.checked = true
                    //         // }else{
                    //         // v1.checked = vv.id == v1.id;
                    //         // }
                    //         console.log("v1", v1.id, "vv", vv.id);
                    //     });
                    // }
                    // console.log("v1", v1.checked, "name", v1.menuName);
                    // if (_this.currentMenuIds.length || _this.menuIds.length) {
                    //     if (
                    //         _this.currentMenuIds.includes(v1.id) ||
                    //         _this.menuIds.includes(v1.id)
                    //     ) {
                    //         v1.checked = true;
                    //     } else {
                    //         v1.checked = false;
                    //     }
                    // }
                    v1.expand = true;
                    _this.formatTreeData(v1.childrens);
                });
        }
    },
    watch: {
        currentMenuIds(val) {
            this.$emit("update:menuIds", val);
        },
        currentFunctionIds(val) {
            this.$emit("update:functionIds", val);
        },
        roleId(val) {
            this.init();
        },
        "$props.menuIds"(val) {
            this.currentMenuIds = val;
        },
        "$props.functionIds"(val) {
            this.currentFunctionIds = val;
        }
    }
};
</script>
