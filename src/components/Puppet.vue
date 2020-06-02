<template>
  <div>
    <v-card height="360" max-width="240" shaped elevation="4" class="d-flex flex-column ma-3">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-img
            :src="require(`../assets/${puppet.image}`)"
            :position="puppet.imagePosition"
            min-height="200px"
            max-height="200px"
            width="300px"
          >
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#FF6699" opacity=".3">
                <v-btn :to="{ name: 'Puppet', params: { id: puppet.id } }">Click for details</v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-img>
        </template>
      </v-hover>
      <v-card-title class="pt-1 px-2 py-0">{{ puppet.name }}</v-card-title>
      <v-card-text v-html="puppet.teaser" class="px-2 pb-0"></v-card-text>

      <v-spacer />
      <v-card-actions position="bottom">
        <Buy :puppet="puppet" :showPrice="true" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Buy from "../components/Buy.vue";

export default {
  name: "puppet",
  props: {
    puppet: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    amount: 0
  }),
  methods: {
    addToBasket() {
      this.$store.dispatch("addToBasket", {
        id: this.puppet.id,
        amount: this.amount
      });
      this.amount = 0;
    }
  },
  components: {
    Buy
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
