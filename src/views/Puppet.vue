<template>
  <div>
    <div class="container">
      <v-btn :to="{ name: 'Puppets', query: { shuffle: 'false'}}" color="primary" class="my-4">
        <h3><v-icon small class="mr-2">fas fa-chevron-left</v-icon>Back</h3>
      </v-btn>
      <div id="header" class="d-flex my-5">
        <v-img
          :src="require(`../assets/${puppet.image}`)"
          height="300"
          max-width="300"
          :position="puppet.imagePosition"
          class="mr-3"
        ></v-img>
        <div class="d-flex flex-column">
          <v-card width="400" outlined>
            <v-card-title>{{ puppet.name }}</v-card-title>
            <v-card-text>
              <v-row v-for="(h, i) in headers" :key="i">
                <v-col cols-1>
                  <h3 class="pink--text">{{ h }}</h3>
                </v-col>
                <v-col cols-9>
                  <h4>{{ content[i] }}</h4>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <Buy :puppet="puppet" class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Buy from "../components/Buy.vue";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      headers: ["description", "price", "in stock-ing"]
    };
  },
  computed: {
    content() {
      return [
        this.puppet.description,
        this.puppet.price,
        this.puppet.numberInStock + " pcs."
      ];
    },
    puppet() {
      return this.$store.getters.puppet(this.id)
    }
  },
  created() {
    this.$store.dispatch('fetchPuppets')
  },
  components: {
    Buy
  }
};
</script>

<style scoped>
.title {
  font-size: 3rem !important;
}
</style>