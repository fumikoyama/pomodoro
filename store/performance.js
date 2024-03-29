import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { DialogProgrammatic as Dialog } from 'buefy'
dayjs.locale('ja')

const toTime = (seconds) => {
  const s = Math.abs(seconds)
  return {
    hour: ~~(s / 60 / 60),
    min: ~~(s / 60) % 60,
    sec: ~~(s % 60),
    sign: seconds < 0 ? '-' : ''
  }
}
const formatTime = (time) => {
  const padLeft = (num) => num.toString().padStart(2, '0')
  const seconds = time.reduce((a, x) => a + x.seconds, 0)
  const { hour, min, sec, sign } = toTime(seconds)
  return `${sign}${hour}時間${padLeft(min)}分${padLeft(sec)}秒`
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
  },
  canClear(state, getters, rootState, rootGetters) {
    // 起動中は不可
    if (rootGetters['timer/isStarted']) {
      return false
    }
    // 未編集の場合は不可
    if (
      getters.totalPomoCount === 0 &&
      getters.totalDisturbedCount === 0 &&
      getters.totalBreakCount === 0 &&
      state.overTimeLog.length === 0
    ) {
      return false
    }
    return true
  }
}

export const mutations = {
  addDisturbedLog(state) {
    // 中断ログの更新
    state.disturbedLog.push({
      seconds: 0,
      rawSeconds: 0,
      createdAt: dayjs(),
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
  },
  clear(state) {
    state.elapsedLog = []
    state.disturbedLog = []
    state.breakTimeLog = []
    state.overTimeLog = []
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
  },
  clear({ commit }) {
    Dialog.confirm({
      message: `実績……なかったことにしちゃう？`,
      type: 'is-danger',
      onConfirm: () => commit('clear')
    })
  }
}
