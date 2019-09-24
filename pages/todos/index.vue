<template>
  <b-tabs position="is-centered" type="is-toggle">
    <b-tab-item>
      <template slot="header">
        <b-icon icon="view-list" size="is-small" />
      </template>
      <div class="container">
        <div class="columns">
          <div class="column">
            <!-- 完了リスト -->
            <todo-completed-list />
            <!-- 未完了リスト -->
            <todo-incomplete-list />
          </div>
          <!-- 追加/編集 -->
          <todo-editor class="column" />
        </div>
      </div>
    </b-tab-item>
    <b-tab-item>
      <template slot="header">
        <b-icon icon="delete" size="is-small" />
      </template>
      <div class="container">
        <!-- ゴミ箱 -->
        <todo-trash />
      </div>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import TodoCompletedList from '~/components/todos/TodoCompletedList'
import TodoIncompleteList from '~/components/todos/TodoIncompleteList'
import TodoTrash from '~/components/todos/TodoTrash'
import TodoEditor from '~/components/todos/TodoEditor'
export default {
  layout: 'main',
  components: {
    TodoCompletedList,
    TodoIncompleteList,
    TodoTrash,
    TodoEditor
  }
}
</script>
