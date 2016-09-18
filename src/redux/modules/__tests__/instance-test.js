/**
 * created by Alexey Karpov
 */

import { expect } from 'chai'
import reducer, {
  USER_INPUT,
  userInput,
  initialState,
} from '../schema'

import cloneDeep from 'lodash/cloneDeep'

describe('schema reducer and selectors', () => {
  it('reducer is function', () => {
    expect(reducer).to.be.ok // eslint-disable-line
    expect(reducer).to.be.a('function')
  })

  describe('USER_INPUT action', () => {
    it('is a function', () => expect(userInput).to.be.a('function'))

    it('returns object', () => {
      let action = userInput('some text')
      expect(action).to.be.an('object')
      expect(action.type).to.equal(USER_INPUT)
      expect(action.text).to.equal('some text')
    })
  })

  describe('USER_INPUT handler', () => {
    let state
    let action
    let result
    beforeEach(() => {
      state = cloneDeep(initialState)
      action = {
        type: USER_INPUT,
        text: 'some text',
      }
      result = reducer(state, action)
    })

    it('does not modify state', () => {
      expect(state).to.equal(state)
      expect(state).to.deep.equal(state)
    })

    it('result contains new instance', () => {
      expect(result.list.new).to.be.ok // eslint-disable-line
      expect(result.list.new.id).to.equal('new')
      expect(result.list.new.name).to.equal('new')
      expect(result.list.new.content).to.equal('some text')
    })
  })
})
