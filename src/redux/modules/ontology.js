/**
 * Created by akorovin on 14.08.2016.
 */

const LOAD = 'ontology/LOAD';
const LOAD_SUCCESS = 'ontology/LOAD_SUCCESS';
const LOAD_FAIL = 'ontology/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: {
    message: ''
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadOntologyText() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/ontologies/loadOntologyText')
  };
}
