<template>
  <footer>
    <b-button
      size="is-medium"
      :type="homeButtonType"
      icon-right="home"
      tag="router-link"
      to="/"
      aria-label="ホームを表示する"
      :disabled="disabled('index')"
    />
    <b-button
      v-if="useTodo"
      size="is-medium"
      type="is-light"
      icon-right="format-list-checkbox"
      tag="router-link"
      to="/todos"
      aria-label="Todoリストを表示する"
      :disabled="disabled('todos')"
    />
    <b-button
      size="is-medium"
      type="is-light"
      icon-right="gauge"
      tag="router-link"
      to="/performance"
      aria-label="実績を表示する"
      :disabled="disabled('performance')"
    />
    <b-button
      size="is-medium"
      type="is-light"
      icon-right="tune"
      tag="router-link"
      to="/settings"
      aria-label="設定を表示する"
      :disabled="disabled('settings')"
    />
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('settings', ['useTodo']),
    ...mapGetters('timer', ['isOver']),
    homeButtonType() {
      return this.isOver ? 'is-danger' : 'is-light'
    }
  },
  methods: {
    disabled(name) {
      return this.$route.name === name
    }
  }
}
</script>

<style scoped>
footer {
  margin: 0;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: #ffffff;
  text-align: center;
}
</style>
