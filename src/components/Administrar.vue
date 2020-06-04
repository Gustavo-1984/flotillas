<template>
  <v-content >
      <div style="margin-top: 10px">
    <h1 align="center" justify="center">ALTA DE USUARIOS</h1>
    </div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" xs12 md6>
          <v-card color="#FFFFFF" class="mx-auto" height="550px" width="550" outlined>
    <form>
    <v-text-field
      v-model="rol"
      label="Rol"
      required
    ></v-text-field>

    <v-text-field
      v-model="usuario"
      label="Usuario"
      required
    ></v-text-field>

     <v-text-field
      v-model="password"
      label="Password"
      required
    ></v-text-field>

     <v-text-field
      v-model="estado"
      label="Estado"
      required
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
import axios from 'axios'
  export default {
    data: () => ({
        rol: '',
        usuario:'',
        password: '',
        estado:''
      
    }),

    created () {
      this.enviar()
    },

    methods: {
       limpiar(){
        this.rol= '',
        this.usuario='',
        this.password='',
        this.estado=''
      },
        enviar(){
            let me = this
            let header={"token": this.$store.state.token}
            let configuracion={headers:header}
            axios.post('usuarios/add',{rol:this.rol, usuario:this.usuario, password:this.password, estado:this.estado }, configuracion)
            .then(respuesta =>{
                me.limpiar()
            }).catch(function(error){
                
            })
        },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
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