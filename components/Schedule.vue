<template>
  <collapse-panel icon="calendar-clock" title="スケジュール">
    <schedule-item
      v-for="item in list"
      :key="`schedule-${item.no}`"
      :item="item"
    />
    <div class="panel-block">
      <b-button
        v-if="list.length === 0"
        class="is-fullwidth"
        type="is-success"
        @click="create"
      >
        スケジュールの作成
      </b-button>
      <b-button v-else class="is-fullwidth" type="is-info" @click="recreate">
        スケジュールの再作成
      </b-button>
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
