import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setRecords(state, records) {
  //console.log('records', records);
  return state.set('records', List(records));
}

export function add(state) {
  const newState = state.set('newRecord', Map({'recordId':'', 'recordType':''}));
  //console.log('\tcore.js add', newState);
  return newState;
}

export function updateRecordId(state, value) {
  var newRecord;
  if (state.has('newRecord')) {
    newRecord = state.get('newRecord');
  }
  else {
    newRecord = Map({'recordId':'', 'recordType':''});
  }

  const newState = state.set('newRecord', Map({'recordId':value, 'recordType':newRecord.get('recordType')}));
  //console.log('\tcore.js updateRecordId', newState);
  return newState;
}

export function updateRecordType(state, value) {
  var newRecord;
  if (state.has('newRecord')) {
    newRecord = state.get('newRecord');
  }
  else {
    newRecord = Map({'recordId':'', 'recordType':''});
  }

  const newState = state.set('newRecord', Map({'recordId':newRecord.get('recordId'), 'recordType':value}));
  //console.log('\tcore.js updateRecordType', newState);
  return newState;
}

export function finalize(state) {
  const records = state.get('records');
  const newRecord = state.get('newRecord');

  //console.log('core.js finalize', newRecord);
  if (newRecord) {
    const newState = Map({records: records.push(newRecord)});
    //console.log('\tcore.js finalize', newState);
    return newState;
  }
  return state;
}
