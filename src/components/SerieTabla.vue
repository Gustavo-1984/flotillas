<template>
  <v-content >
    <v-container class="fill-height" fluid align-start>
      <v-row align="center" justify="center">
        <v-col class="text-center" xs12 md6>
          <v-card color="#FFFFFF" class="mx-auto">
             <v-card-title>
      Series
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
import axios from 'axios'
  export default {
    data: () => ({
        dates: ['2019-09-10', '2019-09-20'],
        search:"",
        serie: [],
        year: "",
      dialog: false,
      headers: [
        { text: 'SERIE', value: 'serie' },
        { text: 'ESTADO', value: 'estado' },
        { text: 'USUARIO', value: 'usuario' },
      ],
    }),

    computed: {
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
          let me = this
            axios.get('serie').then(function(response){
               me.serie=response.data
               const date = response.data[0].createdAt
               let newDate = date.split('T')
               let year = newDate[0]
               me.year = year
            }).catch(function(error){
                
            })
        },
    },
  }
</script>