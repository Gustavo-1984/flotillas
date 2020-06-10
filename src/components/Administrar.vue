<template>
  <v-content>
    <div>
      <h1 align="center" justify="center">ALTA DE USUARIOS</h1>
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
                v-model="rol"
                label="Rol"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="usuario"
                label="Usuario"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                required
                @keyup.enter="enviar"
              ></v-text-field>

              <v-text-field
                v-model="estado"
                label="Estado"
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
    rol: "",
    usuario: "",
    password: "",
    estado: "",
  }),

  created() {},
  computed: {
    ...mapState(["token"]),
  },

  methods: {
    limpiar() {
      (this.rol = ""),
        (this.usuario = ""),
        (this.password = ""),
        (this.estado = "");
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
          "nuevo-usuario",
          {
            rol: this.rol,
            usuario: this.usuario,
            password: this.password,
            estado: this.estado,
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
