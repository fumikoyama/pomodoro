<template>
  <section
    v-touch:swipe.left="() => $router.push('/settings')"
    v-touch:swipe.right="() => $router.push('/todos')"
    class="section hero"
  >
    <header class="hero-head">
      <div class="container has-text-centered">
        <h1 class="title">
          <b-icon icon="format-list-checkbox"></b-icon>
          実績
        </h1>
        <hr />
      </div>
    </header>
    <section class="hero-body">
      <div class="container">
        <div class="box">
          {{ `完了したポモ回数：${totalPomoCount}` }}
        </div>
        <div class="box">
          {{ `完了したポモ時間：${totalElapsed}` }}
        </div>
        <div class="box">
          {{ `中断された回数：${totalDisturbedCount}` }}
        </div>
        <div class="box">
          {{ `中断された時間：${totalDisturbed}` }}
        </div>
        <div class="box">
          {{ `超過した時間：${totalOverTime}` }}
        </div>
        <div class="box">
          {{ `休憩回数：${totalBreakCount}` }}
        </div>
        <div class="box">
          {{ `休憩時間：${totalBreakTime}` }}
        </div>
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
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'main',
  computed: mapGetters('performance', [
    'totalPomoCount',
    'totalDisturbedCount',
    'totalBreakCount',
    'totalElapsed',
    'totalDisturbed',
    'totalBreakTime',
    'totalOverTime',
    'canClear'
  ]),
  methods: mapActions('performance', ['clear'])
}
</script>
