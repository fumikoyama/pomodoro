<template>
  <b-collapse aria-id="todoTrashList" class="panel" :open.sync="isOpen">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="todoTrashList"
    >
      <b-icon icon="delete"></b-icon>
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
      :key="`trash-${item.id}`"
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
      isOpen: false
    }
  },
  computed: {
    title() {
      return `ゴミ箱（${this.items.length}）`
    },
    items() {
      return this.$store.getters['todo/deletedItems']
    }
  }
}
</script>
