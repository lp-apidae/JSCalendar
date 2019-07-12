import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Error from '@/components/Error'
import MyEvents from '@/components/MyEvents'

Vue.use(Router)

//Définition des routes
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/myevents',
      name: 'myevents',
      component: MyEvents,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'error',
      component: Error
    }
  ]
})
