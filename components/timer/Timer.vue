<template>
  <collapse-panel :icon="icon" :title="title">
    <div v-if="isEmpty" class="panel-block">
      スケジュールを作成してね。
    </div>
    <div v-else-if="isCompleted" class="panel-block">
      スケジュールを再作成してね。
    </div>
    <template v-else>
      <div class="panel-block">
        <timer-display class="container has-text-centered is-size-2 box" />
      </div>
      <div v-if="isOver" class="panel-block">
        <b-button class="is-fullwidth" type="is-danger" outlined @click="stop">
          <b-icon icon="stop" />
        </b-button>
      </div>
      <template v-else-if="isStarted">
        <div class="panel-block">
          <b-button
            class="is-fullwidth"
            type="is-success"
            outlined
            :disabled="!isPause"
            @click="restart"
          >
            <b-icon icon="replay"></b-icon>
          </b-button>
        </div>
        <div class="panel-block">
          <b-button
            class="is-fullwidth"
            type="is-danger"
            outlined
            :disabled="isPause"
            @click="pause"
          >
            <b-icon icon="pause" />
          </b-button>
        </div>
        <div class="panel-block">
          <b-button class="is-fullwidth" type="is-link" outlined @click="clear">
            <b-icon icon="step-backward"></b-icon>
          </b-button>
        </div>
      </template>
      <div v-else class="panel-block">
        <b-button
          class="is-fullwidth"
          type="is-success"
          outlined
          @click="start"
        >
          <b-icon icon="play"></b-icon>
        </b-button>
      </div>
    </template>
  </collapse-panel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
import TimerDisplay from '~/components/timer/TimerDisplay'
export default {
  components: {
    CollapsePanel,
    TimerDisplay
  },
  computed: {
    ...mapGetters('timer', [
      'isStarted',
      'isPause',
      'elapsedStr',
      'disturbedStr',
      'isOver',
      'isStarted'
    ]),
    ...mapGetters('schedule', ['isCompleted', 'isEmpty', 'isBreak']),
    icon() {
      if (this.isPause || !this.isStarted) {
        return 'timer-off'
      }
      return 'timer'
    },
    title() {
      if (this.isPause) {
        return 'タイマー（中断中）'
      }
      return 'タイマー'
    }
  },
  methods: mapActions('timer', ['start', 'restart', 'pause', 'stop', 'clear'])
}
</script>
