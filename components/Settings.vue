<template>
  <section class="section container">
    <h1 class="title">
      <b-icon icon="tune"></b-icon>
      設定
    </h1>
    <hr />
    <h2 class="subtitle">基本設定</h2>
    <hr />
    <b-field label="何て呼んだらいい？">
      <b-input v-model="name"></b-input>
    </b-field>
    <b-field label="TODOリスト使う？">
      <b-switch v-model="todo" true-value="使う" false-value="使わない">
        {{ todo }}
      </b-switch>
    </b-field>
    <hr />
    <h2 class="subtitle">応用設定</h2>
    <hr />
    <b-field label="1ポモどれくらいにする？">
      <b-numberinput
        v-model="pomo"
        min="2"
        max="45"
        :editable="false"
      ></b-numberinput>
    </b-field>
    <b-field label="1ポモやったらどれくらい休みたい？">
      <b-numberinput
        v-model="pomo2"
        min="5"
        :max="pomo4"
        :editable="false"
      ></b-numberinput>
    </b-field>
    <b-field label="何ポモやったらいっぱい休む？">
      <b-numberinput
        v-model="pomo3"
        min="1"
        max="10"
        :editable="false"
      ></b-numberinput>
    </b-field>
    <b-field label="いっぱい休むときどれくらい休む？">
      <b-numberinput
        v-model="pomo4"
        min="20"
        max="120"
        step="5"
        :editable="false"
      ></b-numberinput>
    </b-field>
    <br />
    <button class="button is-link is-outlined is-fullwidth" @click="update">
      設定を反映
    </button>
    <br />
    <button class="button is-link is-outlined is-fullwidth" @click="clear">
      デフォルトに戻す
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '名無しさん',
      todo: '使う',
      pomo: 25,
      pomo2: 5,
      pomo3: 4,
      pomo4: 30
    }
  },
  methods: {
    update() {
      this.$buefy.dialog.confirm({
        message: '設定を反映してもいい？スケジュールはリセットされちゃうよ？',
        type: 'is-danger',
        onConfirm: () => {}
      })
    },
    clear() {
      this.$buefy.dialog.confirm({
        message: `デフォルトに戻してもいい？スケジュールはリセットされちゃうよ？`,
        type: 'is-danger',
        onConfirm: () => {
          this.pomo = 25
          this.pomo2 = 5
          this.pomo3 = 4
          this.pomo4 = 30
        }
      })
    }
  }
}
</script>
