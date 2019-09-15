<template>
  <b-collapse
    aria-id="inCompleteList"
    class="panel"
    :open.sync="isInCompleteListOpen"
  >
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="inCompleteList"
    >
      <b-icon icon="checkbox-blank-outline"></b-icon>
      <strong>未完了</strong>
      <b-icon
        :icon="isInCompleteListOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
    <div v-if="incompleteItems.length === 0" class="panel-block">
      中に誰もいませんよ
    </div>
    <todo-list-item
      v-for="item of incompleteItems"
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
      isInCompleteListOpen: true
    }
  },
  computed: {
    incompleteItems() {
      return this.$parent.items.filter((x) => !x.checked)
    }
  }
}
</script>
