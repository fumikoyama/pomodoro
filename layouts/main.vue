<template>
  <div>
    <section class="section hero">
      <header class="hero-head">
        <titlebar />
      </header>
      <main class="hero-body">
        <nuxt />
      </main>
    </section>
    <navbar />
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
