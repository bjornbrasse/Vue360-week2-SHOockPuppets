<template>
  <div>
    <div v-if="!puppetCartItem">
      <div v-if="showBuy === false" class="d-flex">
        <v-btn @click="showBuy = true" color="primary">Buy</v-btn>
        <span v-if="showPrice" class="price ml-2 pt-3">${{ puppet.price.toFixed(2) }}</span>
      </div>
      <div v-else class="d-flex align-center">
        <v-btn @click="changeAmount(amount - 1)" v-if="!puppetCartItem" icon>
          <v-icon small color="pink">fas fa-minus</v-icon>
        </v-btn>
        <p class="outlined">{{ amount }}</p>
        <v-btn @click="changeAmount(amount + 1)" :disabled="outOfStock" icon>
          <v-icon small color="pink">fas fa-plus</v-icon>
        </v-btn>
        <v-btn @click="addToBasket" color="primary" class="ml-1">
          Add
          <v-icon class="ml-1">fas fa-cart-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <div v-else class="d-flex align-center">
      <p class="ma-0">In Cart:</p>
      <CartAmount :cartItem="puppetCartItem" :accent="true" />
    </div>
  </div>
</template>

<script>
export default {
  name: "buy",
  props: {
    puppet: {
      type: Object,
      required: true
    },
    showPrice: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data: () => ({
    amount: 1,
    cartItem: {},
    amountRequested: 1,
    plusDisabled: false,
    showBuy: false
  }),
  computed: {
    numberInStock() {
      return this.$store.getters.numberInStock(this.puppet.id);
    },
    outOfStock() {
      return this.amountRequested > this.numberInStock;
    },
    puppetCartItem() {
      return this.$store.getters.puppetCartItem(this.puppet.id);
    }
  },
  methods: {
    addToBasket() {
      this.$store.dispatch("addToBasket", {
        id: Date.now(),
        puppet: this.puppet.id,
        name: this.puppet.name,
        price: this.puppet.price,
        amount: this.amount
      });
      this.showBuy = false;
    },
    changeAmount(newAmount) {
      this.amountRequested = newAmount;
      this.amount = newAmount;

      if (newAmount === 0) {
        if (this.puppetCartItem) {
          this.$store.dispatch("removeCartItem", {
            cartItemId: this.puppetCartItem.id
          });
        }
        this.showBuy = false;
        return (this.amount = 1);
      }
      if (newAmount > this.numberInStock) {
        this.$store.dispatch("showCartMessage", {
          text: `max. ${this.puppet.numberInStock} puppets in s(t)ock`,
          color: "warning",
          timeout: 2000,
          multiline: true
        });
        this.amount = this.numberInStock;
      }
      // if (this.puppetCartItem) {
      //   return this.$store.dispatch("cartItemAmount", {
      //     cartItemId: this.puppetCartItem.id,
      //     amount: this.amount
      //   });
      // }
    }
  },
  components: {
    CartAmount: () => import("../components/CartAmount.vue")
  }
};
</script>

<style scoped>
.price {
  margin: 0;
  color: rgb(204, 60, 156);
  font-size: 1rem;
}
</style>