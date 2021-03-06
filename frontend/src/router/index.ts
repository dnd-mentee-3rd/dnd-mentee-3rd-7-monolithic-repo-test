import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MainPage from "../views/MainPage.vue";
import store from "@/store";
import { footerNaviActiveIcon } from "@/api/type";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
    meta: {
      footerNaviActiveIcon: footerNaviActiveIcon.MAIN
    }
  },
  {
    path: "/signup",
    name: "Singup",
    component: () => import("@/views/SignUpPage.vue")
  },
  {
    path: "/tip/detail/:id",
    name: "TipPage",
    props: true,
    component: () => import("@/views/TipPage.vue"),
    meta: {
      footerNaviActiveIcon: footerNaviActiveIcon.TIP
    }
  },
  {
    path: "/tip/write",
    name: "WritePage",
    component: () => import("@/views/WritePage.vue"),
    meta: {
      footerNaviActiveIcon: footerNaviActiveIcon.TIP
    }
  },
  {
    path: "/intro",
    name: "Intro",
    component: () => import("@/views/IntroPage.vue"),
    meta: {
      footerNaviActiveIcon: footerNaviActiveIcon.INTRO
    }
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: () => import("@/views/MyPage.vue"),
    meta: {
      footerNaviActiveIcon: footerNaviActiveIcon.MYPAGE
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const signModalNameSpace = "signModal/";
const restrictPaths = ["/tip/write", "/mypage"];

router.beforeEach((to, from, next) => {
  const isLogin = store.getters.isLogin;
  //Neet to add if not log in redirect
  if (restrictPaths.includes(to.path) && !isLogin) {
    store.commit(`${signModalNameSpace}showSignIn`);
    next("/");
  } else {
    next();
  }
});

export default router;
