/**
 * created by Alexey Karpov
 */

import { createSelector as selector } from 'reselect'

import createReducer from './lib/createReducer'

export const USER_INPUT = 'instance/USER_INPUT'

export let initialState = {
  list: {},
  selected: null,
}

export let handlers = {
  [USER_INPUT](state, { text }) {
    return {
      ...state,
      list: {
        ...state.list,
        new: {
          id: 'new',
          content: text,
          name: 'new',
        },
      },
      selected: 'new',
    }
  }
}

export default createReducer(initialState, handlers)


// actions
export function userInput(text) {
  return {
    text,
    type: USER_INPUT,
  }
}


// selectors
export let getStore = state => state.instance

export let getSelectedId = selector(
  getStore,
  store => store.selected
)

export let getList = selector(
  getStore,
  store => store.list
)

export let getSelected = selector(
  getList,
  getSelectedId,
  (list, id) => id ? list[id] : null
)

export let getSelectedContent = selector(
  getSelected,
  selected => selected ? selected.content : null
)

