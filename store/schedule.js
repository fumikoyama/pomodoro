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
  }
}
