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
                    if (v1.parentId === "0") {
                        menuIds.push(v1.id);
                        v1.childrens.forEach(v2 => {
                            // if (v2.types === "1") {
                                menuIds.push(v2.id);
                                // v2.nodes.forEach(v3 => {
                                //     if (v3.types === "1") {
                                //         menuIds.push(v3.id);
                                //     }
                                //     if (v3.types === "2") {
                                //         functionIds.push(v3.id);
                                //     }
                                // });
                            // }
                            if (v2.types === "2") {
                                functionIds.push(v2.id);
                            }
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
            data &&
                data.forEach(v1 => {
                    v1.title = v1.menuName;
                    v1.children = v1.childrens;
                    if (
                        this.currentFunctionIds.length ||
                        this.currentMenuIds.length
                    ) {
                        if (
                            this.currentFunctionIds.includes(v1.id) ||
                            this.currentMenuIds.includes(v1.id)
                        ) {
                            v1.checked = true;
                        } else {
                            v1.checked = false;
                        }
                    }
                    v1.expand = true;
                    this.formatTreeData(v1.childrens);
                });
        }
    },
    watch: {
        currentMenuIds(val) {
            // console.log(val)
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
