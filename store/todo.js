const clearEdit = (state) => {
  // 編集データをクリア
  state.editData.id = null
  state.editData.checked = null
  state.editData.memo = null
  state.rawEditData.checked = null
  state.rawEditData.date = null
  state.rawEditData.memo = null
}

export const state = () => ({
  list: [],
  editData: {
    id: null,
    checked: null,
    date: null,
    memo: null
  },
  rawEditData: {
    checked: null,
    date: null,
    memo: null
  }
})

export const mutations = {
  setChecked(state, value) {
    state.editData.checked = value
  },
  setDate(state, value) {
    state.editData.date = value
  },
  setMemo(state, value) {
    state.editData.memo = value
  },
  changeCheckState(state, { id, value }) {
    // idを元にデータを取得
    const todo = state.list.find((x) => x.id === id)
    // チェック状態を変更
    todo.checked = value
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
      checked: state.editData.checked,
      memo: state.editData.memo,
      deleted: false
    })
    // メモ欄をクリア
    state.editData.checked = null
    state.editData.memo = null
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
    state.editData.checked = todo.checked
    state.editData.date = todo.date
    state.editData.memo = todo.memo
    state.rawEditData.date = todo.date
    state.rawEditData.memo = todo.memo
  },
  update(state) {
    // 編集データに設定されているidを元にデータを取得
    const todo = state.list.find((x) => x.id === state.editData.id)
    // 編集データを取得したデータに反映
    todo.checked = state.editData.checked
    todo.date = state.editData.date
    todo.memo = state.editData.memo
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
    // 削除済み項目の未取得
    return state.list.filter((x) => x.deleted)
  },
  edited(state) {
    if (state.editData.id) {
      // 編集の場合
      return (
        state.editData.memo &&
        state.editData.date &&
        (state.rawEditData.memo !== state.editData.memo ||
          state.rawEditData.checked !== state.editData.checked ||
          state.rawEditData.date !== state.editData.date)
      )
    } else {
      // 上記以外
      return state.editData.memo && state.editData.date
    }
  }
}
