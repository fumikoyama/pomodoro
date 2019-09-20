<template>
  <section class="section">
    <h1 class="title">
      <b-icon icon="home"></b-icon>
      ホーム
    </h1>
    <hr />
    <div class="columns">
      <div class="column">
        <room />
      </div>
      <div class="column">
        <timer />
        <schedule />
        <options />
      </div>
    </div>
  </section>
</template>

<script>
import Schedule from '~/components/panels/Schedule'
import Room from '~/components/panels/Room'
import Timer from '~/components/panels/Timer'
import Options from '~/components/panels/Options'
export default {
  components: {
    Schedule,
    Room,
    Timer,
    Options
  }
}
</script>
