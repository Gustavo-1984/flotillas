<template>
  <v-content >
      <div style="margin-top: 10px">
    <h1 align="center" justify="center">Cambio de precio</h1>
    </div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" xs12 md6>
          <v-card color="#FFFFFF" class="mx-auto" height="550px" width="550" outlined>
     <form>
        <v-menu v-model="menu2" transition="scale-transition" offset-y min-width="290px">
        <v-date-picker v-model="date" :min="minimo" reactive></v-date-picker>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field  v-model="date"  label="Fecha" prepend-icon="event" v-bind="attrs" v-on="on"></v-text-field>
        </template>
      </v-menu>

      <v-menu ref="menu" v-model="menu" transition="scale-transition" offset-y min-width="290px" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field  v-model="hora" readonly label="Hora" prepend-icon="access_time" v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-time-picker v-model="hora" ></v-time-picker>
      </v-menu>

     <v-text-field
      v-model="precio"
      label="Precio"
      required
      prepend-icon="attach_money"
    ></v-text-field>

    <v-btn color="primary" class="mr-4 mt-5" @click="enviar">Enviar</v-btn>
    <v-btn color="primary" class="mt-5" @click="limpiar">Limpiar</v-btn>
</form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import moment from 'moment'

  export default {
    data: () => ({
        date:'',
        hora:'',
        precio:'',
        menu: null,
        menu2: null,
        minimo: new Date().toISOString().substr(0, 10),
        
    }),

    created () {
    
    },
    computed:{
    ...mapState(["token"]),
   
    },

    methods: {
      
       limpiar(){
        this.date= '',
        this.hora='',
        this.precio=''
      },

      enviar() {
            let config = {
              headers: {
                 token: this.token,
              },
            };
            
            let me = this
            axios.post('cambio-precio',{ time:this.hora, precio:this.precio, date:this.date}, config)
            .then((respuesta) =>{
              console.log(respuesta.data);
                me.limpiar()
            }).catch(function(error){
                
            })
      },
    },
  }
</script>