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
import VerVehiculos from '../components/VerVehiculos'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{

            path: '/',
            name: 'inicio',
            component: Inicio,
            meta: { requiereAuth: true }
        },
        {
            path: '/reportes',
            name: 'reportes',
            component: Reportes,
            meta: { requiereAuth: true }
        },
        {
            path: '/alta-vehiculos',
            name: 'altavehiculos',
            component: AltaVehiculos,
            meta: { requiereAuth: true }
        },
        {
            path: '/cambio-precio',
            name: 'cambioprecio',
            component: CambioPrecio,
            meta: { requiereAuth: true }
        },
        {
            path: '/rendimiento',
            name: 'rendimiento',
            component: Rendimiento,
            meta: { requiereAuth: true }
        },
        {
            path: '/admin',
            name: 'admin',
            component: Administrar,
            meta: {
                requiereAuth: true
            }
        },
        {
            path: '/serie',
            name: 'serie',
            component: Serie,
            meta: { requiereAuth: true }

        },
        {
            path: '/serietabla',
            name: 'serietabla',
            component: SerieTabla,
            meta: { requiereAuth: true }
        },
        {
            path: '/usuario',
            name: 'usuario',
            component: Usuario,
            meta: {
                requiereAuth: true,


            }
        },
        {
            path: '/vehiculo',
            name: 'vehiculo',
            component: VerVehiculos,
            meta: {
                requiereAuth: true,


            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,

        },
        {
            path: '/about',
            name: 'About',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/About.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requiereAuth)
    if (rutaProtegida && store.state.token === '') {
        next({ name: 'login' })
    } else {
        next()
    }

})

export default router