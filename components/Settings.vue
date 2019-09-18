<template>
  <section class="section container">
    <h1 class="title">
      <b-icon icon="tune"></b-icon>
      設定
    </h1>
    <hr />
    <b-field label="何て呼んだらいい？">
      <b-input v-model="name" placeholder="名無しさん"></b-input>
    </b-field>
    <b-field label="TODOリスト使う？">
      <b-switch v-model="todo">
        {{ $store.getters['settings/todoStr'] }}
      </b-switch>
    </b-field>
    <b-field label="1ポモどれくらいにする？">
      <b-numberinput
        v-model="pomoTime"
        min="2"
        max="45"
        :editable="false"
      ></b-numberinput>
    </b-field>
    <b-field label="1ポモやったらどれくらい休みたい？">
      <b-numberinput
        v-model="smallBreakTime"
        min="5"
        :max="breakTime"
        :editable="false"
      ></b-numberinput>
    </b-field>
    <b-field label="何ポモやったらいっぱい休む？">
      <b-numberinput
        v-model="pomoCount"
        min="1"
        max="10"
        :editable="false"
      ></b-numberinput>
    </b-field>
    <b-field label="いっぱい休むときどれくらい休む？">
      <b-numberinput
        v-model="breakTime"
        min="20"
        max="120"
        step="5"
        :editable="false"
      ></b-numberinput>
    </b-field>
    <br />
    <b-button class="is-fullwidth" type="is-link" outlined @click="clear">
      デフォルトに戻す
    </b-button>
  </section>
</template>

<script>
export default {
  computed: {
    name: {
      get() {
        return this.$store.state.settings.name
      },
      set(value) {
        this.$store.commit('settings/setName', value)
      }
    },
    todo: {
      get() {
        return this.$store.state.settings.useTodo
      },
      set(value) {
        this.$store.commit('settings/setUseTodo', value)
      }
    },
    pomoTime: {
      get() {
        return this.$store.state.settings.pomoTime
      },
      set(value) {
        this.$store.commit('settings/setPomoTime', value)
      }
    },
    smallBreakTime: {
      get() {
        return this.$store.state.settings.smallBreakTime
      },
      set(value) {
        this.$store.commit('settings/setSmallBreakTime', value)
      }
    },
    pomoCount: {
      get() {
        return this.$store.state.settings.pomoCount
      },
      set(value) {
        this.$store.commit('settings/setPomoCount', value)
      }
    },
    breakTime: {
      get() {
        return this.$store.state.settings.breakTime
      },
      set(value) {
        this.$store.commit('settings/setBreakTime', value)
      }
    }
  },
  methods: {
    clear() {
      this.$buefy.dialog.confirm({
        message: `デフォルトに戻してもいい？`,
        type: 'is-danger',
        onConfirm: () => this.$store.commit('settings/clear')
      })
    }
  }
}
</script>
