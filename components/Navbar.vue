<template>
  <footer>
    <b-button
      size="is-medium"
      :type="homeButtonType"
      icon-right="home"
      tag="router-link"
      to="/"
    />
    <b-button
      size="is-medium"
      type="is-light"
      icon-right="format-list-checkbox"
      tag="router-link"
      to="/todos"
    />
    <b-button
      size="is-medium"
      type="is-light"
      icon-right="gauge"
      tag="router-link"
      to="/performance"
    />
    <b-button
      size="is-medium"
      type="is-light"
      icon-right="tune"
      tag="router-link"
      to="/settings"
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
