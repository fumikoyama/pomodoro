<template>
  <b-collapse
    aria-id="completedList"
    class="panel"
    :open.sync="isCompletedListOpen"
  >
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="completedList"
    >
      <b-icon icon="checkbox-marked-outline"></b-icon>
      <strong>完了</strong>
      <b-icon
        :icon="isCompletedListOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
    <div v-if="completedItems.length === 0" class="panel-block">
      中に誰もいませんよ
    </div>
    <todo-list-item
      v-for="item of completedItems"
      v-else
      :key="item.id"
      :item="item"
    />
  </b-collapse>
</template>
<script>
import TodoListItem from '~/components/TodoListItem'
export default {
  components: {
    TodoListItem
  },
  data() {
    return {
      isCompletedListOpen: true
    }
  },
  computed: {
    completedItems() {
      return this.$parent.items.filter((x) => x.checked)
    }
  }
}
</script>
