<template>
  <div class="d-flex align-center">
    <p :class="{outlined: accent}" class="mx-2 my-0">{{ cartItem.amount }}</p>
    <v-btn @click="increaseCartAmount" icon small>
      <v-icon small :color="accent ? 'pink' : 'grey'">fas fa-plus</v-icon>
    </v-btn>
    <v-btn v-if="cartItem.amount > 1" @click="decreaseCartAmount" icon small>
      <v-icon small :color="accent ? 'pink' : 'grey'">fas fa-minus</v-icon>
    </v-btn>
    <v-btn
      v-else
      @click="$store.dispatch('removeArticleFromCart', { articleId: cartItem.puppet })"
      color="grey"
      icon
      tile
      small
      class="px-1"
    >
      <v-icon small>fas fa-trash-alt</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "cartAmount",
  props: {
    cartItem: {
      type: Object,
      required: true
    },
    accent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    increaseCartAmount() {
      this.$store
        .dispatch("checkNumberInStock", {
          articleId: this.cartItem.puppet,
          amount: this.cartItem.amount + 1
        })
        .then(res => {
          if (!res.sufficient) {
            return this.$store.dispatch("showCartMessage", {
              text: res.message,
              color: "warning",
              timeout: 2000,
              multiline: false
            });
          }
          this.$store.dispatch("changeCartItemAmount", {
            articleId: this.cartItem.puppet,
            amount: this.cartItem.amount + 1
          });
        });
    },
    decreaseCartAmount() {
      this.$store.dispatch("changeCartItemAmount", {
        articleId: this.cartItem.puppet,
        amount: this.cartItem.amount - 1
      });
    }
  }
};
</script>

<style scoped>
.outlined {
  margin: 0;
  border: 1px solid rgb(204, 60, 156);
  width: 30px;
  height: 30px;
  text-align: center;
  justify-content: center;
  font-size: 1.2rem;
}
</style>