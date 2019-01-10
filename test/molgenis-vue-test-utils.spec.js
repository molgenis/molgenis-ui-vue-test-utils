import { expect } from 'chai'
import utils from '../src/molgenis-vue-test-utils'

describe('Testing utilities', () => {
  describe('## testAction ##', () => {
    it('should test an action with a commit and a dispatch using both state and payload', done => {
      const TEST_COMMIT = '__TEST_COMMIT__'
      const TEST_DISPATCH = '__TEST_DISPATCH__'

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
    it('should test an action with a commit using rootState', done => {
      const TEST_COMMIT = '__TEST_COMMIT__'
      const action = ({commit, rootState}) => {
        commit(TEST_COMMIT, rootState.id)
      }
      const options = {
        payload: 'test',
        rootState: {
          id: '1'
        },
        expectedMutations: [
            {type: TEST_COMMIT, payload: '1'}
        ]
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
