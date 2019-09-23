<template>
  <div class="columns">
    <timer class="column" />
    <schedule class="column" />
    <room class="column" />
  </div>
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
