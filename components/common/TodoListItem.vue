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
          <b-button
            type="is-success"
            icon-right="restore"
            @click="restore(item.id)"
          />
        </b-tooltip>
        <b-tooltip label="この世から消す" type="is-dark">
          <b-button
            type="is-danger"
            icon-right="delete"
            @click="destory(item.id)"
          />
        </b-tooltip>
      </template>
      <template v-else>
        <b-tooltip label="編集する" type="is-dark" :active="!isEdit">
          <b-button
            type="is-success"
            icon-right="pencil"
            :disabled="isEdit"
            @click="edit(item.id)"
          />
        </b-tooltip>
        <b-tooltip label="ゴミ箱に入れる" type="is-dark">
          <b-button
            type="is-danger"
            icon-right="delete"
            @click="remove(item.id)"
          />
        </b-tooltip>
      </template>
    </div>
  </label>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    item: { type: Object, default: null }
  },
  computed: {
    ...mapState('todo', ['editData']),
    isEdit() {
      return this.item.id === this.editData.id
    },
    style() {
      return { 'has-background-grey-lighter': this.isEdit }
    },
    text() {
      return `${this.item.date}\n${this.item.note}`
    },
    checked: {
      get() {
        return this.item.checked
      },
      set(value) {
        this.changeCheckState({ id: this.item.id, value })
      }
    }
  },
  methods: mapActions('todo', [
    'changeCheckState',
    'remove',
    'destory',
    'restore',
    'edit'
  ])
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
