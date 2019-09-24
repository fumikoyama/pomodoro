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
        :mobile-native="false"
        :month-names="monthNames"
        :day-names="dayNames"
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
import { mapState, mapActions } from 'vuex'
import CollapsePanel from '~/components/common/CollapsePanel'
export default {
  components: {
    CollapsePanel
  },
  data() {
    return {
      monthNames: [...Array(12)].map((_, i) => `${i + 1}月`),
      dayNames: ['日', '月', '火', '水', '木', '金', '土']
    }
  },
  computed: {
    ...mapState('todos', ['editData']),
    id() {
      return this.editData.id
    },
    date: {
      get() {
        return this.editData.date
      },
      set(value) {
        this.setDate(value)
      }
    },
    note: {
      get() {
        return this.editData.note
      },
      set(value) {
        this.setNote(value)
      }
    },
    title() {
      return this.id ? '編集' : '追加'
    },
    disabled() {
      return !this.$store.getters['todos/canCommit']
    }
  },
  methods: mapActions('todos', [
    'add',
    'setNote',
    'setDate',
    'update',
    'cancel'
  ])
}
</script>
