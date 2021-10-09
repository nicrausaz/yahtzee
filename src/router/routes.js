export default [
   {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
   },
   {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
   },
   {
      path: '/play/:type',
      name: 'Play',
      component: () => import(/* webpackChunkName: "about" */ '../views/Play.vue')
   },
   {
      path: '/waitroom',
      name: 'Waitroom',
      component: () => import(/* webpackChunkName: "about" */ '../views/WaitRoom.vue')
   },
   {
      path: '/join/:roomid',
      name: 'Join',
      component: () => import(/* webpackChunkName: "about" */ '../views/WaitRoom.vue')
   },
   {
      path: "*",
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
   }
]