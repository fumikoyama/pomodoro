import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

const TIMER_STATE = {
  RUNNNING: 0,
  PAUSE: 1,
  STOPED: 2
}
const toTime = (seconds) => {
  const s = Math.abs(seconds)
  return {
    hour: ~~(s / 60 / 60),
    min: ~~(s / 60) % 60,
    sec: ~~(s % 60),
    sign: seconds < 0 ? '-' : ''
  }
}
const formatTime = (seconds) => {
  const padLeft = (num) => num.toString().padStart(2, '0')
  const { hour, min, sec, sign } = toTime(seconds)
  const hourStr = hour > 0 ? hour + ':' : ''
  return `${sign}${hourStr}${padLeft(min)}:${padLeft(sec)}`
}

export const state = () => ({
  elapsed: 0,
  disturbed: 0,
  startedTimeStamp: null,
  timerState: TIMER_STATE.STOPED,
  prevTime: null
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
    const now = dayjs()
    state.elapsed = seconds
    state.startedTimeStamp = now
    state.timerState = TIMER_STATE.RUNNNING
    state.prevTime = now
  },
  updateElapsed(state) {
    const now = dayjs()
    const diff = ~~(now.diff(state.prevTime) / 1000)
    state.elapsed -= diff
    state.prevTime = now
  },
  updateDisturbed(state) {
    const now = dayjs()
    const diff = ~~(now.diff(state.prevTime) / 1000)
    state.disturbed += diff
    state.prevTime = now
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
    // タイマー用のループ処理
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
    // 中断タイマー用の関数
    const pauseTimer = async () => {
      // 中断ログの更新
      dispatch('performance/addDisturbedLog', null, { root: true })
      // 中断用のループ処理を実行
      await loop(() => {
        // 中断の場合は更新
        if (state.timerState === TIMER_STATE.PAUSE) {
          commit('updateDisturbed')
        }
        // 中断以外の場合はタイマー停止
        return Promise.resolve(state.timerState !== TIMER_STATE.PAUSE)
      }, 1000)
    }
    // タイマー開始用の関数
    const startTimer = async () => {
      // 稼働中の場合は経過時間を更新
      if (state.timerState === TIMER_STATE.RUNNNING) {
        commit('updateElapsed')
      }
      // 中断の場合は中断用のタイマーを起動
      if (state.timerState === TIMER_STATE.PAUSE) {
        // 中断処理の実行
        await pauseTimer()
      }
      // 停止の場合はタイマー停止
      return Promise.resolve(state.timerState === TIMER_STATE.STOPED)
    }
    // タイマーの初期設定
    commit('start', rootGetters['schedule/current'].time * 60)
    // ループ開始
    await loop(startTimer, 1000)
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
