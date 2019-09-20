<template>
  <b-modal :active.sync="isActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <h1 class="modal-card-title">
          <b-icon icon="format-list-checkbox"></b-icon>
          実績
        </h1>
      </header>
      <section class="modal-card-body">
        <div class="panel-block">
          {{ `完了したポモ回数：${totalPomoCount}` }}
        </div>
        <div class="panel-block">
          {{ `完了したポモ時間：${totalElapsed}` }}
        </div>
        <div class="panel-block">
          {{ `中断された回数：${totalDisturbedCount}` }}
        </div>
        <div class="panel-block">
          {{ `中断された時間：${totalDisturbed}` }}
        </div>
        <div class="panel-block">
          {{ `超過した時間：${totalOverTime}` }}
        </div>
        <div class="panel-block">
          {{ `休憩回数：${totalBreakCount}` }}
        </div>
        <div class="panel-block">
          {{ `休憩時間：${totalBreakTime}` }}
        </div>
        <div class="panel-block">
          <b-button
            class="is-fullwidth"
            type="is-link"
            outlined
            :disabled="!canClear"
            @click="clear"
          >
            クリア
          </b-button>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button type="is-link" @click="close">閉じる</b-button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('performance', [
      'totalPomoCount',
      'totalDisturbedCount',
      'totalBreakCount',
      'totalElapsed',
      'totalDisturbed',
      'totalBreakTime',
      'totalOverTime',
      'canClear'
    ]),
    isActive: {
      get() {
        return this.$store.state.performance.isActive
      },
      set(value) {
        this.close()
      }
    }
  },
  methods: mapActions('performance', ['clear', 'close'])
}
</script>
