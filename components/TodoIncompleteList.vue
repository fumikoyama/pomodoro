<template>
  <collapse-panel icon="checkbox-blank-outline" :title="title">
    <div v-if="items.length === 0" class="panel-block">
      中に誰もいませんよ
    </div>
    <todo-list-item
      v-for="item of items"
      v-else
      :key="`incomplete-${item.id}`"
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
      return `未完了（${this.items.length}）`
    },
    items() {
      return this.$store.getters['todo/incompleteItems']
    }
  }
}
</script>
