<template>
  <div class="container">
    <timer />
    <schedule />
  </div>
</template>

<script>
import Schedule from '~/components/schedule/Schedule'
import Timer from '~/components/timer/Timer'
export default {
  layout: 'main',
  components: {
    Schedule,
    Timer
  }
}
</script>
