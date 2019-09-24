<template>
  <div>
    <section class="section hero">
      <titlebar class="hero-head" />
      <main class="hero-body">
        <nuxt />
      </main>
    </section>
    <navbar class="footer" />
  </div>
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
.hero-body {
  margin-top: -24px;
}
.footer {
  margin: 0;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: #ffffff;
  text-align: center;
}
</style>
