import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Inicio from '../components/Inicio'
import Reportes from '../components/Reportes'
import Login from '../components/Login'
import Administrar from '../components/Administrar'
import Serie from '../components/Serie'
import SerieTabla from '../components/SerieTabla'
import Usuario from '../components/Usuario'
import AltaVehiculos from '../components/AltaVehiculos'
import CambioPrecio from '../components/CambioPrecio'
import Rendimiento from '../components/Rendimiento'

Vue.use(VueRouter)

var router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{

            path: '/',
            name: 'inicio',
            component: Inicio,
            meta: {
                admin: true,
                users: true
            },
        },
        {
            path: '/reportes',
            name: 'reportes',
            component: Reportes,
            meta: {
                admin: true,
                users: true
            },
        },
        {
            path: '/alta-vehiculos',
            name: 'altavehiculos',
            component: AltaVehiculos,
            meta: {
                admin: true,
                users: true
            },
        },
        {
            path: '/cambio-precio',
            name: 'cambioprecio',
            component: CambioPrecio,
            meta: {
                admin: true,
                users: true
            },
        },
        {
            path: '/rendimiento',
            name: 'rendimiento',
            component: Rendimiento,
            meta: {
                admin: true,
                users: true
            },
        },
        {
            path: '/admin',
            name: 'admin',
            component: Administrar,
            meta: {
                admin: true
            },
        },
        {
            path: '/serie',
            name: 'serie',
            component: Serie,
            meta: {
                admin: true
            },
        },
        {
            path: '/serietabla',
            name: 'serietabla',
            component: SerieTabla,
            meta: {
                admin: true
            },
        },
        {
            path: '/usuario',
            name: 'usuario',
            component: Usuario,
            meta: {
                admin: true
            },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                libre: true
            },
        },
        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/About.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.libre)) {
        next()
    } else if (store.state.user && store.state.user.rol == 'admin') {
        if (to.matched.some(record => record.meta.admin)) {
            next()
        }
    } else if (store.state.user && store.state.user.rol == 'users') {
        if (to.matched.some(record => record.meta.users)) {
            next()
        }
    } else {
        next()
    }
})


export default router