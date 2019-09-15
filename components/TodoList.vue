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
        <completed-list />
        <!-- 未完了リスト -->
        <incomplete-list />
      </div>
      <div class="column">
        <!-- 追加/編集 -->
        <todo-editor />
      </div>
    </div>
  </section>
</template>

<script>
import CompletedList from '~/components/CompletedList'
import IncompleteList from '~/components/IncompleteList'
import TodoEditor from '~/components/TodoEditor'
export default {
  components: {
    CompletedList,
    IncompleteList,
    TodoEditor
  },
  data() {
    return {
      selectedId: null,
      date: null,
      memo: null,
      items: [
        {
          id: 1,
          date: '2019/09/15',
          checked: false,
          memo: 'remember me'
        },
        {
          id: 3,
          date: '2019/09/15',
          checked: true,
          memo: 'remember me2'
        }
      ]
    }
  }
}
</script>
