<template>
  <b-tabs v-model="activeTab" type="is-toggle" expanded>
    <b-tab-item
      :visible="$store.state.settings.useTodo"
      label="Todos"
      icon="format-list-checkbox"
    >
      <todo-list />
    </b-tab-item>
    <b-tab-item label="Home" :icon="homeIcon">
      <home />
    </b-tab-item>
    <b-tab-item label="Settings" icon="tune">
      <settings />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TodoList from '~/components/TodoList'
import Home from '~/components/Home'
import Settings from '~/components/Settings'
export default {
  components: {
    TodoList,
    Home,
    Settings
  },
  computed: {
    ...mapGetters('timer', ['end']),
    homeIcon() {
      return this.end ? 'bell-ring' : 'home'
    },
    activeTab: {
      get() {
        return this.$store.state.tabs.activeTab
      },
      set(value) {
        this.setActiveTab(value)
      }
    }
  },
  methods: mapActions('tabs', ['setActiveTab'])
}
</script>
