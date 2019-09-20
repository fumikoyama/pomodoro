<template>
  <collapse-panel icon="format-list-checkbox" title="オプション">
    <performance />
    <todos v-if="useTodo" />
    <div v-if="useTodo" class="panel-block">
      <b-button
        class="is-fullwidth"
        type="is-primary"
        outlined
        @click="todosOpen"
      >
        Todoリストを表示する
      </b-button>
    </div>
    <div class="panel-block">
      <b-button
        class="is-fullwidth"
        type="is-primary"
        outlined
        @click="performanceOpen"
      >
        実績を表示する
      </b-button>
    </div>
  </collapse-panel>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
import Performance from '~/components/modal/Performance'
import Todos from '~/components/modal/Todos'
export default {
  components: {
    CollapsePanel,
    Performance,
    Todos
  },
  computed: {
    ...mapState('settings', ['useTodo'])
  },
  methods: {
    ...mapActions('todos', { todosOpen: 'open' }),
    ...mapActions('performance', { performanceOpen: 'open' })
  }
}
</script>
