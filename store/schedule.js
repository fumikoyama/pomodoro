export const state = () => ({
  list: []
})

export const mutations = {
  create(state, { pomoTime, smallBreakTime, pomoCount, breakTime }) {
    state.list = [...Array(pomoCount)].flatMap((_, i) => {
      const no = i + 1
      return [
        {
          no,
          title: `${no}ポモ目`,
          time: pomoTime,
          break: false,
          completed: false
        },
        {
          no: no + 0.5,
          title: `休憩`,
          time: pomoCount === no ? breakTime : smallBreakTime,
          break: true,
          completed: false
        }
      ]
    })
  },
  sex(state) {
    // idを元にデータを取得
    const item = state.list.find((x) => !x.completed)
    // チェック状態を変更
    item.completed = true
  }
}

export const getters = {
  current(state) {
    return state.list.find((x) => !x.completed)
  },
  isCreated(state) {
    return state.list.length > 0
  },
  isTest(state) {
    return state.list.some((x) => !x.completed)
  }
}
