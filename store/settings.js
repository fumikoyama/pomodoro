const DEF_NAME = '名無しさん'
const DEF_TODO = true
const DEF_POMOTIME = 25
const DEF_SMALL_BREAK_TIME = 5
const DEF_POMO_COUNT = 4
const DEF_BREAK_TIME = 30

export const state = () => ({
  name: DEF_NAME,
  todo: DEF_TODO,
  pomoTime: DEF_POMOTIME,
  smallBreakTime: DEF_SMALL_BREAK_TIME,
  pomoCount: DEF_POMO_COUNT,
  breakTime: DEF_BREAK_TIME
})

export const mutations = {
  setName(state, value) {
    state.name = value
  },
  setTodo(state, value) {
    state.todo = value
  },
  setPomoTime(state, value) {
    state.pomoTime = value
  },
  setSmallBreakTime(state, value) {
    state.smallBreakTime = value
  },
  setPomoCount(state, value) {
    state.pomoCount = value
  },
  setBreakTime(state, value) {
    state.breakTime = value
  },
  clear(state) {
    // 設定項目をクリア
    state.name = DEF_NAME
    state.todo = DEF_TODO
    state.pomoTime = DEF_POMOTIME
    state.smallBreakTime = DEF_SMALL_BREAK_TIME
    state.pomoCount = DEF_POMO_COUNT
    state.breakTime = DEF_BREAK_TIME
  }
}

export const getters = {
  todoStr(state) {
    return state.todo === true ? '使う' : '使わない'
  }
}
