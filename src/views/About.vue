<template>
  <div class="container ma-10">
    <v-btn v-if="back" :to="{ name: 'Puppets', query: { shuffle: 'false' }}" color="primary" class="mb-4"><v-icon small class="mr-2">fas fa-chevron-left</v-icon> Back</v-btn>
    <h1>About</h1>
    <p>Welcome to the puppets site. Here you'll meet our best collecton of puppets. They are smart, sweet and very likeable. All of them are 100% handmade. All puppets are made from recycled, but carefully washed, socks, which makes them very environmentally friendly.</p>
    <p>These happy, fun and nice creatures want a new life. One in which they van perform their great muscial talent. Will you take care of them?</p>
    <h3>Contact</h3>
    <p>You can reach us by e-mail of phone: dial 1-800-shockpuppets.</p>
    <h3>Disclaimer</h3>
    <p class="border mx-auto" v-html="'<span>This website is 100% fake. It\'s a study assignment in het Erik Hanchett Vue 360 course. <br />Images were downloaded from google (mainly Pinterest) and won\'t be used for commercial purposes.</span>'">
    </p>
  </div>
</template>

<script>
export default {
  name: "about",
  data: () => ({
    back: false
  }),
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'Puppets') vm.back = true
    })
  }
};
</script>

<style scoped>
h3 {
  margin-top: 30px;
  color: rgb(136, 136, 136);
}
.border {
  padding: 10px 20px;
  width: 800px;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: grey;
  color: #fff;
  text-align: center;
}
</style>