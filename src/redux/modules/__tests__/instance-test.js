/**
 * created by Alexey Karpov
 */

import { expect } from 'chai'
import reducer, {
  USER_INPUT,
  userInput,
  initialState,

  // selectors
  getStore,
  getSelectedId,
  getList,
  getSelected,
  getSelectedContent,
} from '../instance'

import cloneDeep from 'lodash/cloneDeep'

describe('instance reducer and selectors', () => {
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

  describe('selectors', () => {
    let state
    let store
    let list
    beforeEach(() => {
      list = {
        'new': {
          id: 'new',
          name: 'new',
          content: 'text',
        },
      }

      store = {
        list,
        selected: 'new',
      }

      state = {
        instance: store
      }
    })

    it('getStore return instance store', () => {
      expect(getStore(state)).to.deep.equal(store)
    })

    it('getSelectedId return selected id', () => {
      expect(getSelectedId(state)).to.equal('new')

      state = cloneDeep(state)
      state.instance.selected = null
      expect(getSelectedId(state)).to.equal(null)
    })

    it('getList returns list', () => {
      expect(getList(state)).to.deep.equal(list)
    })

    it('getSelected returns selected instance', () => {
      expect(getSelected(state)).to.deep.equal({
        id: 'new',
        name: 'new',
        content: 'text',
      })

      state = cloneDeep(state)
      state.instance.selected = null
      expect(getSelected(state)).to.equal(null)
    })

    it('getSelectedContent', () => {
      expect(getSelectedContent(state)).to.equal('text')

      state = cloneDeep(state)
      state.instance.selected = null
      expect(getSelected(state)).to.equal(null)
    })
  })
})
