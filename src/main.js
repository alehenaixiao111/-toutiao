import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
// vant注册
import Vant from "vant";
// 引入vant样式
import "vant/lib/index.less";
// 引入flexible 样式
import "amfe-flexible";
Vue.use(Vant);
import ToutiaoIcon from "@/components/ToutiaoIcon";
import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res);
});
Vue.config.productionTip = false;
Vue.component("ToutiaoIcon", ToutiaoIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
