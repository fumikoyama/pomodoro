<template>
  <b-collapse aria-id="performance" class="panel" :open.sync="isOpen">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="performance"
    >
      <b-icon icon="gauge"></b-icon>
      <strong>実績</strong>
      <b-icon
        :icon="isOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
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
  </b-collapse>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true
    }
  }
}
</script>
