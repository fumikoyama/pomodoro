const toMinute = (seconds) => {
  return {
    min: ~~(seconds / 60) % 60,
    sec: ~~(seconds % 60)
  }
}
const padLeft = (v) => {
  return Math.abs(v)
    .toString()
    .padStart(2, '0')
}
const formatTime = (time) => {
  const seconds = time.reduce((a, x) => a + x.seconds, 0)
  const { min, sec } = toMinute(seconds)
  const str = `${padLeft(min)}分${padLeft(sec)}秒`
  if (seconds < 0) {
    return '-' + str
  }
  return str
}

export const state = () => ({
  elapsedLog: [],
  disturbedLog: [],
  breakTimeLog: [],
  overTimeLog: []
})

export const getters = {
  totalPomoCount(state) {
    return state.elapsedLog.length
  },
  totalDisturbedCount(state) {
    return state.disturbedLog.length
  },
  totalBreakCount(state) {
    return state.breakTimeLog.length
  },
  totalElapsed(state) {
    return formatTime(state.elapsedLog)
  },
  totalDisturbed(state) {
    return formatTime(state.disturbedLog)
  },
  totalBreakTime(state) {
    return formatTime(state.breakTimeLog)
  },
  totalOverTime(state) {
    return formatTime(state.overTimeLog)
  }
}

export const mutations = {
  addDisturbedLog(state) {
    // 中断ログの更新
    state.disturbedLog.push({
      seconds: 0,
      rawSeconds: 0,
      createdAt: new Date().toLocaleString(),
      timestamp: null
    })
  },
  deleteDisturbedLog(state) {
    state.disturbedLog = state.disturbedLog.filter((x) => x.timestamp !== null)
  },
  updateDisturbedLog(state, seconds) {
    // 末尾要素を取得して適用
    const prevRawSeconds = () => {
      if (state.disturbedLog.length >= 2) {
        const prev = state.disturbedLog[state.disturbedLog.length - 2]
        return prev.rawSeconds
      }
      return 0
    }
    const disturbed = state.disturbedLog[state.disturbedLog.length - 1]
    // 実際の経過時間との差
    disturbed.seconds = seconds - prevRawSeconds()
    // 実際の経過時間も保持
    disturbed.rawSeconds = seconds
  },
  saveDisturbedLog(state, timestamp) {
    state.disturbedLog
      .filter((x) => x.timestamp === null)
      .forEach((x) => {
        x.timestamp = timestamp
      })
  },
  addTotalElapsedLog(state, { seconds, timestamp }) {
    state.elapsedLog.push({ seconds, timestamp })
  },
  addTotaBreakTimeLog(state, { seconds, timestamp }) {
    state.breakTimeLog.push({ seconds, timestamp })
  },
  updateOverTime(state, { seconds, timestamp }) {
    state.overTimeLog.push({ seconds, timestamp })
  }
}

export const actions = {
  addDisturbedLog({ commit }) {
    // 中断ログの追加
    commit('addDisturbedLog')
  },
  updateDisturbedLog({ commit, rootState }) {
    // 中断時間の更新
    commit('updateDisturbedLog', rootState.timer.disturbed)
  },
  save({ commit, rootState, rootGetters }) {
    const current = rootGetters['schedule/current']
    const timestamp = rootState.timer.startedTimeStamp
    if (current.break) {
      // 休憩時間の加算
      commit('addTotaBreakTimeLog', {
        seconds: rootGetters['schedule/current'].time * 60,
        timestamp
      })
    } else {
      // ポモ時間の加算
      commit('addTotalElapsedLog', {
        seconds: rootGetters['schedule/current'].time * 60,
        timestamp
      })
    }
    // 中断があった場合
    if (rootGetters['timer/hasDisturbed']) {
      // 中断ログの更新
      commit('updateDisturbedLog', rootState.timer.disturbed)
      // 中断ログの保存
      commit('saveDisturbedLog', timestamp)
    }
    // 超過している時間がある場合
    if (rootGetters['timer/isOver']) {
      // 超過時間の加算
      const seconds = Math.abs(rootState.timer.elapsed)
      commit('updateOverTime', { seconds, timestamp })
    }
  },
  restore({ commit, rootGetters }) {
    // 中断があった場合
    if (rootGetters['timer/hasDisturbed']) {
      // 中断ログのリセット
      commit('deleteDisturbedLog')
    }
  }
}
