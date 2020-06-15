<template>
  <v-content>
    <div style="margin-top: 10px">
      <h1 align="center" justify="center">ALTA DE VEHICULOS</h1>
    </div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" xs12 md6>
          <v-card
            color="#FFFFFF"
            class="mx-auto"
            height="660"
            width="550"
            outlined
          >
            <form>
              <v-text-field
                v-model="tag"
                label="Tag"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="placas"
                label="Placas"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="numEconomico"
                label="Numero Economico"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="unidad"
                label="Unidad"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="descripcion"
                label="Descripcion"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="marca"
                label="Marca"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="color"
                label="Color"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="litros"
                label="Litros"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-btn color="primary" class="mr-4 mt-5" @click="enviar"
                >Enviar</v-btn
              >
              <v-btn color="primary" class="mt-5" @click="limpiar"
                >Limpiar</v-btn
              >
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    tag: "",
    placas: "",
    numEconomico: "",
    unidad: "",
    descripcion: "",
    marca: "",
    color: "",
    litros: "",
  }),

  created() {},
  computed: {
    ...mapState(["token"]),
  },

  methods: {
    limpiar() {
      (this.tag = ""),
        (this.placas = ""),
        (this.numEconomico = ""),
        (this.unidad = ""),
        (this.descripcion = ""),
        (this.marca = ""),
        (this.color = ""),
        (this.litros = "");
    },
    enviar() {
      let config = {
        headers: {
          token: this.token,
        },
      };

      let me = this;
      axios
        .post(
          "vehiculo-nuevo",
          {
            tag: this.tag,
            placas: this.placas,
            numEconomico: this.numEconomico,
            unidad: this.unidad,
            descripcion: this.descripcion,
            marca: this.marca,
            color: this.color,
            litros: this.litros,
          },
          config
        )
        .then((respuesta) => {
          me.limpiar();
        })
        .catch(function(error) {});
    },
  },
};
</script>
