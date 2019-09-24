<template>
  <div class="panel-block" :class="style">
    <b-icon :icon="icon"></b-icon>
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: null }
  },
  computed: {
    style() {
      return { 'has-background-light': this.item.break }
    },
    icon() {
      return this.item.completed
        ? 'checkbox-marked-outline'
        : 'checkbox-blank-outline'
    },
    text() {
      return `${this.item.title}（${this.item.time}分）`
    }
  }
}
</script>
