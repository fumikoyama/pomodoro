<template>
  <b-collapse aria-id="todoCompletedList" class="panel" :open.sync="isOpen">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="todoCompletedList"
    >
      <b-icon icon="checkbox-marked-outline"></b-icon>
      <strong>{{ title }}</strong>
      <b-icon
        :icon="isOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
    <div v-if="items.length === 0" class="panel-block">
      中に誰もいませんよ
    </div>
    <todo-list-item
      v-for="item of items"
      v-else
      :key="`completed-${item.id}`"
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
      isOpen: true
    }
  },
  computed: {
    title() {
      return `完了（${this.items.length}）`
    },
    items() {
      return this.$store.getters['todo/completedItems']
    }
  }
}
</script>
