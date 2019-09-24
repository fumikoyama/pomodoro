<template>
  <div class="has-text-centered">
    <h1 class="title is-size-4-mobile has-text-weight-bold">
      <b-icon :icon="pages[$route.name].icon" size="is-small" />
      {{ pages[$route.name].title }}
    </h1>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: {
        index: { title: 'ホーム', icon: 'home' },
        todos: { title: 'Todos', icon: 'format-list-checkbox' },
        performance: { title: '実績', icon: 'gauge' },
        settings: { title: '設定', icon: 'tune' }
      }
    }
  }
}
</script>
