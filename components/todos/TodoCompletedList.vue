<template>
  <collapse-panel icon="checkbox-marked-outline" :title="title">
    <div v-if="isEmpty" class="panel-block">
      中に誰もいませんよ。
    </div>
    <todo-list-item
      v-for="item of items"
      v-else
      :key="`completed-${item.id}`"
      :item="item"
    />
  </collapse-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
import TodoListItem from '~/components/todos/TodoListItem'
export default {
  components: {
    CollapsePanel,
    TodoListItem
  },
  computed: {
    ...mapGetters('todos', { items: 'completedItems' }),
    title() {
      return `完了（${this.items.length}）`
    },
    isEmpty() {
      return this.items.length === 0
    }
  }
}
</script>
