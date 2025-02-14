import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/theme-config',
        children: [
            {
                path: '/theme-config',
                name: 'theme-config',
                meta: {
                    title: '主题色管理',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "theme-config" */ '../views/system/theme-config.vue'),
            },
            {
                path: '/theme-groups',
                name: 'theme-groups',
                meta: {
                    title: '主题组管理',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "theme-config" */ '../views/system/theme-groups.vue'),
            },
            {
                path: '/404',
                meta: {
                    title: '找不到页面',
                    noAuth: true,
                },
                component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue'),
            },]
    },
    { path: '/:path(.*)', redirect: '/404' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    const role = localStorage.getItem('vuems_name');
    const permiss = usePermissStore();

    // if (!role && to.meta.noAuth !== true) {
    //     next('/login');
    // } else if (typeof to.meta.permiss == 'string' && !permiss.key.includes(to.meta.permiss)) {
    //     // 如果没有权限，则进入403
    //     next('/403');
    // } else {
    //     next();
    // }
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
