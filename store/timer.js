const TIMER_STATE = {
  RUNNNING: 0,
  PAUSE: 1,
  STOPED: 2
}
const loop = (func, delay) => {
  // ループのコア関数
  const core = (resolve, reject) =>
    func()
      .then((result) => {
        // 実行結果がtrueの場合はループ終了
        if (result) return resolve(result)
        // 上記以外はループ継続
        return setTimeout(() => core(resolve, reject), delay)
      })
      .catch(reject)
  // ループの起点
  return new Promise(core)
}

export const state = () => ({
  elapsed: {
    min: 0,
    sec: 0
  },
  disturbed: {
    min: 0,
    sec: 0
  },
  timerState: TIMER_STATE.STOPED
})

export const mutations = {
  start(state, time) {
    state.elapsed = { min: time, sec: 0 }
    state.timerState = TIMER_STATE.RUNNNING
  },
  updateElapsed(state) {
    if (state.elapsed.sec <= 0) {
      state.elapsed.min--
      state.elapsed.sec = 59
    } else {
      state.elapsed.sec--
    }
  },
  updateDisturbed(state) {
    if (state.disturbed.sec >= 59) {
      state.disturbed.min++
      state.disturbed.sec = 0
    } else {
      state.disturbed.sec++
    }
  },
  restart(state) {
    state.timerState = TIMER_STATE.RUNNNING
  },
  pause(state) {
    state.timerState = TIMER_STATE.PAUSE
  },
  stop(state) {
    state.elapsed = { min: 0, sec: 0 }
    state.disturbed = { min: 0, sec: 0 }
    state.timerState = TIMER_STATE.STOPED
  }
}

export const actions = {
  async start({ commit, dispatch, state, rootGetters }) {
    const func = async () => {
      // 稼働中の場合は経過時間を更新
      if (state.timerState === TIMER_STATE.RUNNNING) {
        commit('updateElapsed')
      }
      // 中断の場合は中断用のタイマーを起動
      if (state.timerState === TIMER_STATE.PAUSE) {
        await dispatch('paused')
      }
      // 停止の場合はタイマー停止
      return Promise.resolve(state.timerState === TIMER_STATE.STOPED)
    }
    commit('start', rootGetters['schedule/current'].time)
    await loop(func, 1000)
  },
  async paused({ commit, state }) {
    const func = () => {
      // 中断の場合は更新
      if (state.timerState === TIMER_STATE.PAUSE) {
        commit('updateDisturbed')
      }
      // 中断以外の場合はタイマー停止
      return Promise.resolve(state.timerState !== TIMER_STATE.PAUSE)
    }
    await loop(func, 1000)
  },
  restart({ commit }) {
    commit('restart')
  },
  pause({ commit }) {
    commit('pause')
  },
  stop({ dispatch, commit }) {
    commit('stop')
    dispatch('schedule/update', null, { root: true })
  },
  clear({ commit }) {
    commit('stop')
  }
}

export const getters = {
  isStarted(state) {
    return state.timerState !== TIMER_STATE.STOPED
  },
  isPause(state) {
    return state.timerState === TIMER_STATE.PAUSE
  },
  isEnd(state) {
    return state.timerState !== TIMER_STATE.STOPED && state.elapsed.min < 0
  },
  elapsedStr(state) {
    const p = (v) => ('0' + v).slice(-2)
    return `${p(state.elapsed.min)}:${p(state.elapsed.sec)}`
  },
  disturbedStr(state) {
    const p = (v) => ('0' + v).slice(-2)
    return `${p(state.disturbed.min)}:${p(state.disturbed.sec)}`
  }
}
