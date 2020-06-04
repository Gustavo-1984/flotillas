<template>
  <v-content >
      <div style="margin-top: 10px">
    <h1 align="center" justify="center">Equipos</h1>
    </div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" xs12 md6>
          <v-card color="#FFFFFF" class="mx-auto" height="550px" width="550" outlined>
    <form>
    <v-text-field
     v-model="serie"
      label="Serie"
      required
    ></v-text-field>

    <v-text-field
      v-model="estado"
      label="Estado"
      required
    ></v-text-field>

    <v-select
    v-model="usuario"
      :items="usuario"
      label="Usuario"
      required
      item-text= "id"
    ></v-select>

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
import axios from 'axios'
  export default {
    data: () => ({
        serie: '',
        estado:'',
        usuario:'',
       options: null,
       select: null,
        usuario:[
            {value:'id'},
           
        ]
       
    }),

    created () {
      this.listar()
    },

    methods: {
       limpiar(){
        this.serie= '',
        this.usuario='',
        this.estado=''
      },
        listar(){
            let me = this
            let header={"token": this.$store.state.token}
            let configuracion={headers:header}
            axios.get('usuarios/list', configuracion).then(function(response){
               me.usuario=response.data
            }).catch(function(error){
                
            })
        },

      enviar() {
         let me = this
            let header={"token": this.$store.state.token}
            let configuracion={headers:header}
            axios.post('serie/add',{serie: this.serie, estado:this.estado, usuarioId:this.usuario}, configuracion)
            .then(respuesta =>{
                me.limpiar()
            }).catch(function(error){
                
            })
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>