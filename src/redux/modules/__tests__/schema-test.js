/**
 * created by Alexey Karpov
 */

import { expect } from 'chai'
import reducer from '../schema'
import {
  LOAD_LIST_SUCCESS,
  initialState,
  getSchemasArray,
  getSelectedSchemaIndex,
  getSelectedTitle,
  select,
  SELECT as SELECT_TYPE,
  getSelectedSchema,
  userInput,
  USER_INPUT,
  getNewSchema,
  doesUserCreateNewSchema,
  getSelectedSchemaContent,
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
        list: {},
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

    it.skip('removes "new" from the list', () => {
      state.list.new = {
        id: 'new',
        content: 'some text'
      }

      let newResult = reducer(state, action)
      expect(newResult.list.new).to.be.not.ok // eslint-disable-line
    })

    it.skip('but does not removes "new" if it is just selected', () => {
      state.list.new = {
        id: 'new',
        content: 'some text'
      }

      action = {
        type: SELECT_TYPE,
        index: 'new'
      }

      let newResult = reducer(state, action)
      expect(newResult.list.new).to.be.ok // eslint-disable-line
      expect(newResult.list.new.id).to.equal('new')
      expect(newResult.selected).to.equal('new')
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

  describe('getSelectedSchemaIndex', () => {
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

    it('getSelectedSchemaIndex is a function', () => {
      expect(getSelectedSchemaIndex).to.be.a('function')
    })

    it('returns selected', () => {
      expect(getSelectedSchemaIndex(state)).to.equal(null)

      state.schema.selected = 1
      expect(getSelectedSchemaIndex(state)).to.equal(1)
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

    it('is a function', () => expect(getSelectedSchema).to.be.a('function'))

    it('returns null if no schema selected', () => {
      expect(getSelectedSchema(state)).to.equal(null)
    })

    it('returns selectedSchema', () => {
      state.schema.selected = 0
      expect(getSelectedSchema(state)).to.deep.equal({
        name: 'first schema'
      })

      state.schema.selected = 1
      expect(getSelectedSchema(state)).to.deep.equal({
        name: 'second schema'
      })
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

  describe('getNewSchema and doesUserCreateNewSchema', () => {
    let state
    beforeEach(() => {
      state = {
        schema: {
          list: {
            new: {
              id: 'new'
            }
          }
        }
      }
    })

    it('getNewSchema is a function', () => {
      expect(getNewSchema).to.be.a('function')
    })

    it('doesUserCreateNewSchema is a function', () => {
      expect(doesUserCreateNewSchema).to.be.a('function')
    })

    it('getNewSchema returns newSchema', () => {
      expect(getNewSchema(state)).to.deep.equal({ id: 'new' })
    })

    it('doesUserCreateNewSchema returns true if new schema exists', () => {
      expect(doesUserCreateNewSchema(state)).to.equal(true)
    })

    it('doesUserCreateNewSchema returns false if new schema does not exist', () => {
      delete state.schema.list.new
      expect(doesUserCreateNewSchema(state)).to.equal(false)
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

  describe('userInput', () => {
    it('is a function', () => expect(userInput).to.be.a('function'))

    it('return action', () => {
      let action = userInput('some text')
      expect(action.type).to.equal(USER_INPUT)
      expect(action.text).to.equal('some text')
      expect(Object.keys(action).length).to.equal(2)
    })
  })

  describe('USER_INPUT', () => {
    let action
    let state
    let result

    beforeEach(() => {
      state = {
        list: {
          1: {
            id: 1,
            name: '1',
            content: '1',
          },
          2: {
            id: 2,
            name: '2',
            content: '2',
          }
        },
        selected: 1
      }

      action = {
        type: USER_INPUT,
        text: 'hello! this is my text'
      }

      result = reducer(state, action)
    })

    it('returns new object', () => {
      expect(state).to.equal(state)
      expect(state).to.deep.equal(state)
    })

    it('switches selected schems to "new"', () => {
      expect(result.selected).to.equal('new')
    })

    it('adds "new" to list if it does not exist', () => {
      expect(result.list.new).to.be.ok // eslint-disable-line
    })

    it('"new" has id', () => {
      expect(result.list.new.id).to.equal('new')
    })

    it('modifies existing "new" content', () => {
      expect(result.list.new.content).to.equal(action.text)
    })

    it('deletes "new" if text field is empty', () => {
      let newState = cloneDeep(state)
      newState.list.new = {
        id: 'new',
        text: 'some text',
      }

      action = {
        type: USER_INPUT,
        text: ''
      }

      result = reducer(newState, action)

      expect(result.selected).to.equal(null)
      expect(result.list.new).to.be.not.ok // eslint-disable-line
    })

    it('new schema has name "new"', () => {
      expect(result.list.new.name).to.equal('new')
    })
  })

  describe('getSelectedSchemaContent', () => {
    let state
    beforeEach(() => {
      state = {}
      state.schema = {
        list: {
          1: {
            content: 'hey!'
          }
        },
        selected: 1,
      }
    })

    it('is a function', () => {
      expect(getSelectedSchemaContent).to.be.a('function')
    })

    it('returns selected schema content', () => {
      expect(getSelectedSchemaContent(state)).to.equal('hey!')
    })
  })
})
