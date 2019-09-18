<template>
  <collapse-panel icon="calendar-clock" title="スケジュール">
    <schedule-item
      v-for="item in list"
      :key="`schedule-${item.no}`"
      :item="item"
    />
    <div class="panel-block">
      <b-button
        v-if="isEmpty"
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
import { mapState, mapGetters, mapActions } from 'vuex'
import CollapsePanel from '~/components/CollapsePanel'
import ScheduleItem from '~/components/ScheduleItem'
export default {
  components: {
    CollapsePanel,
    ScheduleItem
  },
  computed: {
    ...mapState('schedule', ['list']),
    ...mapGetters('schedule', ['isEmpty'])
  },
  methods: {
    ...mapActions('schedule', ['create']),
    recreate() {
      this.$buefy.dialog.confirm({
        message: 'スケジュール作り直す?',
        type: 'is-danger',
        onConfirm: () => this.create()
      })
    }
  }
}
</script>
