import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 路由懒加载
// 第一种 直接引入登陆组件 同步加载路由 只要页面已刷新 所有的页面数据全部一次性加载
// 第二种 直接import（路径）路由的懒加载 访问到某一个路由的时候再去加载当前路由文件
const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    name: "Login",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
