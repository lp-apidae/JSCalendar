// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

//enregistrement du plugin BootstrapVue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

/*On ajoute une propriété $axios à l'instance de Vue, pour pouvoir le réutiliser dans nos composants
sans avoir à la réimporter à chaque fois */
Vue.prototype.$axios = Axios

Vue.prototype.$axios.defaults.headers.common['Content-Type'] = 'application/json'
Vue.prototype.$axios.defaults.baseURL= 'https://n0decalendar.herokuapp.com'

//On récupère le token d'authentification dans le local storage du navigateur de l'utilisateur s'il y en a un
const authToken = localStorage.getItem('authToken')

if(authToken){
  //Ajout du token dans le header de la requête (méthode Basic)
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken
}

//Gestion des redirections si l'utilisateur n'est pas connecté sur les pages nécessitant une authentification
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('authToken')) {
            // fix pas joli pour régler problème du header défini qu'au refresh de la page
            Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken')
            next()
            return
        }
        next('/')
    } else if(to.matched.some(record => record.meta.requiresGuest)){
        if (localStorage.getItem('authToken')) {
            next('/myevents')
            return
        }
        next()
    } else {
        next()
    }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
