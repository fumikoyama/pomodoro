<template>
  <label class="panel-block" :class="{ 'has-background-grey-lighter': isEdit }">
    <b-checkbox
      v-model="checked"
      :disabled="item.deleted || isEdit"
      type="is-info"
    ></b-checkbox>
    <p class="memo">{{ text }}</p>
    <div class="content-right">
      <template v-if="item.deleted">
        <b-button type="is-success" icon-right="restore" @click="restore" />
        <b-button type="is-danger" icon-right="delete" @click="destory" />
      </template>
      <template v-else>
        <b-button
          type="is-success"
          icon-right="pencil"
          :disabled="isEdit"
          @click="edit"
        />
        <b-button type="is-danger" icon-right="delete" @click="remove" />
      </template>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: null }
  },
  computed: {
    isEdit() {
      return this.item.id === this.$store.state.todo.editData.id
    },
    text() {
      return `${this.item.date.toLocaleDateString()}\n${this.item.memo}`
    },
    checked: {
      get() {
        return this.item.checked
      },
      set(value) {
        this.$store.commit('todo/changeCheckState', {
          id: this.item.id,
          value
        })
      }
    }
  },
  methods: {
    remove() {
      this.$store.commit('todo/remove', this.item.id)
    },
    destory() {
      this.$buefy.dialog.confirm({
        message: 'こいつ邪魔……消していい?',
        type: 'is-danger',
        onConfirm: () => {
          this.$store.commit('todo/destory', this.item.id)
        }
      })
    },
    restore() {
      this.$store.commit('todo/restore', this.item.id)
    },
    edit() {
      this.$store.commit('todo/edit', this.item.id)
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
