<template>
  <label class="panel-block">
    <b-checkbox v-model="item.checked" type="is-info" />
    <p class="memo">{{ item.date + '\n' + item.memo }}</p>
    <div class="content-right">
      <b-button type="is-success" icon-right="pencil" @click="edit(item)" />
      <b-button type="is-danger" icon-right="delete" @click="remove(item)" />
    </div>
  </label>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: null }
  },
  methods: {
    remove(item) {
      this.$buefy.dialog.confirm({
        message: 'こいつ邪魔……消していい?',
        type: 'is-danger',
        // onConfirm: () => this.items.splice(i, 1)
        onConfirm: () => {}
      })
    },
    edit(i) {
      // this.$parent.selectedId = i.id
      // this.$parent.memo = i.memo
      // this.$parent.date = new Date(i.date)
    }
  }
}
</script>

<style scoped>
.content-right {
  margin: 0 0 0 auto;
}
.memo {
  white-space: pre;
}
</style>
