<template>
  <section class="section">
    <h1 class="title">
      <b-icon icon="home"></b-icon>
      ホーム
    </h1>
    <hr />
    <div class="columns">
      <div class="column">
        <timer />
        <schedule />
      </div>
      <div class="column is-5">
        <room />
      </div>
      <div class="column">
        <todo-select v-if="useTodo" />
        <performance />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Schedule from '~/components/Schedule'
import Performance from '~/components/Performance'
import Room from '~/components/Room'
import Timer from '~/components/Timer'
import TodoSelect from '~/components/TodoSelect'
export default {
  components: {
    Schedule,
    Performance,
    Room,
    Timer,
    TodoSelect
  },
  computed: mapState('settings', ['useTodo'])
}
</script>
