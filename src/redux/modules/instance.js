/**
 * created by Alexey Karpov
 */

import { createSelector as selector } from 'reselect'

import createReducer from './lib/createReducer'

import { getSelectedSchema } from './schema'

export const USER_INPUT = 'instance/USER_INPUT'
export const CREATE_ONTOLOGY = 'instance/CREATE_ONTOLOGY'
export const CREATE_ONTOLOGY_SUCCESS = 'instance/CREATE_ONTOLOGY_SUCCESS'
export const CREATE_ONTOLOGY_FAIL = 'instance/CREATE_ONTOLOGY_FAIL'

export let initialState = {
  list: {},
  selected: null,
  statuses: {
    creatingOntology: {
      run: false,
      error: null,
      successMessage: '',
    },
  },
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
  },

  [CREATE_ONTOLOGY](state) {
    return {
      ...state,
      statuses: {
        ...state.statuses,
        creatingOntology: {
          run: true,
          error: null,
          successMessage: '',
        },
      },
    }
  },

  [CREATE_ONTOLOGY_SUCCESS](state) {
    return {
      ...state,
      statuses: {
        ...state.statuses,
        creatingOntology: {
          run: false,
          error: null,
          successMessage: 'Ontology created!',
        },
      },
    }
  },

  [CREATE_ONTOLOGY_FAIL](state, { error }) {
    return {
      ...state,
      statuses: {
        ...state.statuses,
        creatingOntology: {
          error,
          run: false,
          successMessage: '',
        },
      },
    }
  },
}

export default createReducer(initialState, handlers)


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

export let getStatuses = selector(
  getStore,
  store => store.statuses
)

export let getCreatingOntologyStatus = selector(
  getStatuses,
  statuses => statuses.creatingOntology
)


// actions
export function userInput(text) {
  return {
    text,
    type: USER_INPUT,
  }
}

export function createOntology(ontName) {
  return (dispatch, getState) => { // redux-thunk middleware
    let state = getState()
    let schema = getSelectedSchema(state)
    let instance = getSelected(state)

    dispatch({
      types: [CREATE_ONTOLOGY, CREATE_ONTOLOGY_SUCCESS, CREATE_ONTOLOGY_FAIL],
      promise: client => client.post('/java/ontologies/', {
        data: {
          schema: schema.content,
          instance: instance.content,
          ontName,
        },
      }),
    })
  }
}
