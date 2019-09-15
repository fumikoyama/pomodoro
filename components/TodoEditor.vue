<template>
  <b-collapse aria-id="todoEditor" class="panel" :open.sync="isTodoEditorOpen">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="todoEditor"
    >
      <b-icon icon="lead-pencil"></b-icon>
      <strong>追加/編集</strong>
      <b-icon
        :icon="isTodoEditorOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
    <div class="panel-block">
      <b-input v-model="$parent.memo" placeholder="メモ" type="textarea" />
    </div>
    <div class="panel-block">
      <b-datepicker v-model="$parent.date" placeholder="日付"></b-datepicker>
    </div>
    <div class="panel-block">
      <template v-if="$parent.selectedId">
        <button class="button is-link is-outlined is-fullwidth" @click="cancel">
          Cancel
        </button>
        <button
          class="button is-link is-outlined is-fullwidth"
          :disabled="edited"
          @click="edit"
        >
          Edit
        </button>
      </template>
      <button
        v-else
        class="button is-link is-outlined is-fullwidth"
        :disabled="edited"
        @click="add"
      >
        Add
      </button>
    </div>
  </b-collapse>
</template>

<script>
export default {
  data() {
    return {
      isTodoEditorOpen: true
    }
  },
  computed: {
    edited() {
      return !this.$parent.memo || !this.$parent.date
    },
    date() {
      return this.$parent.date.toLocaleDateString()
    }
  },
  methods: {
    add() {
      this.$parent.items.push({
        id: Math.max(...this.$parent.items.map((x) => x.id)) + 1,
        date: this.date,
        checked: false,
        memo: this.$parent.memo
      })
      this.$parent.memo = null
    },
    edit() {
      const t = this.$parent.items.find((x) => x.id === this.$parent.selectedId)
      t.date = this.date
      t.memo = this.$parent.memo
      this.$parent.selectedId = null
      this.$parent.memo = null
    },
    cancel() {
      this.$parent.selectedId = null
      this.$parent.memo = null
    }
  }
}
</script>
