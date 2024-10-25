import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LandingView from '@/views/LandingView.vue'
import LocationView from '@/views/LocationView.vue';
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
        path: '/landing',
        name: 'landing',
        component: LandingView
    },
    {
        path: '/location',
        name: 'location',
        component: LocationView
    },

  ]
})

router.beforeEach((to, from) => {
    if(to.name === 'Login') {
        return true
    }
    if(!localStorage.getItem('token')) {
        return {
            name: 'Login'
        }
    }

   checkTokenAuthenticity()
})

const checkTokenAuthenticity = () => {
    axios.get("http://localhost:8000/api/user", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response) => {})
    .catch((error) => {
        localStorage.removeItem('token')
        router.push({
            name: 'Login'
        })
    })
}

export default router
