<template>
  <div class="container">
    <b-field label="何て呼んだらいい？">
      <b-input v-model="name" placeholder="名無しさん"></b-input>
    </b-field>
    <b-field label="TODOリスト使う？">
      <b-switch v-model="todo">
        {{ todoStr }}
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'main',
  computed: {
    ...mapGetters('settings', ['todoStr']),
    name: {
      get() {
        return this.$store.state.settings.name
      },
      set(value) {
        this.setName(value)
      }
    },
    todo: {
      get() {
        return this.$store.state.settings.useTodo
      },
      set(value) {
        this.setUseTodo(value)
      }
    },
    pomoTime: {
      get() {
        return this.$store.state.settings.pomoTime
      },
      set(value) {
        this.setPomoTime(value)
      }
    },
    smallBreakTime: {
      get() {
        return this.$store.state.settings.smallBreakTime
      },
      set(value) {
        this.setSmallBreakTime(value)
      }
    },
    pomoCount: {
      get() {
        return this.$store.state.settings.pomoCount
      },
      set(value) {
        this.setPomoCount(value)
      }
    },
    breakTime: {
      get() {
        return this.$store.state.settings.breakTime
      },
      set(value) {
        this.setBreakTime(value)
      }
    }
  },
  methods: mapActions('settings', [
    'setName',
    'setUseTodo',
    'setPomoTime',
    'setSmallBreakTime',
    'setPomoCount',
    'setBreakTime',
    'clear'
  ])
}
</script>
