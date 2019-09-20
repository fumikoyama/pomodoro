export const state = () => ({
  list: []
})

export const mutations = {
  create(state, { pomoTime, smallBreakTime, pomoCount, breakTime }) {
    const func = (i) => {
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
    }
    state.list = [...Array(pomoCount)].flatMap((_, i) => func(i))
  },
  update(state) {
    // idを元にデータを取得
    const item = state.list.find((x) => !x.completed)
    // チェック状態を変更
    item.completed = true
  }
}

export const getters = {
  current(state) {
    // リストから未完了項目の先頭を取得
    return state.list.find((x) => !x.completed)
  },
  isEmpty(state) {
    // リストサイズが0なら空
    return state.list.length === 0
  },
  isBreak(state, getters) {
    return getters.current.break
  },
  isCompleted(state) {
    return state.list.every((x) => x.completed)
  }
}

export const actions = {
  create({ dispatch, rootGetters, commit }) {
    // タイマー起動中の場合
    if (rootGetters['timer/isStarted']) {
      // タイマー停止
      dispatch('timer/clear', null, { root: true })
    }
    commit('create', rootGetters['settings/pomoSettings'])
  },
  update({ commit }) {
    commit('update')
  }
}
