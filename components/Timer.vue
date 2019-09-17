<template>
  <b-collapse aria-id="timer" class="panel" :open.sync="isOpen">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="timer"
    >
      <b-icon icon="timer"></b-icon>
      <strong>タイマー</strong>
      <b-icon
        :icon="isOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
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
