<template>
  <div>
    <v-app-bar app color="primary" dark>
      <router-link :to="{ name: 'Home' }">
        <v-toolbar-title class="title">SHOckPuppets</v-toolbar-title>
      </router-link>
      <v-btn :to="{ name: 'Puppets', query: { shuffle: 'true' }}" text>
        <span class="mr-2">Store</span>
      </v-btn>
      <v-btn :to="{ name: 'About' }" text>
        <span class="mr-2">About</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-menu
        ref="menu"
        v-model="menu"
        transition="scale-transition"
        offset-y
        offset-x
        min-width="290px"
        open-on-hover
      >
        <template v-slot:activator="{ on }">
          <button v-on="on" id="color"></button>
        </template>
        <v-color-picker
          v-model="color"
          show-swatches
          :swatches="colorSwatches"
          class="ma-2"
          hide-inputs
        ></v-color-picker>
      </v-menu>

      <v-btn @click="$store.dispatch('toggleCart', true)" text>
        <span class="mr-2">Cart</span>
        <v-badge v-if="itemsInCart" bottom color="blue" :content="itemsInCart" overlap>
          <v-icon>fas fa-shopping-cart</v-icon>
        </v-badge>
        <v-icon v-else>fas fa-shopping-cart</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "appHeader",
  data: () => ({
    color: "",
    colorSwatches: [
      ["#FF0000", "#AA0000", "#550000"],
      ["#FFFF00", "#AAAA00", "#555500"],
      ["#00FF00", "#00AA00", "#005500"],
      ["#00FFFF", "#00AAAA", "#005555"],
      ["#0000FF", "#0000AA", "#000055"]
    ],
    menu: false
  }),
  computed: {
    itemsInCart() {
      return this.$store.state.basket.items.length;
    }
  },
  watch: {
    color() {
      this.this.$vuetify.theme.themes.light.primary = this.color.hex;
    }
  },
  methods: {
    msg() {
      this.$vuetify.theme.themes.light.primary = this.color.hex;
    }
  },
  mounted() {
    this.color = this.$vuetify.theme.themes.light.primary;
  }
};
</script>

<style scoped>
.title {
  margin: 0 20px;
  color: #fff;
}
#color {
  border: 1px solid #333;
  border-radius: 50%;
  height: 30px;
  width: 30px;
}
</style>
