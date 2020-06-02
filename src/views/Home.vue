<template>
  <div class="d-flex flex-column align-center">
    <v-img @click="go" :src="require('../assets/puppets.png')" :width="imageWidth" class="mr-10"></v-img>
    <v-btn @click="go" color="primary" :width="imageWidth - 200" class="mt-8">Go to Puppets</v-btn>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    imageWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "400";
        case "sm":
          return "600";
        case "lg":
          return "800";
        default:
          return "800";
      }
    }
  },
  methods: {
    go() {
      this.$router.push({ name: "Puppets", query: { shuffle: 'true' }});
    }
  }
};
</script>
