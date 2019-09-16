<template>
  <b-collapse aria-id="todoEditor" class="panel" :open.sync="isOpen">
    <div
      slot="trigger"
      class="panel-heading"
      role="button"
      aria-controls="todoEditor"
    >
      <b-icon icon="lead-pencil"></b-icon>
      <strong>{{ title }}</strong>
      <b-icon
        :icon="isOpen ? 'menu-down' : 'menu-up'"
        class="is-pulled-right"
      ></b-icon>
    </div>
    <div class="panel-block">
      <b-checkbox v-model="checked" type="is-info">
        {{ checked ? '完了' : '未完了' }}
      </b-checkbox>
    </div>
    <div class="panel-block">
      <b-input v-model="memo" placeholder="メモ" type="textarea" />
    </div>
    <div class="panel-block">
      <b-datepicker v-model="date" placeholder="日付"></b-datepicker>
    </div>
    <div class="panel-block">
      <template v-if="id">
        <button class="button is-link is-outlined is-fullwidth" @click="cancel">
          Cancel
        </button>
        <button
          class="button is-link is-outlined is-fullwidth"
          :disabled="!edited"
          @click="update"
        >
          Edit
        </button>
      </template>
      <button
        v-else
        class="button is-link is-outlined is-fullwidth"
        :disabled="!edited"
        @click="add"
      >
        Add
      </button>
    </div>
    <div v-if="id" class="panel-block">
      <button class="button is-danger is-outlined is-fullwidth" @click="remove">
        Delete
      </button>
    </div>
  </b-collapse>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true
    }
  },
  computed: {
    title() {
      return this.id ? '編集' : '追加'
    },
    id() {
      return this.$store.state.todo.editData.id
    },
    checked: {
      get() {
        return this.$store.state.todo.editData.checked
      },
      set(value) {
        this.$store.commit('todo/setChecked', value)
      }
    },
    date: {
      get() {
        return this.$store.state.todo.editData.date
      },
      set(value) {
        this.$store.commit('todo/setDate', value)
      }
    },
    memo: {
      get() {
        return this.$store.state.todo.editData.memo
      },
      set(value) {
        this.$store.commit('todo/setMemo', value)
      }
    },
    edited() {
      return this.$store.getters['todo/edited']
    }
  },
  methods: {
    add() {
      this.$store.commit('todo/add')
    },
    update() {
      this.$buefy.dialog.confirm({
        message: '更新……する?',
        onConfirm: () => {
          this.$store.commit('todo/update')
        }
      })
    },
    cancel() {
      this.$buefy.dialog.confirm({
        message: '編集……やめる?',
        onConfirm: () => {
          this.$store.commit('todo/cancel')
        }
      })
    },
    remove() {
      this.$buefy.dialog.confirm({
        message: 'ゴミ箱送りにしちゃう?',
        onConfirm: () => {
          this.$store.commit('todo/remove', this.id)
        }
      })
    }
  }
}
</script>
