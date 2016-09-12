import { expect } from 'chai'
import reducer from '../schema'
import {
  LOAD_LIST_SUCCESS,
  initialState
} from '../schema'

let cloneDeep = require('lodash/cloneDeep')

describe('Schema reducer', () => {
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
})
