import { StoreOptions } from "vuex";
import AccessEnum from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: {
    loginUser: { userName: "未登录" },
  },
  getters: {},
  actions: {
    //async：声明这是一个异步函数，内部可以使用 await 等待接口返回。
    async getLoginUser({ commit, state }, payload) {
      //这里调用了刚才通过工具生成的 API 服务（UserControllerService）
      //它会发起一个 HTTP GET 请求到后端的 /user/get/login（或其他对应路径）接口。
      const res = await UserControllerService.getLoginUserUsingGet();
      //如果后端返回 0（通常代表操作成功），则调用名为 updateUser 的 Mutation。
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        //...state.loginUser：保留原有用户信息（如果有的话）。
        //强制将 userRole 字段设置为 AccessEnum.NOT_LOGIN（未登录枚举）。
        //配合之前的 checkAccess 权限校验函数，确保页面能正确识别出当前是“游客”身份，从而限制某些敏感操作。
        commit("updateUser", {
          ...state.loginUser,
          userRole: AccessEnum.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
