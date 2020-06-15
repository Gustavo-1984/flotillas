<template>
  <v-content >
    <v-container class="fill-height" fluid align-start>
      <v-row align="center" justify="center">
        <v-col class="text-center" xs12 md6>
          <v-card color="#FFFFFF" class="mx-auto">
             <v-card-title>
      Vehiculos
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="serie"
      :search="search"
    ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
  export default {
    data: () => ({
        dates: ['2019-09-10', '2019-09-20'],
        search:"",
        serie: [],
      dialog: false,
      headers: [
        { text: 'TAG', value: 'tag' },
        { text: 'PLACAS', value: 'placas' },
        { text: 'NUMERO ECONOMICO', value: 'numEconomico' },
        { text: 'UNIDAD', value: 'unidad' },
        { text: 'DESCRIPCION', value: 'descripcion' },
        { text: 'MARCA', value: 'marca' },
        { text: 'COLOR', value: 'color' },
        { text: 'LITROS', value: 'litros' },
        { text: 'ACTIVO', value: 'estado' },
      ],
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
        headers: {
          token: this.token,
        },
      };
          let me = this
            axios.get('altaVehiculo', config).then(function(response){
               me.serie=response.data
            }).catch(function(error){
                
            })
        },
    },
  }
</script>