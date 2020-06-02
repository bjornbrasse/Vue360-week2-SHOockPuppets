<template>
  <div>
    <v-app>
      <Header />
      <v-content>
        <router-view />
        <Cart />
        <v-snackbar v-model="cartMessage.show" :color="cartMessage.color" :timeout="cartMessage.timeout" :multi-line="cartMessage.multiline">
          {{ cartMessage.text }}
          <v-btn dark text @click="$store.dispatch('hideCartMessage')"><v-icon>far fa-times-circle</v-icon> </v-btn>
        </v-snackbar>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  data: () => ({}),
  computed: {
    cartMessage() {
      return this.$store.state.cartMessage;
    }
  },
  components: {
    Header,
    Cart: () => import("./components/Cart.vue")
  }
};
</script>

<style lang="css" scoped>
</style>

