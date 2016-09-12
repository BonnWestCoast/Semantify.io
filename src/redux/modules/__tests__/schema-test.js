import { expect } from 'chai'
import reducer from '../schema'
import {
  LOAD_LIST_SUCCESS,
  initialState,
  getSchemasArray
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

  describe('getSchemasList', () => {
    let state
    beforeEach(() => {
      state = cloneDeep(initialState)
      state.list = {
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
})
