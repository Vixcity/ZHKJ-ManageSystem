import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: () => import('../views/login.vue')
  }, {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '/client/clientCreate',
        name: '添加客户',
        component: () => import('../views/client/clientCreate.vue'),
      },
      {
        path: '/client/clientList',
        name: '客户列表',
        component: () => import('../views/client/clientList.vue'),
      },
      {
        path: '/client/clientDetail/:id',
        name: '客户详情',
        component: () => import('../views/client/clientDetail.vue'),
      },
      {
        path: '/client/clientUpdate/:id',
        name: '客户修改',
        component: () => import('../views/client/clientUpdate.vue'),
      },
      {
        path: '/productFlowCode/productFlowCode',
        name: '生产流转码',
        component: () => import('../views/productFlowCode/productFlowCode.vue'),
      },
      {
        path: '/productFlowCode/print',
        name: '生产流转码打印',
        component: () => import('../views/productFlowCode/print.vue'),
      },
      {
        path: '/tutorialSystem/tutorialSystemList',
        name: '教程列表',
        component: () => import('../views/tutorialSystem/tutorialSystemList.vue'),
      },
      {
        path: '/tutorialSystem/tutorialSystemCreate',
        name: '添加教程',
        component: () => import('../views/tutorialSystem/tutorialSystemCreate.vue'),
      },
      {
        path: '/tutorialSystem/tutorialSystemDetail/:id',
        name: '教程详情',
        component: () => import('../views/tutorialSystem/tutorialSystemDetail.vue'),
      },
      {
        path: '/tutorialSystem/tutorialSystemUpdate/:id',
        name: '教程修改',
        component: () => import('../views/tutorialSystem/tutorialSystemUpdate.vue'),
      },
      {
        path: '/setting/settingMeau',
        name: '系统设置',
        component: () => import('../views/setting/setting.vue'),
      },
      {
        path: '/systemMsg/systemMsgSend',
        name: '发布通知',
        component: () => import('../views/systemMsg/messageSend.vue'),
      },
      {
        path: '/systemMsg/systemMsgDetail/:id',
        name: '通知详情',
        component: () => import('../views/systemMsg/messageDetail.vue'),
      },
      {
        path: '/systemMsg/systemMsgList',
        name: '通知列表',
        component: () => import('../views/systemMsg/messageList.vue'),
      }
    ]
    // }, {
    //   path: '/systemStore/homePage',
    //   name: 'homePage',
    //   component: () => import('../views/appStore/index.vue')
    // }, {
    //   path: '/systemStore/detail/:systemType',
    //   name: 'detail',
    //   component: () => import('../views/appStore/detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
