import { expect } from 'chai'
import utils from '../../../src/molgenis-vue-test-utils'
import sinon from 'sinon'

describe('Testing utilities', () => {

  describe('## testAction ##', () => {
    const TEST_COMMIT = '__TEST_COMMIT__'
    const TEST_DISPATCH = '__TEST_DISPATCH__'

    it('should call done without argument if nothing happens and nothing is expected', () => {
      const action = () => {}
      const options = {}
      const done = sinon.fake()
      utils.testAction(action, options, done)
      expect(done.calledOnce).to.eq(true)
      expect(done.firstCall.args).to.deep.eq([])
    })

    it('should not call done if some expected mutations were not committed', () => {
      const action = ({commit}) => {
        commit(TEST_COMMIT, '1')
      }
      const options = { expectedMutations: [
        {type: TEST_COMMIT, payload: '1'},
        {type: TEST_COMMIT, payload: '2'}]
      }

      const done = sinon.fake()
      utils.testAction(action, options, done)

      expect(done.called).to.eq(false)
    })

    it('should call done with an error if mutation with unexpected payload is committed', () => {
      const action = ({commit}) => {
        commit(TEST_COMMIT, '2')
      }
      const options = { expectedMutations: [
          {type: TEST_COMMIT, payload: '1'}]
      }

      const done = sinon.fake()
      utils.testAction(action, options, done)

      expect(done.called).to.eq(true)
      expect(done.firstCall.args[0].message).to.eq('expected \'1\' to deeply equal \'2\'')
    })

    it('should call done with an error if unexpected mutation is committed', () => {
      const action = ({commit}) => {
        commit(TEST_COMMIT, '2')
      }
      const options = {}

      const done = sinon.fake()
      utils.testAction(action, options, done)

      expect(done.called).to.eq(true)
      expect(done.firstCall.args[0].message).to.eq('Cannot read property \'type\' of undefined')
    })

    it('should call done with an error if unexpected action is dispatched', () => {
      const action = ({dispatch}) => {
        dispatch(TEST_DISPATCH, '2')
      }
      const options = {}

      const done = sinon.fake()
      utils.testAction(action, options, done)

      expect(done.called).to.eq(true)
      expect(done.firstCall.args[0].message).to.eq('Cannot read property \'type\' of undefined')
    })

    it('should test an action with a commit and a dispatch using both state and payload', done => {
      const action = ({commit, dispatch, state}, payload) => {
        commit(TEST_COMMIT, state.id)
        dispatch(TEST_DISPATCH, payload)
      }

      const options = {
        payload: 'test',
        state: {
          id: '1'
        },
        expectedMutations: [
          {type: TEST_COMMIT, payload: '1'}

        ],
        expectedActions: [
          {type: TEST_DISPATCH, payload: 'test'}
        ],
        getters: {
          testValue: 'testGetter'
        }
      }

      utils.testAction(action, options, done)
    })

    it('should test an action with multiple commits', done => {
      const TEST_COMMIT_1 = '__TEST_COMMIT_1__'
      const TEST_COMMIT_2 = '__TEST_COMMIT_2__'
      const TEST_COMMIT_3 = '__TEST_COMMIT_3__'
      const TEST_COMMIT_4 = '__TEST_COMMIT_4__'
      const TEST_COMMIT_5 = '__TEST_COMMIT_5__'
      const TEST_COMMIT_6 = '__TEST_COMMIT_6__'

      const action = ({commit, dispatch, getters, state}, payload) => {
        commit(TEST_COMMIT_1, null)
        commit(TEST_COMMIT_2, state.id)
        commit(TEST_COMMIT_3, state.name)
        commit(TEST_COMMIT_4, state.label)
        commit(TEST_COMMIT_5, payload)
        commit(TEST_COMMIT_6, getters.testValue)
      }

      const options = {
        payload: 'test',
        state: {
          id: 'id',
          name: 'name',
          label: 'label'
        },
        expectedMutations: [
          {type: TEST_COMMIT_1, payload: null},
          {type: TEST_COMMIT_2, payload: 'id'},
          {type: TEST_COMMIT_3, payload: 'name'},
          {type: TEST_COMMIT_4, payload: 'label'},
          {type: TEST_COMMIT_5, payload: 'test'},
          {type: TEST_COMMIT_6, payload: 'testGetter'}
        ]
      }

      utils.testAction(action, options, done)
    })

    it('should test an action with multiple dispatches', done => {
      const TEST_DISPATCH_1 = '__TEST_DISPATCH_1__'
      const TEST_DISPATCH_2 = '__TEST_DISPATCH_2__'
      const TEST_DISPATCH_3 = '__TEST_DISPATCH_3__'
      const TEST_DISPATCH_4 = '__TEST_DISPATCH_4__'
      const TEST_DISPATCH_5 = '__TEST_DISPATCH_5__'

      const action = ({commit, dispatch, state}, payload) => {
        dispatch(TEST_DISPATCH_1, null)
        dispatch(TEST_DISPATCH_2, state.id)
        dispatch(TEST_DISPATCH_3, state.name)
        dispatch(TEST_DISPATCH_4, state.label)
        dispatch(TEST_DISPATCH_5, payload)
      }

      const options = {
        payload: 'test',
        state: {
          id: 'id',
          name: 'name',
          label: 'label'
        },
        expectedActions: [
          {type: TEST_DISPATCH_1, payload: null},
          {type: TEST_DISPATCH_2, payload: 'id'},
          {type: TEST_DISPATCH_3, payload: 'name'},
          {type: TEST_DISPATCH_4, payload: 'label'},
          {type: TEST_DISPATCH_5, payload: 'test'}
        ]
      }

      utils.testAction(action, options, done)
    })
  })
})
