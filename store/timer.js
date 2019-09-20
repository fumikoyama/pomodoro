const TIMER_STATE = {
  RUNNNING: 0,
  PAUSE: 1,
  STOPED: 2
}
const toMinute = (seconds) => {
  return {
    min: ~~(seconds / 60) % 60,
    sec: ~~(seconds % 60)
  }
}
const formatTime = (seconds) => {
  const pad = (v) => {
    return Math.abs(v)
      .toString()
      .padStart(2, '0')
  }
  const { min, sec } = toMinute(seconds)
  const str = `${pad(min)}:${pad(sec)}`
  if (seconds < 0) {
    return '-' + str
  }
  return str
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
  elapsed: 0,
  disturbed: 0,
  startedTimeStamp: null,
  timerState: TIMER_STATE.STOPED
})

export const getters = {
  isStarted(state) {
    return state.timerState !== TIMER_STATE.STOPED
  },
  isPause(state) {
    return state.timerState === TIMER_STATE.PAUSE
  },
  isOver(state) {
    return state.timerState !== TIMER_STATE.STOPED && state.elapsed < 0
  },
  hasDisturbed(state) {
    return state.disturbed > 0
  },
  elapsedStr(state) {
    return formatTime(state.elapsed)
  },
  disturbedStr(state) {
    return formatTime(state.disturbed)
  }
}

export const mutations = {
  start(state, seconds) {
    state.elapsed = seconds
    state.startedTimeStamp = new Date().toLocaleString()
    state.timerState = TIMER_STATE.RUNNNING
  },
  updateElapsed(state) {
    state.elapsed--
  },
  updateDisturbed(state) {
    state.disturbed++
  },
  restart(state) {
    state.timerState = TIMER_STATE.RUNNNING
  },
  pause(state) {
    state.timerState = TIMER_STATE.PAUSE
  },
  stop(state) {
    state.elapsed = 0
    state.disturbed = 0
    state.startedTimeStamp = null
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
        // 中断ログの更新
        dispatch('performance/addDisturbedLog', null, { root: true })
        // 中断用のループ処理を実行
        await dispatch('paused')
      }
      // 停止の場合はタイマー停止
      return Promise.resolve(state.timerState === TIMER_STATE.STOPED)
    }
    commit('start', rootGetters['schedule/current'].time * 60)
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
  restart({ commit, dispatch }) {
    // 実績の更新
    dispatch('performance/updateDisturbedLog', null, { root: true })
    // タイマーを再開
    commit('restart')
  },
  pause({ commit }) {
    commit('pause')
  },
  stop({ commit, dispatch }) {
    // 実績の更新
    dispatch('performance/save', null, { root: true })
    // タイマーの停止
    commit('stop')
    // スケジュールを更新
    dispatch('schedule/update', null, { root: true })
  },
  clear({ commit, dispatch }) {
    // 実績のリセット
    dispatch('performance/restore', null, { root: true })
    // タイマーの停止
    commit('stop')
  }
}
