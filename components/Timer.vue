<template>
  <collapse-panel icon="timer" title="タイマー">
    <div v-if="isEmpty" class="panel-block">
      スケジュールを作成してください。
    </div>
    <div v-else-if="isCompleted" class="panel-block">
      スケジュールを再作成してください。
    </div>
    <template v-else>
      <div class="panel-block">
        <div class="container has-text-centered is-size-2 is-family-monospace">
          {{ `${timeStr}` }}
        </div>
      </div>
      <div v-if="end" class="panel-block">
        <b-button class="is-fullwidth" type="is-success" outlined @click="stop">
          終了
        </b-button>
      </div>
      <template v-else-if="isStarted">
        <div class="panel-block">
          <b-button
            class="is-fullwidth"
            type="is-link"
            outlined
            :disabled="!isPause"
            @click="restart"
          >
            再開
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
            中断
          </b-button>
        </div>
        <div class="panel-block">
          <b-button class="is-fullwidth" type="is-link" outlined @click="clear">
            リセット
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
          開始
        </b-button>
      </div>
    </template>
  </collapse-panel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CollapsePanel from '~/components/CollapsePanel'
export default {
  components: {
    CollapsePanel
  },
  computed: {
    ...mapGetters('timer', ['isPause', 'timeStr', 'end', 'isStarted']),
    ...mapGetters('schedule', ['isCompleted', 'isEmpty'])
  },
  methods: mapActions('timer', ['start', 'restart', 'pause', 'stop', 'clear'])
}
</script>
