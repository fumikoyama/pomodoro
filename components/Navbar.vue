<template>
  <footer>
    <b-tooltip label="ホームに戻る" type="is-dark">
      <b-button
        :type="homeButtonType"
        icon-right="home"
        tag="router-link"
        to="/"
      />
    </b-tooltip>
    <b-tooltip v-if="useTodo" label="Todoリストを表示する" type="is-dark">
      <b-button
        type="is-primary"
        icon-right="format-list-checkbox"
        tag="router-link"
        to="/todos"
      />
    </b-tooltip>
    <b-tooltip label="実績を表示する" type="is-dark">
      <b-button
        type="is-primary"
        icon-right="gauge"
        tag="router-link"
        to="/performance"
      />
    </b-tooltip>
    <b-tooltip label="設定を表示する" type="is-dark">
      <b-button
        type="is-primary"
        icon-right="tune"
        tag="router-link"
        to="/settings"
      />
    </b-tooltip>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('settings', ['useTodo']),
    ...mapGetters('timer', ['isOver']),
    homeButtonType() {
      return this.isOver ? 'is-danger' : 'is-primary'
    }
  }
}
</script>

<style scoped>
footer {
  margin: 0;
  padding: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #ffffff;
}
</style>
