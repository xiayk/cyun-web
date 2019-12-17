import Main from "@/views/Main.vue";

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: "/login",
    name: "login",
    meta: {
        title: "Cyun - 登录"
    },
    component: () => import("@/views/login.vue")
};

export const page404 = {
    path: "/*",
    name: "error-404",
    meta: {
        title: "404-页面不存在"
    },
    component: () => import("@/views/error-page/404.vue")
};

export const page403 = {
    path: "/403",
    meta: {
        title: "403-权限不足"
    },
    name: "error-403",
    component: () => import("@/views/error-page/403.vue")
};

export const saveCus = {
    path: "/saveCus/:id",
    meta: {
        title: "客户添加"
    },
    name: "addCus",
    component: () => import("@/views/account/saveCus.vue")
};

export const page500 = {
    path: "/500",
    meta: {
        title: "500-服务端错误"
    },
    name: "error-500",
    component: () => import("@/views/error-page/500.vue")
};

export const locking = {
    path: "/locking",
    name: "locking",
    component: () =>
        import("@/views/main-components/lockscreen/components/locking-page.vue")
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: "/",
    name: "otherRouter",
    redirect: "/home",
    component: Main,
    children: [{
            path: "home",
            title: "首页",
            name: "home_index",
            component: () => import("@/views/home/merchant.vue")
        },
        {
            path: "merchant-form-data",
            title: "商户渠道列表",
            name: "merchant-form-data",
            component: () => import("@/views/home/count.vue")
        },
        /*  {
             path: "home",
             title: "首页",
             name: "home_index",
             meta: { access: 3 },
             component: () => import("@/views/home/merchant.vue")
         }, */
        {
            path: "account/password",
            title: "修改密码",
            name: "account-password",
            component: () => import("@/views/account/password.vue")
        },
        {
            path: "sys/manager/add",
            title: "新增操作员",
            name: "sys-manager-add",
            component: () => import("@/views/sys/manager/add.vue")
        },
        {
            path: "sys/manager/:id/edit",
            title: "编辑操作员",
            name: "sys-manager-edit",
            component: () => import("@/views/sys/manager/edit.vue")
        },
        {
            path: "sys/menu/add",
            title: "新增菜单",
            name: "sys-menu-add",
            component: () => import("@/views/sys/menu/add.vue")
        },
        {
            path: "sys/menu/:id/edit",
            title: "编辑菜单",
            name: "sys-menu-edit",
            component: () => import("@/views/sys/menu/edit.vue")
        },
        {
            path: "sys/role/add",
            title: "新增角色",
            name: "sys-role-add",
            component: () => import("@/views/sys/role/add.vue")
        },
        {
            path: "sys/role/:id/edit",
            title: "编辑角色",
            name: "sys-role-edit",
            component: () => import("@/views/sys/role/edit.vue")
        },
    ]
}; //渠道管理

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: "/sys",
        icon: "ios-gear",
        name: "sys",
        title: "系统管理",
        component: Main,
        children: [{
                path: "user",
                title: "用户管理",
                name: "sys-user",
                component: () => import("@/views/sys/manager/index.vue")
            },
            {
                path: "menu",
                title: "菜单管理",
                name: "sys-menu",
                component: () => import("@/views/sys/menu/index.vue")
            },
            {
                path: "role",
                title: "角色管理",
                name: "sys-role",
                component: () => import("@/views/sys/role/index.vue")
            }
        ]
    },

];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    saveCus,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];