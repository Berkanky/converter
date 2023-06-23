
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/',name:'home', component: () => import('pages/IndexPage.vue') },
      //{ path:'resultPage',name:'resultPage',component:()=>import('pages/resultPage.vue')}
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
