import { expect } from 'chai'
import reducer from '../schema'
import {
  LOAD_LIST_SUCCESS,
  initialState,
  getSchemasArray,
  getSelectedSchema,
  getSelectedTitle,
  select,
  SELECT as SELECT_TYPE,
} from '../schema'

let cloneDeep = require('lodash/cloneDeep')

describe('Schema reducer and selectors', () => {
  it('reducer is function', () => {
    expect(reducer).to.be.ok // eslint-disable-line
    expect(reducer).to.be.a('function')
  })

  describe('LOAD_LIST_SUCCESS', () => {
    let action
    let state
    let result

    beforeEach(() => {
      action = {
        type: LOAD_LIST_SUCCESS,
        result: [{
          id: 1,
          name: 'fake schema 1'
        }, {
          id: 2,
          name: 'fake schema 2'
        }, {
          id: 3,
          name: 'fake schema 3'
        }]
      }

      result = reducer(state, action)
      state = cloneDeep(initialState)
    })

    it('returns new object', () => {
      expect(state).to.not.equal(result)
    })

    it('creates list', () => {
      expect(result.list).to.deep.equal({
        1: {
          id: 1,
          name: 'fake schema 1'
        },
        2: {
          id: 2,
          name: 'fake schema 2'
        },
        3: {
          id: 3,
          name: 'fake schema 3'
        }
      })
    })
  })

  describe('SELECT', () => {
    let action
    let state
    let result

    beforeEach(() => {
      action = {
        type: SELECT_TYPE,
        index: 1
      }

      state = {
        selected: null
      }

      result = reducer(state, action)
    })

    it('does not change state', () => {
      expect(state).to.equal(state)
      expect(state).to.deep.equal(state)
    })

    it('changes selected', () => {
      expect(result.selected).to.equal(1)
    })
  })

  describe('getSchemasList', () => {
    let state
    beforeEach(() => {
      state = cloneDeep(initialState)
      state = {
        schema: cloneDeep(initialState)
      }
      state.schema.list = {
        1: {
          id: 1,
          name: 'fake schema 1'
        },
        2: {
          id: 2,
          name: 'fake schema 2'
        },
        3: {
          id: 3,
          name: 'fake schema 3'
        }
      }
    })

    it('getSchemasArray is a function', () => {
      expect(getSchemasArray).to.be.a('function')
    })

    it('returns array', () => {
      let schemasArray = getSchemasArray(state)
        .sort((a, b) => a.id - b.id) // eslint-disable-line
        // sort is needed because Object.keys doesnt garantee any order.
      expect(schemasArray).to.deep.equal([{
        id: 1,
        name: 'fake schema 1'
      }, {
        id: 2,
        name: 'fake schema 2'
      }, {
        id: 3,
        name: 'fake schema 3'
      }])
    })
  })

  describe('getSelectedSchema', () => {
    let state
    beforeEach(() => {
      state = {
        schema: {
          list: {
            0: {
              name: 'first schema'
            },
            1: {
              name: 'second schema'
            }
          },
          selected: null
        },
      }
    })

    it('getSelectedSchema is a function', () => {
      expect(getSelectedSchema).to.be.a('function')
    })

    it('returns selected', () => {
      expect(getSelectedSchema(state)).to.equal(null)

      state.schema.selected = 1
      expect(getSelectedSchema(state)).to.equal(1)
    })
  })

  describe('getSelectedTitle', () => {
    let state
    beforeEach(() => {
      state = {
        schema: {
          list: {
            0: {
              name: 'first schema',
              id: 0
            },
            1: {
              name: 'second schema',
              id: 1
            }
          },
          selected: null
        },
      }
    })

    it('getSelectedTitle is a function', () => {
      expect(getSelectedTitle).to.be.a('function')
    })

    it('returns null if selected is null', () => {
      expect(getSelectedTitle(state)).to.equal(null)
    })

    it('returns schema name if selected is not null', () => {
      state.schema.selected = 0
      expect(getSelectedTitle(state)).to.equal('first schema')

      state.schema.selected = 1
      expect(getSelectedTitle(state)).to.equal('second schema')
    })
  })

  describe('select', () => {
    it('is a function', () => expect(select).to.be.a('function'))

    it('returns action', () => {
      let action = select(0)
      expect(action.type).to.equal(SELECT_TYPE)
      expect(action.index).to.equal(0)
      expect(Object.keys(action).length).to.equal(2)

      expect(select(1).index).to.equal(1)
    })
  })
})
