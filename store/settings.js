export const state = () => ({
  name: '名無しさん',
  todo: true,
  pomoTime: 25,
  smallBreakTime: 5,
  pomoCount: 4,
  breakTime: 30
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
    state.name = '名無しさん'
    state.todo = true
    state.pomoTime = 25
    state.smallBreakTime = 5
    state.pomoCount = 4
    state.breakTime = 30
  }
}

export const getters = {
  todoStr(state) {
    return state.todo === true ? '使う' : '使わない'
  }
}
