<template>
  <collapse-panel icon="format-list-checkbox" title="Todo">
    <div v-if="isEmpty" class="panel-block">
      <b-button
        class="is-fullwidth"
        type="is-primary"
        outlined
        @click="showTodos"
      >
        Todo を作成してください
      </b-button>
    </div>
    <template v-else>
      <div class="panel-block">
        <b-select v-model="selectedId" expanded>
          <option :key="`todo-select-0`" :value="0">
            未選択
          </option>
          <option
            v-for="item in items"
            :key="`todo-select-${item.id}`"
            :value="item.id"
          >
            {{ todoStr(item) }}
          </option>
        </b-select>
      </div>
      <div class="panel-block">
        <b-button
          class="is-fullwidth"
          type="is-link"
          outlined
          :disabled="selectedId === 0"
          @click="update"
        >
          完了
        </b-button>
      </div>
    </template>
  </collapse-panel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
export default {
  components: {
    CollapsePanel
  },
  computed: {
    ...mapGetters('todo', { items: 'incompleteItems' }),
    selectedId: {
      get() {
        return this.$store.state.todo.selectedId
      },
      set(value) {
        this.setSelectedId(value)
      }
    },
    isEmpty() {
      return this.items.length === 0
    }
  },
  methods: {
    ...mapActions('tabs', ['showTodos']),
    ...mapActions('todo', ['changeCheckState', 'setSelectedId']),
    update() {
      this.$buefy.dialog.confirm({
        message: '完了にしちゃう?',
        onConfirm: () => {
          this.changeCheckState({ id: this.selectedId, value: true })
        }
      })
    },
    todoStr(item) {
      return item.date.toLocaleDateString() + ' ' + item.note
    }
  }
}
</script>
