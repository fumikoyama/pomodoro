<template>
  <collapse-panel icon="lead-pencil" :title="title">
    <div class="panel-block">
      <b-input
        v-model="note"
        placeholder="やりたいことをここに書いてね。"
        type="textarea"
      />
    </div>
    <div class="panel-block">
      <b-datepicker
        v-model="date"
        placeholder="日付を入力してね。"
      ></b-datepicker>
    </div>
    <div class="panel-block">
      <template v-if="id">
        <b-button class="is-fullwidth" type="is-link" outlined @click="cancel">
          Cancel
        </b-button>
        <b-button
          class="is-fullwidth"
          type="is-link"
          outlined
          :disabled="disabled"
          @click="update"
        >
          Edit
        </b-button>
      </template>
      <b-button
        v-else
        class="is-fullwidth"
        type="is-link"
        outlined
        :disabled="disabled"
        @click="add"
      >
        Add
      </b-button>
    </div>
  </collapse-panel>
</template>

<script>
import CollapsePanel from '~/components/CollapsePanel'
export default {
  components: {
    CollapsePanel
  },
  computed: {
    title() {
      return this.id ? '編集' : '追加'
    },
    id() {
      return this.$store.state.todo.editData.id
    },
    date: {
      get() {
        return this.$store.state.todo.editData.date
      },
      set(value) {
        this.$store.commit('todo/setDate', value)
      }
    },
    note: {
      get() {
        return this.$store.state.todo.editData.note
      },
      set(value) {
        this.$store.commit('todo/setNote', value)
      }
    },
    disabled() {
      return !this.$store.getters['todo/canCommit']
    }
  },
  methods: {
    add() {
      this.$store.commit('todo/add')
    },
    update() {
      this.$buefy.dialog.confirm({
        message: '更新……する?',
        onConfirm: () => this.$store.commit('todo/update')
      })
    },
    cancel() {
      this.$buefy.dialog.confirm({
        message: '編集……やめる?',
        onConfirm: () => this.$store.commit('todo/cancel')
      })
    }
  }
}
</script>
