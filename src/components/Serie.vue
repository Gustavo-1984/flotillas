<template>
  <v-content>
    <div style="margin-top: 10px">
      <h1 align="center" justify="center">Equipos</h1>
    </div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" xs12 md6>
          <v-card
            color="#FFFFFF"
            class="mx-auto"
            height="550px"
            width="550"
            outlined
          >
            <form>
              <v-text-field
                v-model="serie"
                label="Serie"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="estado"
                label="Estado"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-select
                v-model="usuario"
                :items="usuario"
                label="Usuario"
                required
                @keyup.enter="enviar"
                item-text="usuario"
              ></v-select>

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
    serie: "",
    estado: "",
    usuario: "",
    options: null,
    select: null,
    usuario: [{ value: "usuario" }],
  }),

  created() {
    this.listarUsuario();
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    limpiar() {
      (this.serie = ""), (this.usuario = ""), (this.estado = "");
    },
    listarUsuario() {
      let me = this;
      axios
        .get("usuario")
        .then(function(res) {
          me.usuario = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
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
          "serie-nuevo",
          { serie: this.serie, estado: this.estado, usuario: this.usuario },
          config
        )
        .then((respuesta) => {
          me.limpiar();
          me.listarUsuario();
        })
        .catch(function(error) {});
    },
  },
};
</script>
