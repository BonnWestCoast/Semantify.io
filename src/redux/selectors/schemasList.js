export function list(state) {
  let schemas = state.schemasList.list
  return Object.keys(schemas).map(id => ({...schemas[id], id}))
}
