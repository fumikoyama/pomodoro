<template>
  <div class="container">
    <!-- 完了リスト -->
    <todo-completed-list />
    <!-- 未完了リスト -->
    <todo-incomplete-list />
    <!-- 追加/編集 -->
    <todo-editor />
    <!-- ゴミ箱 -->
    <todo-trash />
  </div>
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
