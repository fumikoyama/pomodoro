<template>
  <b-collapse aria-id="schedule" class="panel" :open.sync="isOpen">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="schedule"
    >
      <b-icon icon="calendar-clock"></b-icon>
      <strong>スケジュール</strong>
      <b-icon
        :icon="isOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
    <div
      v-for="pomo in pomoList"
      :key="pomo.no"
      class="panel-block"
      :class="{ 'has-background-success': pomo.completed }"
    >
      <b-icon v-if="pomo.completed" icon="checkbox-marked-outline"></b-icon>
      <b-icon v-else icon="checkbox-blank-outline"></b-icon>
      {{ pomo.title + '（' + pomo.time + '分）' }}
    </div>
  </b-collapse>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      pomoList: [
        {
          no: 1,
          title: '1ポモ目',
          time: 25,
          break: false,
          completed: true
        },
        {
          no: 2,
          title: '休憩タイム',
          time: 5,
          break: true,
          completed: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.content-right {
  margin: 0 0 0 auto;
}
</style>
