let keyBy = require('lodash/keyBy')

export const UPLOAD = 'schema/upload';
export const UPLOAD_SUCCESS = 'schema/upload_success';
export const UPLOAD_FAIL = 'schema/upload_fail';

export const LOAD_LIST = 'schema/load_list'
export const LOAD_LIST_SUCCESS = 'schema/load_list_success'
export const LOAD_LIST_FAIL = 'schema/load_list_fail'

export const initialState = {
  uploading: false,
  uploadingError: {},
  uploaded: false,
  list: {}
};

export default function reducer(state = initialState, action = {}) {
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
          name: 'fake schema 1'
        }, {
          id: 2,
          name: 'fake schema 2'
        }, {
          id: 3,
          name: 'fake schema 3'
        }])
      }, 1000)
    })
  }
}
