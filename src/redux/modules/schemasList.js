const initialState = {
  list: {
    'id1': {
      name: 'The First Schema',
      text: 'test content'
    },
    'id2': {
      name: 'Another Schema',
      text: 'another content'
    }
  }
};

export default function reducer(state = initialState/* , action = {}*/) {
  return state
}
