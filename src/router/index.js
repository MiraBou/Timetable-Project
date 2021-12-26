import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import CrudFilier from '../views/Crud_Filier.vue'
import Crud_Departement from '../views/Crud_Departement.vue'
import CrudEmploi from '../views/Crud_Emploi.vue'
import CrudProf from '../views/Crud_Prof.vue'
import CrudDevoir from '../views/Prof_Devoir.vue'
import ProfPanel from '../views/Prof_Panel.vue'
import ProfEmploi from '../views/Prof_Emploi.vue'
import ProfNotif from '../views/Prof_Notifications.vue'
import UpdateProfile from '../views/Prof_Profile.vue'
import EtudiantPanel from '../views/Etudiant_Panel.vue'
import EtudiantNotif from '../views/Etudiant_Notif.vue'
import EtudiantDevoir from '../views/Etudiant_Devoir.vue'
import EtudiantEmploi from "../views/Etudiant_Emploi.vue"
import jwt_decode from "jwt-decode"

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/filier',
        name : 'Filier',
        component : CrudFilier,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/departement',
        name : 'Departement',
        component : Crud_Departement,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/profs',
        name : 'Profs',
        component : CrudProf,
        meta: {
          requireAuth: true
        }
      },
      {
        path : '/create_emploi',
        name : 'CrudEmploi',
        component : CrudEmploi,
        meta: {
          requireAuth: true
        }
      },
    ]
  },
  {
    path : '/prof_panel',
    name : 'ProfPanel',
    component : ProfPanel,
    children: [
      {
        path: '/prof_notif',
        name : 'ProfNotif',
        component : ProfNotif,
        meta : {
          requireAuth: true
        }
      },
      {
        path: '/prof_emploi',
        name : 'ProfEmploi',
        component : ProfEmploi,
        meta : {
          requireAuth: true
        }
      },
      {
        path: '/update_profile',
        name : 'UpdateProfile',
        component : UpdateProfile,
        meta : {
          requireAuth: true
        }
      },
      {
        path: '/devoirs',
        name : 'CrudDevoir',
        component : CrudDevoir,
        meta : {
          requireAuth: true
        }
      }
      
    ]

  },
  {
    path: './etudiant_panel',
    name : 'EtudiantPanel',
    component : EtudiantPanel,
    children : [
      {
        path: '/etudiant_notif',
        name : 'EtudiantNotif',
        component : EtudiantNotif,
        meta : {
          requireAuth: true
        }
      },
      {
        path: '/emploi',
        name: 'EtudiantEmploi',
        component: EtudiantEmploi,
        meta : {
          requireAuth: true
        }
      },
      {
        path: '/etudiant_devoir',
        name: 'EtudiantDevoir',
        component: EtudiantDevoir,
        meta : {
          requireAuth: true
        }
      },

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  
  // otherwise redirect to home
  // { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
      if(localStorage.access_token) {
        let d = new Date(0)
        d.setUTCSeconds(jwt_decode(localStorage.access_token).exp);
        let n = new Date()
        let dif = d.getTime() - n.getTime()
        if (( dif / 1000) > 3600) {
          next({ path: "/login", query: { redirect: to.fullPath }});
        }else{
          // if(jwt_decode(localStorage.access_token).type != 'admin'){
          //   next({ path: "/"});
          // }
          next()
        }
      }else{
        next({ path: "/login", query: { redirect: to.fullPath }});
      }
  } else {
        next()
  }
}
)

export default router
