import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        usuario: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUsuario(state, usuario) {
            state.usuario = usuario.user
        }
    },
    actions: {
        guardarToken({ commit }, token) {
            commit("setToken", token)
            commit("setUsuario", decode(token))
            localStorage.setItem("token", token)
        },
        salir({ commit }) {
            localStorage.removeItem("token")
            commit("setToken", null)
            commit("setUsuario", null)

            router.push({ name: 'login' })
        },
        autoLogin({ commit }) {
            let token = localStorage.getItem("token")
            if (token) {
                commit("setToken", token)
                commit("setUsuario", decode(token))
            }
            router.push({ name: 'inicio' })
        }
    }
})