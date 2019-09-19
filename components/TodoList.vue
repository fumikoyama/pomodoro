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
import TodoCompletedList from '~/components/panels/TodoCompletedList'
import TodoIncompleteList from '~/components/panels/TodoIncompleteList'
import TodoTrash from '~/components/panels/TodoTrash'
import TodoEditor from '~/components/panels/TodoEditor'
export default {
  components: {
    TodoCompletedList,
    TodoIncompleteList,
    TodoTrash,
    TodoEditor
  }
}
</script>
