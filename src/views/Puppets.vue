<template>
  <div class="page-content">
    <div id="header">
      <p>These are all the beautiful puppets in our store, well crafted and hand made...</p>
    </div>
    <div id="puppets" class="d-flex flex-wrap mx-4 mb-12">
      <Puppet
        v-for="puppet in puppets"
        :key="puppet.id"
        :puppet="puppet"
        @save="saveScrollPosition"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "puppets",
  props: {
    shuffle: {
      type: String,
      required: false
    }
  },
  data: () => ({}),
  computed: {
    puppets() {
      return this.$store.state.puppets;
    }
  },
  methods: {
    saveScrollPosition() {
      let el = document.querySelector(".page-content");
      //  return { x: el.scrollLeft, y: el.scrollTop }
      console.log({ x: el.scrollLeft, y: el.scrollTop });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.shuffle === "true") {
        vm.$store.dispatch("randomizePuppets");
      }
    });
  },
  created() {
    this.$store.dispatch("fetchPuppets");
  },
  components: {
    Puppet: () => import("../components/Puppet.vue")
  }
};
</script>

<style scoped>
#header {
  margin: 20px;
  padding: 10px 40px;
  border: 1px solid rgb(165, 165, 165);
  border-radius: 14px;
}
#header p {
  margin: 0;
  font-size: 1.2em;
  text-align: center;
}
</style>