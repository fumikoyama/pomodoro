<template>
  <b-collapse aria-id="schedule" class="panel" :open.sync="isOpen">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="schedule"
    >
      <b-icon icon="calendar-clock"></b-icon>
      <strong>スケジュール</strong>
      <b-icon
        :icon="isOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
    <schedule-item
      v-for="item in list"
      :key="`schedule-${item.no}`"
      :item="item"
    />
    <div class="panel-block">
      <button
        v-if="list.length === 0"
        class="button is-link is-outlined is-fullwidth"
        @click="create"
      >
        スケジュールの作成
      </button>
      <button
        v-else
        class="button is-danger is-outlined is-fullwidth"
        @click="recreate"
      >
        スケジュールの再作成
      </button>
    </div>
  </b-collapse>
</template>

<script>
import ScheduleItem from '~/components/ScheduleItem'
export default {
  components: {
    ScheduleItem
  },
  data() {
    return {
      isOpen: true
    }
  },
  computed: {
    list() {
      return this.$store.state.schedule.list
    }
  },
  methods: {
    create() {
      const settings = this.$store.getters['settings/pomoSettings']
      this.$store.commit('schedule/create', settings)
    },
    recreate() {
      this.$buefy.dialog.confirm({
        message: 'スケージュール作り直す?',
        onConfirm: () => {
          const settings = this.$store.getters['settings/pomoSettings']
          this.$store.commit('schedule/create', settings)
        }
      })
    }
  }
}
</script>
