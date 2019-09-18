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
import CollapsePanel from '~/components/CollapsePanel'
export default {
  components: {
    CollapsePanel
  },
  computed: {
    selectedId: {
      get() {
        return this.$store.state.todo.selectedId
      },
      set(value) {
        this.$store.commit('todo/setSelectedId', value)
      }
    },
    items() {
      return this.$store.getters['todo/incompleteItems']
    },
    isEmpty() {
      return this.items.length === 0
    }
  },
  methods: {
    update() {
      this.$buefy.dialog.confirm({
        message: '完了にしちゃう?',
        onConfirm: () => {
          this.$store.commit('todo/changeCheckState', {
            id: this.selectedId,
            value: true
          })
        }
      })
    },
    showTodos() {
      this.$store.commit('tabs/showTodo')
    },
    todoStr(item) {
      return item.date.toLocaleDateString() + ' ' + item.note
    }
  }
}
</script>
