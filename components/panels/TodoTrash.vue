<template>
  <collapse-panel icon="delete" :title="title">
    <div v-if="isEmpty" class="panel-block">
      中に誰もいませんよ
    </div>
    <todo-list-item
      v-for="item of items"
      v-else
      :key="`trash-${item.id}`"
      :item="item"
    />
  </collapse-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
import TodoListItem from '~/components/common/TodoListItem'
export default {
  components: {
    CollapsePanel,
    TodoListItem
  },
  computed: {
    ...mapGetters('todos', { items: 'deletedItems' }),
    title() {
      return `ゴミ箱（${this.items.length}）`
    },
    isEmpty() {
      return this.items.length === 0
    }
  }
}
</script>
