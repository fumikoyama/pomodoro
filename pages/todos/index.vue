<template>
  <section
    v-touch:swipe.left="() => $router.push('/performance')"
    v-touch:swipe.right="() => $router.push('/')"
    class="section hero"
  >
    <header class="hero-head">
      <div class="container has-text-centered">
        <h1 class="title">
          <b-icon icon="format-list-checkbox"></b-icon>
          Todos
        </h1>
        <hr />
      </div>
    </header>
    <section class="hero-body">
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
    </section>
  </section>
</template>

<script>
import TodoCompletedList from '~/components/panels/TodoCompletedList'
import TodoIncompleteList from '~/components/panels/TodoIncompleteList'
import TodoTrash from '~/components/panels/TodoTrash'
import TodoEditor from '~/components/panels/TodoEditor'
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
