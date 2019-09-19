<template>
  <collapse-panel icon="gauge" title="実績" :is-open="true">
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
  </collapse-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
export default {
  components: {
    CollapsePanel
  },
  computed: {
    ...mapGetters('performance', [
      'totalPomoCount',
      'totalDisturbedCount',
      'totalBreakCount',
      'totalElapsed',
      'totalDisturbed',
      'totalBreakTime',
      'totalOverTime'
    ])
  }
}
</script>
