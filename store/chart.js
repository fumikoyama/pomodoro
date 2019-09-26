import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

export const state = () => ({
  range: [],
  days: []
})

export const getters = {
  startDate(state, getters, rootState, rootGetters) {
    const d = state.range[0]
    return dayjs(d).startOf('day')
  },
  endDate(state, getters, rootState, rootGetters) {
    const d = state.range[state.range.length - 1]
    return dayjs(d).endOf('day')
  },
  getData(state, getters, rootState, rootGetters) {
    const sumBy = (list, f) => {
      const selector = (x) => x[f]
      const pred = (x) => {
        return x.isAfter(start) && x.isBefore(end)
      }
      const items = list.map(selector).filter(pred)
      return state.days.reduce((a, x, i) => {
        a[i] = items.filter((y) => y.isSame(x, 'd')).length
        return a
      }, Array(state.days.length).fill(0))
    }
    const start = getters.startDate
    const end = getters.endDate
    return [
      {
        name: '完了',
        data: sumBy(rootState.performance.elapsedLog, 'timestamp')
      },
      {
        name: '中断',
        data: sumBy(rootState.performance.disturbedLog, 'createdAt'),
        color: '#ff4500'
      }
    ]
  }
}

export const mutations = {
  setRange(state, value) {
    state.range = value
    const start = dayjs(value[0]).startOf('day')
    const end = dayjs(value[value.length - 1]).endOf('day')
    const len = end.diff(start, 'd')
    state.days = [...Array(len)].map((_, i) => start.add(i, 'd')).concat(end)
  }
}

export const actions = {
  initRange({ commit, dispatch, state, rootGetters }) {
    commit('setRange', [
      dayjs()
        .startOf('week')
        .toDate(),
      dayjs()
        .endOf('week')
        .toDate()
    ])
  },
  setRange({ commit, dispatch, state, rootGetters }, value) {
    commit('setRange', value)
  }
}
