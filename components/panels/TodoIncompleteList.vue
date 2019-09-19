<template>
  <collapse-panel icon="checkbox-blank-outline" :title="title">
    <div v-if="isEmpty" class="panel-block">
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
import { mapGetters } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
import TodoListItem from '~/components/common/TodoListItem'
export default {
  components: {
    CollapsePanel,
    TodoListItem
  },
  computed: {
    ...mapGetters('todo', { items: 'incompleteItems' }),
    title() {
      return `未完了（${this.items.length}）`
    },
    isEmpty() {
      return this.items.length === 0
    }
  }
}
</script>
