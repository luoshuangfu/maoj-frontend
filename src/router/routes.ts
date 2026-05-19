import { RouteRecordRaw } from "vue-router";
import AccessEnum from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: () => import("../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: () => import("../views/user/UserLoginView.vue"),
      },
      {
        path: "/user/register",
        name: "注册",
        component: () => import("../views/user/UserRegisterView.vue"),
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () => import("../views/NoAuthView.vue"),
  },
  {
    path: "/",
    name: "主页",
    component: () => import("../views/ExampleView.vue"),
  },
/*  {
    path: "/hide",
    name: "隐藏页面",
    component: () => import("../views/HelloView.vue"),
    meta: {
      hideInMenu: true,
    },
  },*/
/*  {
    path: "/admin",
    name: "管理员可见",
    component: () => import("../views/AdminView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
    },
  },*/
  {
    path: "/question",
    name: "浏览题目",
    component: () => import("../views/question/QuestionsView.vue"),
  },
  {
    path: "/add/question",
    name: "添加题目",
    component: () => import("../views/question/AddQuestionView.vue"),
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path:"/manage/question",
    name:"管理题目",
    component: () => import("../views/question/AddQuestionView.vue"),
  },
  {
    path:"/update/question",
    name:"更新题目",
    component: () => import("../views/question/AddQuestionView.vue"),
    meta: {
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
];
