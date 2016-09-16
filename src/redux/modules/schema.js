let keyBy = require('lodash/keyBy')
let cloneDeep = require('lodash/cloneDeep')

export const UPLOAD = 'schema/upload';
export const UPLOAD_SUCCESS = 'schema/upload_success';
export const UPLOAD_FAIL = 'schema/upload_fail';

export const LOAD_LIST = 'schema/load_list'
export const LOAD_LIST_SUCCESS = 'schema/load_list_success'
export const LOAD_LIST_FAIL = 'schema/load_list_fail'

export const SELECT = 'schema/SELECT'
export const USER_INPUT = 'schema/USER_INPUT'

export const initialState = {
  uploading: false,
  uploadingError: {},
  uploaded: false,
  list: {},
  selected: null
};

export default function reducer(state = initialState, action = {}) {
  let newState

  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        uploading: true
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        uploaded: false,
        uploadingError: action.error
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true,
        data: action.result,
        uploadingError: {}
      };

    // case LOAD_LIST:
      // return state

    case LOAD_LIST_SUCCESS:
      return {
        ...state,
        list: keyBy(action.result, 'id')
      }

    // case LOAD_LIST_FAIL:
      // return state

    case SELECT:
      newState = cloneDeep(state)
      newState.selected = action.index
      // if (newState.list.new && action.index !== 'new') {
      //  delete newState.list.new
      // }

      return newState

    case USER_INPUT:
      newState = cloneDeep(state)

      if (!action.text) {
        delete newState.list.new
        newState.selected = null
        return newState
      }

      newState.selected = 'new'
      newState.list.new = {
        id: 'new',
        content: action.text,
        name: 'new',
      }

      return newState

    default:
      return state;
  }
}

export function upload(schema) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/schema/upload', {
      data: schema
    }) // params not used, just shown as demonstration
  };
}

export function loadList() {
  return {
    types: [LOAD_LIST, LOAD_LIST_SUCCESS, LOAD_LIST_FAIL],
    promise: () => new Promise(resolve => { // temporary fake
      setTimeout(() => {
        resolve([{
          id: 1,
          name: 'fake schema 1',
          content: 'some content 1',
        }, {
          id: 2,
          name: 'fake schema 2',
          content: 'some content 2',
        }, {
          id: 3,
          name: 'fake schema 3',
          content: 'some content 3',
        }])
      }, 0)
    })
  }
}

export function select(index) {
  return {
    index,
    type: SELECT
  }
}

export function userInput(text) {
  return {
    text,
    type: USER_INPUT
  }
}

export function getSchemasArray(state) {
  let list = state.schema.list
  return Object.keys(list).map(key => list[key])
    .sort((a, b) => a.id - b.id) // eslint-disable-line
}

export function getSelectedSchemaIndex(state) {
  return state.schema.selected
}

export function getSelectedSchema(state) {
  let selected = getSelectedSchemaIndex(state)
  if (selected === null) {
    return null
  }

  return state.schema.list[selected]
}

export function getSelectedTitle(state) {
  let schema = getSelectedSchema(state)
  if (schema === null) {
    return null
  }

  return schema.name
}

export function getNewSchema(state) {
  return state.schema.list.new
}

export function doesUserCreateNewSchema(state) {
  return !!getNewSchema(state)
}

export function getSelectedSchemaContent(state) {
  let schema = getSelectedSchema(state)
  if (schema === null) {
    return null
  }

  return schema.content
}
