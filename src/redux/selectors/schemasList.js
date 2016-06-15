// returns the list of schemas
export function list(state) {
  let schemas = state.schemasList.list
  return Object.keys(schemas).map(id => ({...schemas[id], id}))
}

// returns a schema by its ID
export function schema(state, id) {
  return state.schemasList.list[id]
}
