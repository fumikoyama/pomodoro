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
import CollapsePanel from '~/components/CollapsePanel'
import TodoListItem from '~/components/TodoListItem'
export default {
  components: {
    CollapsePanel,
    TodoListItem
  },
  computed: {
    title() {
      return `ゴミ箱（${this.items.length}）`
    },
    items() {
      return this.$store.getters['todo/deletedItems']
    },
    isEmpty() {
      return this.items.length === 0
    }
  }
}
</script>
