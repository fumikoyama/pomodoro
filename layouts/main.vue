<template>
  <section class="section hero">
    <titlebar class="hero-head" />
    <main class="hero-body">
      <nuxt />
    </main>
    <navbar class="hero-foot" />
  </section>
</template>

<script>
import Titlebar from '~/components/Titlebar'
import Navbar from '~/components/Navbar'
export default {
  components: {
    Titlebar,
    Navbar
  }
}
</script>

<style scoped>
.section {
  margin-top: -32px;
}
</style>

<style scoped>
.hero-foot {
  margin: 0;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: #ffffff;
  text-align: center;
}
</style>
