/**
 * Created by akorovin on 13.08.2016.
 */

const LOAD = 'ontologyList/LOAD';
const LOAD_SUCCESS = 'ontologyList/LOAD_SUCCESS';
const LOAD_FAIL = 'ontologyList/LOAD_FAIL';

const initialState = {
  loaded: false,
  chosenOntology: ''
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

export function loadOntologyList() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/java/ontologies')
  };
}
