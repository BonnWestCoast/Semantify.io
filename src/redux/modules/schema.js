const UPLOAD = 'schema/upload';
const UPLOAD_SUCCESS = 'schema/upload_success';
const UPLOAD_FAIL = 'schema/upload_fail';

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

export function upload(schema) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/schema/upload', {
      data: schema
    }) // params not used, just shown as demonstration
  };
}
