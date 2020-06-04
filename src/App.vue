<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app v-if="logueado">
      <v-list dense>

        <template app v-if="logueado">
          <v-list-item  :to="{name: 'inicio'}">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template app v-if="esAdmin">
          <v-list-item  :to="{name: 'admin'}">
            <v-list-item-action>
              <v-icon>work</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Administrar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

         <template app v-if="esAdmin">
          <v-list-item  :to="{name: 'usuario'}">
            <v-list-item-action>
              <v-icon>face</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Usuario</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template app v-if="esAdmin">
          <v-list-item  :to="{name: 'serie'}">
            <v-list-item-action>
              <v-icon>fingerprint</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Serie</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template app v-if="esAdmin">
          <v-list-item  :to="{name: 'serietabla'}">
            <v-list-item-action>
              <v-icon>list</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Serie Tabla</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template app v-if="logueado">
          <v-list-item  :to="{name: 'reportes'}">
            <v-list-item-action>
              <v-icon>equalizer</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template app v-if="logueado">
          <v-list-item  :to="{name: 'altavehiculos'}">
            <v-list-item-action>
              <v-icon>ev_station</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Alta Vehiculo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
    
  

    <template app v-if="logueado">
          <v-list-item  :to="{name: 'cambioprecio'}">
            <v-list-item-action>
              <v-icon>attach_money</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Cambio de precio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template app v-if="logueado">
          <v-list-item  :to="{name: 'rendimiento'}">
            <v-list-item-action>
              <v-icon>insights</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Rendimiento</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
  
    </v-list>
    </v-navigation-drawer>
  
  <template v-if="logueado">
      <v-app-bar app color="#546E7A" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Control de Flotillas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="salir()" icon v-if="logueado">
          <v-icon>logout</v-icon>Exit
        </v-btn>
      </v-app-bar>
       </template>
      
      <template v-if="logueado">
      <v-footer color="#546E7A" app>
        <span class="white--text">&copy; 2020 - Grupo Petrolero Arca</span>
      </v-footer>
       </template>

     <router-view/>
     
  </v-app>
</template>

<script>

export default {
  name: 'App',

   data: () => ({
    drawer: true,
  }),

  computed:{
    logueado(){
      return this.$store.state.usuario
    },
    esAdmin(){
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'admin'
    },
    esUser(){
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'user'
    }
  },
  created(){
    this.$store.dispatch("autoLogin")
  },
  methods:{
    salir(){
      this.$store.dispatch("salir")
    }
  }
}
</script>