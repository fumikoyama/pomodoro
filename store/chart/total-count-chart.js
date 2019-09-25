import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

export const getters = {
  getDays(state, getters, rootState, rootGetters) {
    return [...Array(7)].map((_, i) =>
      dayjs()
        .startOf('week')
        .add(i, 'day')
    )
  },
  getData(state, getters, rootState, rootGetters) {
    const sumBy = (list, f) => {
      const pred = (x) => {
        const d = dayjs(x[f])
        return (
          d.isSame(start) ||
          d.isSame(end) ||
          (d.isAfter(start) && d.isBefore(end))
        )
      }
      const keys = getters.getDays.map((x) => x.format('YYYY/MM/DD'))
      return list.filter(pred).reduce((a, x) => {
        const index = keys.indexOf(dayjs(x[f]).format('YYYY/MM/DD'))
        a[index]++
        return a
      }, Array(keys.length).fill(0))
    }
    const start = dayjs().startOf('week')
    const end = dayjs().endOf('week')
    return [
      {
        name: '完了',
        data: sumBy(rootState.performance.elapsedLog, 'timestamp')
      },
      {
        name: '中断',
        data: sumBy(rootState.performance.disturbedLog, 'createdAt')
      }
    ]
  }
}
