import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        usuario: '',
        usuarioDb: ''
    },
    mutations: {

        obtenerUsuario(state, payload) {
            state.token = payload
            if (payload === '') {
                state.usuario = ''
            } else {
                state.usuario = decode(payload)
                router.push({ name: 'inicio' })
            }
        },
        obtenerRol(state, payload) {
            state.usuarioDb = payload
            if (payload === '') {
                state.usuarioDb = ''
            } else {
                state.usuarioDb = payload
            }
        }
    },
    actions: {
        guardarRol({ commit }, payload) {
            localStorage.setItem('usuarioDb', payload)
            commit('obtenerRol', payload)
        },
        guardarUsuario({ commit }, payload) {
            localStorage.setItem('token', payload)
            commit('obtenerUsuario', payload)
        },
        cerrarSesion({ commit }) {
            commit('obtenerUsuario', '')
            localStorage.removeItem('token')
            localStorage.removeItem('usuarioDb')
            router.push({ name: 'login' })

        },
        leerToken({ commit }) {
            const token = localStorage.getItem('token')
            if (token) {
                commit('obtenerUsuario', token)
            } else {
                commit('obtenerUsuario', '')
            }
        }

    },
    getters: {

        esActivo: state => !!state.token,
        esAdmin: state => state.usuarioDb.rol === 'admin'


    }
})