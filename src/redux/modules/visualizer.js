/**
 * Created by akorovin on 08.09.2016.
 */

const LOAD = 'visualizer/LOAD';
const LOAD_SUCCESS = 'visualizer/LOAD_SUCCESS';
const LOAD_FAIL = 'visualizer/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: {
    message: ''
  }
};

export default function visualizer(state = initialState, action = {}) {
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

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function loadXML() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/visualizer/loadXML')
  };
}

export function loadOntology() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/visualizer/loadOntology')
  };
}
