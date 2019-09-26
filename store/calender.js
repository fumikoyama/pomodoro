import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

export const state = () => ({
  monthNames: [...Array(12)].map((_, i) => `${i + 1}月`),
  dayNames: ['日', '月', '火', '水', '木', '金', '土']
})

export const getters = {
  dateFormatter: (state) => (date) => {
    if (Array.isArray(date)) {
      const s = dayjs(date[0]).format('YYYY/MM/DD')
      const e = dayjs(date[1]).format('YYYY/MM/DD')
      return `${s} - ${e}`
    }
    return dayjs(date).format('YYYY/MM/DD')
  }
}
