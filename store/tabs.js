export const state = () => ({
  activeTab: 1
})

export const mutations = {
  setActiveTab(state, value) {
    state.activeTab = value
  },
  showTodos(state) {
    state.activeTab = 0
  }
}

export const actions = {
  setActiveTab({ commit }, value) {
    commit('setActiveTab', value)
  },
  showTodos({ commit }) {
    commit('showTodos')
  }
}
