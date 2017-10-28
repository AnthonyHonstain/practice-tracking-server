import {INITIAL_STATE, setRecords, add, updateRecordId, updateRecordType, finalize} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  // The console log looks fucking hideous with the test framework output.
  //console.log('\nreducer.js REDUCER', state, action)

  switch (action.type) {
    case 'SET_RECORDS':
      return setRecords(state, action.records);
    case 'ADD_RECORD':
      return add(state);
    case 'UPDATE_RECORD_ID':
      return updateRecordId(state, action.recordId);
    case 'UPDATE_RECORD_TYPE':
      return updateRecordType(state, action.recordType);
    case 'FINALIZE_RECORD':
      return finalize(state)
  }
  return state;
}