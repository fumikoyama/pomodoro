<template>
  <label class="panel-block" :class="style">
    <b-checkbox
      v-model="checked"
      :disabled="item.deleted || isEdit"
      type="is-info"
    ></b-checkbox>
    <p class="note">{{ text }}</p>
    <div class="content-right">
      <template v-if="item.deleted">
        <b-tooltip label="元に戻す" type="is-dark">
          <b-button type="is-success" icon-right="restore" @click="restore" />
        </b-tooltip>
        <b-tooltip label="この世から消す" type="is-dark">
          <b-button type="is-danger" icon-right="delete" @click="destory" />
        </b-tooltip>
      </template>
      <template v-else>
        <b-tooltip label="編集する" type="is-dark" :active="!isEdit">
          <b-button
            type="is-success"
            icon-right="pencil"
            :disabled="isEdit"
            @click="edit"
          />
        </b-tooltip>
        <b-tooltip label="ゴミ箱に入れる" type="is-dark">
          <b-button type="is-danger" icon-right="delete" @click="remove" />
        </b-tooltip>
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
    style() {
      return { 'has-background-grey-lighter': this.isEdit }
    },
    isEdit() {
      return this.item.id === this.$store.state.todo.editData.id
    },
    text() {
      return `${this.item.date.toLocaleDateString()}\n${this.item.note}`
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
      const rem = () => this.$store.commit('todo/remove', this.item.id)
      if (this.isEdit) {
        this.$buefy.dialog.confirm({
          message: '編集中だよ？……ゴミ箱に入れる?',
          type: 'is-danger',
          onConfirm: rem
        })
      } else {
        rem()
      }
    },
    destory() {
      this.$buefy.dialog.confirm({
        message: 'こいつ邪魔……消していい?',
        type: 'is-danger',
        onConfirm: () => this.$store.commit('todo/destory', this.item.id)
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
.note {
  white-space: pre;
}
</style>
