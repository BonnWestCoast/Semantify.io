/**
 * created by Alexey Karpov
 */

import createReducer from './lib/createReducer'

export const USER_INPUT = 'instance/USER_INPUT'

export let initialState = {
  list: {}
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

export function userInput(text) {
  return {
    text,
    type: USER_INPUT,
  }
}
