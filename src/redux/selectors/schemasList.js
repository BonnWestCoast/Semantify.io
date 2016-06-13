export function list(state) {
  let schemas = state.schemasList.list
  return Object.keys(schemas).map(id => ({...schemas[id], id}))
}

export function schema(state, id) {
  return state.schemasList.list[id]
}
