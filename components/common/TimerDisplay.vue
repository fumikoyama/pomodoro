<template>
  <div class="panel-block">
    <div
      class="container has-text-centered is-size-2 box is-family-monospace"
      :class="style"
    >
      {{ displayTime }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('timer', [
      'isStarted',
      'isPause',
      'elapsedStr',
      'disturbedStr',
      'isOver',
      'isStarted'
    ]),
    style() {
      if (this.isPause) {
        return ['has-background-warning']
      }
      if (this.isOver) {
        return ['has-background-dark', 'has-text-danger']
      }
      return ['has-background-light']
    },
    displayTime() {
      if (this.isPause) {
        return this.disturbedStr
      }
      return this.elapsedStr
    }
  }
}
</script>
