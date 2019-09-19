<template>
  <collapse-panel icon="gauge" title="実績" :is-open="false">
    <div class="panel-block">
      完了したポモ回数
    </div>
    <div class="panel-block">
      完了したポモ時間の累計
    </div>
    <div class="panel-block">
      中断された回数
    </div>
    <div class="panel-block">
      中断された時間の累計
    </div>
    <div class="panel-block">
      コメント
    </div>
  </collapse-panel>
</template>

<script>
import CollapsePanel from '~/components/common/CollapsePanel'
export default {
  components: {
    CollapsePanel
  }
}
</script>
