<template>
  <collapse-panel icon="timer" title="タイマー">
    <div class="panel-block">
      時間
    </div>
    <div class="panel-block">
      中断された時間
    </div>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth">
        中断
      </button>
      <button class="button is-link is-outlined is-fullwidth">
        開始/再開
      </button>
    </div>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth">
        停止
      </button>
    </div>
  </collapse-panel>
</template>

<script>
import CollapsePanel from '~/components/CollapsePanel'
export default {
  components: {
    CollapsePanel
  }
}
</script>
