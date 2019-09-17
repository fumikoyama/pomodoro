export const state = () => ({
  time: 0,
  elapsed: 0,
  paused: 0,
  pausedCount: 0,
  isPause: false
})

export const mutations = {
  start(state, time) {
    state.time = time
    state.elapsed = 1
    state.isPause = false
  },
  restart(state) {
    state.isPause = false
  },
  pause(state) {
    state.isPause = true
    state.pausedCount += 1
  },
  stop(state) {
    state.time = 0
    state.elapsed = 0
    state.paused = 0
    state.pausedCount = 0
    state.isPause = false
  },
  clear(state) {
    state.time = 0
    state.elapsed = 0
    state.paused = 0
    state.pausedCount = 0
    state.isPause = false
  }
}

export const getters = {
  isRunning(state) {
    return state.elapsed > 0
  },
  end(state) {
    return state.elapsed > 0 && state.elapsed >= state.time
  },
  timeStr(state) {
    return `${state.elapsed}/${state.time}`
  }
}
