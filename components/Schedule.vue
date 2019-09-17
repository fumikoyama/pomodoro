<template>
  <collapse-panel icon="calendar-clock" title="スケジュール">
    <schedule-item
      v-for="item in list"
      :key="`schedule-${item.no}`"
      :item="item"
    />
    <div class="panel-block">
      <button
        v-if="list.length === 0"
        class="button is-success is-fullwidth"
        @click="create"
      >
        スケジュールの作成
      </button>
      <button v-else class="button is-info is-fullwidth" @click="recreate">
        スケジュールの再作成
      </button>
    </div>
  </collapse-panel>
</template>

<script>
import CollapsePanel from '~/components/CollapsePanel'
import ScheduleItem from '~/components/ScheduleItem'
export default {
  components: {
    CollapsePanel,
    ScheduleItem
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
        type: 'is-danger',
        onConfirm: () => {
          const settings = this.$store.getters['settings/pomoSettings']
          this.$store.commit('schedule/create', settings)
        }
      })
    }
  }
}
</script>
