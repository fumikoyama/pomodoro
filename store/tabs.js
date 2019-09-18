export const state = () => ({
  activeTab: null
})

export const mutations = {
  setActiveTab(state, value) {
    state.activeTab = value
  },
  showTodo(state) {
    state.activeTab = 0
  }
}
