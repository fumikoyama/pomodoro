const clearEdit = (state) => {
  // 編集データをクリア
  state.editData.id = null
  state.editData.note = null
  state.rawEditData.date = null
  state.rawEditData.note = null
}

export const state = () => ({
  list: [],
  editData: {
    id: null,
    date: null,
    note: null
  },
  rawEditData: {
    date: null,
    note: null
  },
  selectedId: 0
})

export const mutations = {
  setDate(state, value) {
    state.editData.date = value
  },
  setNote(state, value) {
    state.editData.note = value
  },
  changeCheckState(state, { id, value }) {
    // idを元にデータを取得
    const todo = state.list.find((x) => x.id === id)
    // チェック状態を変更
    todo.checked = value
    if (id === state.selectedId) {
      state.selectedId = 0
    }
  },
  setSelectedId(state, value) {
    state.selectedId = value
  },
  add(state) {
    // リスト内で最大値のidを取得する関数
    const max = () => {
      if (state.list.length === 0) return 0
      else return Math.max(...state.list.map((x) => x.id))
    }
    // リストに追加
    state.list.push({
      id: max() + 1,
      date: state.editData.date,
      checked: false,
      note: state.editData.note,
      deleted: false
    })
    // メモ欄をクリア
    state.editData.note = null
  },
  remove(state, id) {
    // idを元にデータを取得
    const todo = state.list.find((x) => x.id === id)
    // 削除済みに変更
    todo.deleted = true
    // 編集中の場合は編集データをクリア
    if (state.editData.id === todo.id) {
      clearEdit(state)
    }
    // 選択中の場合はクリア
    if (id === state.selectedId) {
      state.selectedId = 0
    }
  },
  restore(state, id) {
    // idを元にデータを取得
    const todo = state.list.find((x) => x.id === id)
    // 未削除に変更
    todo.deleted = false
  },
  destory(state, id) {
    // idを元にindexを取得
    const index = state.list.findIndex((x) => x.id === id)
    // indexを元にリストから削除
    state.list.splice(index, 1)
  },
  edit(state, id) {
    // idを元にデータを取得
    const todo = state.list.find((x) => x.id === id)
    // 取得したデータの内容を編集データに反映
    state.editData.id = id
    state.editData.date = todo.date
    state.editData.note = todo.note
    state.rawEditData.date = todo.date
    state.rawEditData.note = todo.note
  },
  update(state) {
    // 編集データに設定されているidを元にデータを取得
    const todo = state.list.find((x) => x.id === state.editData.id)
    // 編集データを取得したデータに反映
    todo.date = state.editData.date
    todo.note = state.editData.note
    // 編集データをクリア
    clearEdit(state)
  },
  cancel(state) {
    // 編集データをクリア
    clearEdit(state)
  }
}
export const getters = {
  completedItems(state) {
    // 完了かつ未削除の項目の未取得
    return state.list.filter((x) => x.checked && !x.deleted)
  },
  incompleteItems(state) {
    // 未完了かつ未削除の項目の未取得
    return state.list.filter((x) => !x.checked && !x.deleted)
  },
  deletedItems(state) {
    // 削除済み項目のみ取得
    return state.list.filter((x) => x.deleted)
  },
  canCommit(state) {
    if (state.editData.id) {
      // 編集の場合
      return (
        state.editData.note &&
        state.editData.date &&
        (state.rawEditData.note !== state.editData.note ||
          state.rawEditData.date !== state.editData.date)
      )
    } else {
      // 上記以外
      return state.editData.note && state.editData.date
    }
  }
}
