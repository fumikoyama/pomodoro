<template>
  <b-tabs v-model="activeTab" type="is-toggle" expanded>
    <b-tab-item
      :visible="$store.state.settings.useTodo"
      label="Todos"
      icon="format-list-checkbox"
    >
      <todo-list />
    </b-tab-item>
    <b-tab-item label="Home" icon="home">
      <home />
    </b-tab-item>
    <b-tab-item label="Settings" icon="tune">
      <settings />
    </b-tab-item>
  </b-tabs>
</template>

<script>
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
    activeTab: {
      get() {
        return this.$store.state.tabs.activeTab
      },
      set(value) {
        this.$store.commit('tabs/setActiveTab', value)
      }
    }
  }
}
</script>
