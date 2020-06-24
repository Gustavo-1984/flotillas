<template>
    <v-content >
        <v-container class="fill-height" fluid align-start>
            <v-row align="center" justify="center">
                <v-col class="text-center" xs12 md6>
    <v-data-table
    :headers="headers"
    :items="consumos"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CONSUMOS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Generar Reporte</v-btn>
          </template>
         
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
            
         <v-col cols="12" sm="6" md="4">
        <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateRange"
            label="Fecha"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dates" range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
                  </v-col>

            
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        create
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="listar()">Reset</v-btn>
    </template>
  </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
  export default {
    data: () => ({
        dates: ['2019-09-10', '2019-09-20'],
        search:"",
        consumos: [],
      dialog: false,
      headers: [
        { text: 'VEHICULO', value: 'tag' },
        { text: 'FOLIO', value: 'id' },
        // { text: 'FECHA', value: 'date' },
        { text: 'FECHA', value: 'createdAt'},
        { text: 'DESCRIPCION', value: 'descripcion'},
        { text: 'PLACAS', value: 'placas'},
        { text: 'UNIDAD', value: 'unidad'},
        { text: 'PRECIO', value: 'precio'},
        { text: 'LITROS', value: 'litros'},
        { text: 'TOTAL', value: 'total'},
      ]
    }),

    computed: {
      ...mapState(['token']),
        dateRange () {
        return this.dates.join(' ~ ')
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Reporte' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.listar()
    },

    methods: {
        listar(){
          
            let config = {
              headers:{
                token: this.token
              }
            }
            let me = this
            axios.get('consumos', config).then(function(res){
              console.log(res.data);
               me.consumos=res.data
               
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
