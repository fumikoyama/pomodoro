<template>
  <section class="section container">
    <h1 class="title">
      <b-icon icon="home"></b-icon>
      ホーム
    </h1>
    <hr />
    <div class="columns">
      <div class="column">
        <room />
      </div>
      <div class="column is-mobile is-6">
        <timer />
        <schedule />
        <performance />
      </div>
    </div>
  </section>
</template>

<script>
import Schedule from '~/components/Schedule'
import Performance from '~/components/Performance'
import Room from '~/components/Room'
import Timer from '~/components/Timer'
export default {
  components: {
    Schedule,
    Performance,
    Room,
    Timer
  }
}
</script>
