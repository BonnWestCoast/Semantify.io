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
  getStatuses,
  getCreatingOntologyStatus,

  CREATE_ONTOLOGY,
  CREATE_ONTOLOGY_SUCCESS,
  CREATE_ONTOLOGY_FAIL,
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

  describe('CREATE_ONTOLOGY', () => {
    let state
    let action
    let result
    beforeEach(() => {
      state = cloneDeep(initialState)
      action = {
        type: CREATE_ONTOLOGY,
      }
      result = reducer(state, action)
    })

    it('changes status to run: true', () => {
      expect(result.statuses.creatingOntology.run).to.equal(true)
    })

    it('resets error and successMessage', () => {
      state.statuses.creatingOntology.error = new Error()
      state.statuses.creatingOntology.successMessage = 'success!'
      result = reducer(state, action)
      expect(result.statuses.creatingOntology.error).to.equal(null)
      expect(result.statuses.creatingOntology.successMessage).to.equal('')
    })
  })

  describe('CREATE_ONTOLOGY_SUCCESS', () => {
    let state
    let action
    let result
    beforeEach(() => {
      state = cloneDeep(initialState)
      action = {
        type: CREATE_ONTOLOGY_SUCCESS,
      }
      result = reducer(state, action)
    })

    it('changes status', () => {
      expect(result.statuses.creatingOntology).to.deep.equal({
        run: false,
        error: null,
        successMessage: 'Ontology created!',
      })
    })
  })

  describe('CREATE_ONTOLOGY_FAIL', () => {
    let state
    let action
    let result
    let error = new Error()
    beforeEach(() => {
      state = cloneDeep(initialState)
      action = {
        type: CREATE_ONTOLOGY_FAIL,
        error
      }
      result = reducer(state, action)
    })

    it('changes status', () => {
      expect(result.statuses.creatingOntology).to.deep.equal({
        run: false,
        error,
        successMessage: '',
      })
    })
  })

  describe('selectors', () => {
    let state
    let store
    let list
    let statuses
    beforeEach(() => {
      list = {
        'new': {
          id: 'new',
          name: 'new',
          content: 'text',
        },
      }

      statuses = {
        creatingOntology: {
          run: false,
          error: null,
          successMessage: '',
        }
      }

      store = {
        list,
        selected: 'new',
        statuses,
      }

      state = {
        instance: store,
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

    it('getStatuses returns all statuses', () => {
      expect(getStatuses(state)).to.deep.equal(statuses)
    })

    it('getCreatingOntologyStatus returns status object', () => {
      expect(getCreatingOntologyStatus(state)).to.deep.equal({
        run: false,
        error: null,
        successMessage: '',
      })
    })
  })
})
