import makeStore from './src/store';
import {startServer} from './src/server';
import {List, Map} from 'immutable';

export const store = makeStore();
startServer(store);

store.dispatch({
  type: 'SET_RECORDS',
  records: List([
    Map({'recordId': '1', 'recordType': 'foo'})
  ])
  //entries: require('./entries.json')
});
