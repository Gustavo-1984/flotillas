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
      dialog: false,
      headers: [
        { text: 'SERIE', value: 'serie' },
        { text: 'ESTADO', value: 'estado' },
        { text: 'FECHA', value: 'createdAt' },
        { text: 'ID-USUARIO', value: 'usuarioId' },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
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
            let header={"token": this.$store.state.token}
            let configuracion={headers:header}
            axios.get('serie/list', configuracion).then(function(response){
               me.serie=response.data
               
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