<template>
  <v-card-text>
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card class="pr-8">
        <v-card-title class="headline">Puppet Cart</v-card-title>

        <v-card-text>
          <div id="table" v-if="items.length > 0">
            <v-row class="header">
              <v-col>
                <span>Item</span>
              </v-col>
              <v-col>
                <span>Price</span>
              </v-col>
              <v-col cols="4">
                <span>Amount</span>
              </v-col>
              <v-col class="text-right">
                <span>Total</span>
              </v-col>
            </v-row>
            <v-row v-for="i in items" :key="i.id">
              <v-col>
                <span>{{ i.name }}</span>
              </v-col>
              <v-col>
                <span>$ {{ i.price.toFixed(2) }}</span>
              </v-col>
              <v-col cols="4">
                <CartAmount :cartItem="i" />
              </v-col>
              <v-col class="text-right">
                <span>$ {{ (i.amount * i.price ).toFixed(2) }}</span>
              </v-col>
            </v-row>
            <v-row class="total">
              <v-col cols="9">
                <span>Grand total</span>
              </v-col>
              <v-col cols="3" class="text-right">
                <span>$ {{ grandTotal }}</span>
              </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="$store.dispatch('toggleCart', false)"
          >Continue Shopping</v-btn>

          <v-btn color="green darken-1" text>Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-text>
</template>

<script>
import CartAmount from "../components/CartAmount.vue";

export default {
  name: "cart",
  computed: {
    dialog() {
      return this.$store.state.basket.show;
    },
    items() {
      return this.$store.state.basket.items;
    },
    grandTotal() {
      return this.items
        .map(item => {
          return (item.total = item.price * item.amount);
        })
        .reduce((accum, value) => {
          return accum + value;
        }, 0)
        .toFixed(2);
    }
  },
  components: {
    CartAmount
  }
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid red;
}
.total {
  border-top: 3px solid pink;
}
</style>