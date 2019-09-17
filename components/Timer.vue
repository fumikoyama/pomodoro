<template>
  <collapse-panel icon="timer" title="タイマー">
    <template v-if="$store.getters['schedule/isTest']">
      <div class="panel-block">
        {{ `経過した時間[分]：${$store.getters['timer/timeStr']}` }}
      </div>
      <div class="panel-block">
        {{ `中断された時間[分]：${paused}` }}
      </div>
      <div class="panel-block">
        {{ `中断された回数：${pausedCount}` }}
      </div>
      <div v-if="$store.getters['timer/end']" class="panel-block">
        <button
          class="button is-success is-outlined is-fullwidth"
          @click="stop"
        >
          終了
        </button>
      </div>
      <template v-else-if="$store.getters['timer/isRunning']">
        <div class="panel-block">
          <button
            class="button is-link is-outlined is-fullwidth"
            :disabled="!isPause"
            @click="restart"
          >
            再開
          </button>
        </div>
        <div class="panel-block">
          <button
            class="button is-link is-outlined is-fullwidth"
            :disabled="isPause"
            @click="pause"
          >
            中断
          </button>
        </div>
        <div class="panel-block">
          <button
            class="button is-link is-outlined is-fullwidth"
            @click="clear"
          >
            リセット
          </button>
        </div>
      </template>
      <div v-else class="panel-block">
        <button class="button is-link is-outlined is-fullwidth" @click="start">
          開始
        </button>
      </div>
    </template>
    <div v-else-if="$store.getters['schedule/isCreated']" class="panel-block">
      スケジュールを再作成してください。
    </div>
    <div v-else class="panel-block">
      スケジュールを作成してください。
    </div>
  </collapse-panel>
</template>

<script>
import CollapsePanel from '~/components/CollapsePanel'
export default {
  components: {
    CollapsePanel
  },
  computed: {
    elapsed() {
      return this.$store.state.timer.elapsed
    },
    paused() {
      return this.$store.state.timer.paused
    },
    pausedCount() {
      return this.$store.state.timer.pausedCount
    },
    isPause() {
      return this.$store.state.timer.isPause
    },
    currentSchedule() {
      return this.$store.getters['schedule/current']
    }
  },
  methods: {
    start() {
      // タイマー開始
      this.$store.commit('timer/start', this.currentSchedule.time)
    },
    restart() {
      this.$store.commit('timer/restart')
    },
    pause() {
      this.$store.commit('timer/pause')
    },
    stop() {
      this.$store.commit('timer/stop')
      this.$store.commit('schedule/sex')
    },
    clear() {
      this.$store.commit('timer/clear')
    }
  }
}
</script>
