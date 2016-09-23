/**
 * Created by akorovin on 12.08.2016.
 */

const UPLOAD = 'ontologySparql/upload';
const UPLOAD_SUCCESS = 'ontologySparql/upload_success';
const UPLOAD_FAIL = 'ontologySparql/upload_fail';
const CHANGE_SPARQL = 'ontologySparql/change';

const initialState = {
  uploading: false,
  uploadingError: {},
  uploaded: false,
  data: {
    data: ''
  },
  query: 'PREFIX owl: <http://www.w3.org/2002/07/owl#>\n' +
               'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n' +
               'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n' +
               'select * where { ?a ?b ?c }\n'
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
    case CHANGE_SPARQL:
      return {
        ...state,
        query: action.query
      };
    default:
      return state;
  }
}

export function runSparql(id, sparql) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/java/ontologies/query/' + id, {
      data: {
        data: sparql
      }
    })
  };
}

export function changeCurrentQuery(query) {
  return {
    type: CHANGE_SPARQL,
    query: query
  }
}
