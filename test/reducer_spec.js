import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_RECORDS', () => {
    const initialState = Map();
    const action = {type: 'SET_RECORDS', records: ['foo']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      records: ['foo']
    }));
  });

  it('handles ADD_RECORD', () => {
    const initialState = fromJS({
      records: ['foo']
    });
    const action = {type: 'ADD_RECORD'}
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      records: ['foo'],
      newRecord: {'recordId': '', 'recordType': ''}
    }));
  });

  it('handles FINALIZE_RECORD', () => {
    const initialState = fromJS({
      records: ['foo'],
      newRecord: 'bar'
    });
    const action = {type: 'FINALIZE_RECORD'}
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      records: ['foo', 'bar']
    }));
  });

  it('it can be used with reducer', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'},
    ];
    //const finalState = actions.reduce(reducer, Map());

    //expect(finalState).to.equal(fromJS({ winner: 'Trainspotting' }));
  });
});