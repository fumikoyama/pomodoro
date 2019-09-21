<template>
  <collapse-panel icon="format-list-checkbox" title="オプション">
    <b-modal
      :active.sync="isActive"
      has-modal-card
      full-screen
      :can-cancel="false"
    >
      <todos v-if="useTodo && selected === 1" />
      <performance v-if="selected === 2" />
      <settings v-if="selected === 3" />
    </b-modal>
    <div v-if="useTodo" class="panel-block">
      <b-button
        class="is-fullwidth"
        type="is-primary"
        outlined
        @click="open(1)"
      >
        Todoリストを表示する
      </b-button>
    </div>
    <div class="panel-block">
      <b-button
        class="is-fullwidth"
        type="is-primary"
        outlined
        @click="open(2)"
      >
        実績を表示する
      </b-button>
    </div>
    <div class="panel-block">
      <b-button
        class="is-fullwidth"
        type="is-primary"
        outlined
        @click="open(3)"
      >
        設定を表示する
      </b-button>
    </div>
  </collapse-panel>
</template>

<script>
import { mapState } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
import Performance from '~/components/modal/Performance'
import Todos from '~/components/modal/Todos'
import settings from '~/components/modal/Settings'
export default {
  components: {
    CollapsePanel,
    Performance,
    Todos,
    settings
  },
  data() {
    return {
      isActive: false,
      selected: null
    }
  },
  computed: mapState('settings', ['useTodo']),
  methods: {
    open(value) {
      this.selected = value
      this.isActive = true
    }
  }
}
</script>
