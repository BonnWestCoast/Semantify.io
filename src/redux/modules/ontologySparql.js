/**
 * Created by akorovin on 12.08.2016.
 */

const UPLOAD = 'ontologySparql/upload';
const UPLOAD_SUCCESS = 'ontologySparql/upload_success';
const UPLOAD_FAIL = 'ontologySparql/upload_fail';

const initialState = {
  uploading: false,
  uploadingError: {},
  uploaded: false
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
    default:
      return state;
  }
}

export function runSparql(state) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/sparql/runQuery', {
      chosenOntology: state.ontologyList.chosenOntology
    })
  };
}
