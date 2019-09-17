<template>
  <section class="section container">
    <h1 class="title">
      <b-icon icon="format-list-checkbox"></b-icon>
      Todos
    </h1>
    <hr />
    <div class="columns">
      <div class="column">
        <!-- 完了リスト -->
        <todo-completed-list />
        <!-- 未完了リスト -->
        <todo-incomplete-list />
      </div>
      <div class="column">
        <!-- 追加/編集 -->
        <todo-editor />
        <!-- ゴミ箱 -->
        <todo-trash />
      </div>
    </div>
  </section>
</template>

<script>
import TodoCompletedList from '~/components/TodoCompletedList'
import TodoIncompleteList from '~/components/TodoIncompleteList'
import TodoTrash from '~/components/TodoTrash'
import TodoEditor from '~/components/TodoEditor'
export default {
  components: {
    TodoCompletedList,
    TodoIncompleteList,
    TodoTrash,
    TodoEditor
  }
}
</script>
