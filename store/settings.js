const DEF_NAME = null
const DEF_USE_TODO = true
const DEF_POMOTIME = 25
const DEF_SMALL_BREAK_TIME = 5
const DEF_POMO_COUNT = 4
const DEF_BREAK_TIME = 30

export const state = () => ({
  name: DEF_NAME,
  useTodo: DEF_USE_TODO,
  pomoTime: DEF_POMOTIME,
  smallBreakTime: DEF_SMALL_BREAK_TIME,
  pomoCount: DEF_POMO_COUNT,
  breakTime: DEF_BREAK_TIME
})

export const mutations = {
  setName(state, value) {
    state.name = value
  },
  setUseTodo(state, value) {
    state.useTodo = value
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
    state.useTodo = DEF_USE_TODO
    state.pomoTime = DEF_POMOTIME
    state.smallBreakTime = DEF_SMALL_BREAK_TIME
    state.pomoCount = DEF_POMO_COUNT
    state.breakTime = DEF_BREAK_TIME
  }
}

export const getters = {
  todoStr(state) {
    return state.useTodo === true ? '使う' : '使わない'
  },
  pomoSettings(state) {
    return {
      pomoTime: state.pomoTime,
      smallBreakTime: state.smallBreakTime,
      pomoCount: state.pomoCount,
      breakTime: state.breakTime
    }
  }
}
