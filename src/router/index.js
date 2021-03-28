import Vue from 'vue'
import VueRouter from 'vue-router'
//实现路由按需加载
const Recommend = () => import('../views/Recommend.vue')
const Singer = () => import('../views/Singer.vue')
const Rank = () => import('../views/Rank.vue')
const Search = () => import('../views/Search.vue')
const Detail = () => import('../views/Detail.vue')
const Account = () => import('../views/Account.vue')
const Mv = () => import('../views/MV.vue')
const MvDetail = () => import('../views/MvDetail.vue')
const Comment = () => import('../views/Comment.vue')

Vue.use(VueRouter)

// // 解决重复点击路由报错的BUG
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err)
// }

const routes = [
  { path: '/', redirect: '/recommend' },
  {
     path: '/recommend', component: Recommend ,
     children:[
       {
         path:'detail/:id/:type',
         component: Detail ,
       }
     ],
  },
  { path: '/singer', component: Singer,
    children:[
      {
        path:'detail/:id/:type',
        component: Detail ,
      }]
  }, 
  { path: '/rank', component: Rank ,
  children:[
    {
      path:'detail/:id/:type',
      component: Detail ,
    }
  ],
},
  { path: '/search', component: Search },
  { path: '/account', component: Account },
  { path: '/mv', component: Mv,children:[
    {
      path: 'mvdetail/:id/',
      component:MvDetail
    }
  ]},
  { path: '/songComment/:id', component: Comment },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
