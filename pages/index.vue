<template>
  <b-tabs type="is-toggle" expanded>
    <b-tab-item label="Home" :icon="homeIcon">
      <home />
    </b-tab-item>
    <b-tab-item label="Settings" icon="tune">
      <settings />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
import Home from '~/components/Home'
import Settings from '~/components/Settings'
export default {
  components: {
    Home,
    Settings
  },
  computed: {
    ...mapGetters('timer', ['isOver']),
    homeIcon() {
      return this.isOver ? 'bell-ring' : 'home'
    }
  }
}
</script>
