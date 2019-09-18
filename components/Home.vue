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
      <div class="column">
        <timer />
        <todo-select v-if="$store.state.settings.useTodo" />
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
import TodoSelect from '~/components/TodoSelect'
export default {
  components: {
    Schedule,
    Performance,
    Room,
    Timer,
    TodoSelect
  }
}
</script>
