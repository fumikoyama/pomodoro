<template>
  <section class="section hero">
    <header class="hero-head">
      <div class="has-text-centered">
        <h1 class="title">
          <b-icon icon="home"></b-icon>
          Home
        </h1>
        <hr />
      </div>
    </header>
    <section class="hero-body">
      <div class="">
        <div class="columns">
          <room class="column" />
          <timer class="column" />
          <schedule class="column is-4" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Schedule from '~/components/panels/Schedule'
import Room from '~/components/panels/Room'
import Timer from '~/components/panels/Timer'
export default {
  layout: 'main',
  components: {
    Schedule,
    Room,
    Timer
  }
}
</script>
