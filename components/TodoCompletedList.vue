<template>
  <collapse-panel icon="checkbox-marked-outline" :title="title">
    <div v-if="isEmpty" class="panel-block">
      中に誰もいませんよ
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
import CollapsePanel from '~/components/CollapsePanel'
import TodoListItem from '~/components/TodoListItem'
export default {
  components: {
    CollapsePanel,
    TodoListItem
  },
  computed: {
    title() {
      return `完了（${this.items.length}）`
    },
    items() {
      return this.$store.getters['todo/completedItems']
    },
    isEmpty() {
      return this.items.length === 0
    }
  }
}
</script>
