<template>
  <v-content >
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" xs12 md6>
          <v-card color="#FFFFFF" class="mx-auto" height="250px" width="250" outlined>
            <v-img class="white--text align-end" height="auto" src="../assets/logotipo.png"> </v-img>
          </v-card>
           <v-card color="#FFFFFF" class="mx-auto" height="300px" width="300" outlined>
             <form>
    <v-text-field
      v-model="usuario"
      label="Usuario"
      required
    ></v-text-field>  

    <v-text-field
    type="password"
      v-model="password"
      label="Password"
      required
    ></v-text-field>
    <v-flex class="red--text mb-4" v-if="errorM">
      {{errorM}}
    </v-flex>
    <v-btn color="black" dark x-large class="mr-4 mt-3" @click="ingresar">Ingresar</v-btn>
  </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            usuario:'',
            password:'',
            errorM: null
        }
    },
    methods:{
        ingresar(){
          let me = this
            axios.post('usuarios/login',{usuario: this.usuario, password: this.password})
            .then(respuesta =>{
                return respuesta.data

            })
            .then(data=>{
              me.$store.dispatch("guardarToken", data.tokenReturn)
              me.$router.push({name: 'inicio'})
            })
            .catch(function(error){
                //console.log(error);
                me.errorM=null
                if(error.response.status == 404){
                  me.errorM="Usuario inexistente"
                }else{
                  me.errorM="Error con el servidor"
                }

            })
        }
    }
}
</script>