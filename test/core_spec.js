import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setRecords, add, finalize} from '../src/core';

const RECORD_TEST_FOO = Map({'id':'A001', 'start':null, 'finish':null, 'type':'foo', 'count':11});

describe('application logic', () => {
  describe('setRecords', () => {
    it('add entries to the state', () => {
      const state = Map();
      const records = List.of('foo', 'bar');
      const nextState = setRecords(state, records);

      expect(nextState).to.equal(Map({records: List(['foo', 'bar'])}))
    });

    it('add entries that are non-basic types', () => {
      const state = Map();
      const records = List.of(
        Map({'id':'A001', 'start':null, 'finish':null, 'type':'foo', 'count':11})
      );
      const nextState = setRecords(state, records);

      expect(nextState).to.equal(Map({records: List([RECORD_TEST_FOO])}))
    });
  });

  describe('new record', () => {
    it('starts a new log record', () => {
      const state = Map({ records: List(['foo', 'bar'])});
      const record = "";
      const nextState = add(state)

      expect(nextState).to.equal(Map({
        records: List(['foo', 'bar']),
        newRecord: Map({'recordId':'', 'recordType':''})
      }));
    });

    // I have no idea if this is a good idea yet, but we will start with
    // upsert like behavior for add.
    /*it('upsert like update behavior if new record already started', () => {
      const state = Map({
        records: List(['foo', 'bar']),
        newRecord: ''
      });
      const updatedRecord = 'test';
      const nextState = add(state, updatedRecord);

      expect(nextState).to.equal(Map({
        records: List(['foo', 'bar']),
        newRecord: 'test'
      }));
    });

    it('update existing newRecord with a Map object', () => {
      const state = Map({
        records: List(),
        newRecord: Map({'id':null, 'start':null, 'finish':null, 'type':'foo', 'count':null})
      });
      const updatedRecord = Map({'id':null, 'start':null, 'finish':null, 'type':'bar', 'count':10})
      const nextState = add(state, updatedRecord);

      expect(nextState).to.equal(Map({
        records: List(),
        newRecord: updatedRecord
      }));
    });*/
  });

  describe('finalize new record', () => {
    it('noop if there is no open new record', () => {
      const state = Map({ records: List(['foo', 'bar'])});
      const nextState = finalize(state);

      expect(nextState).to.equal(Map({ records: List(['foo', 'bar'])}));
    });

    it('finalize the newRecord by moving it to the records', () => {
      const state = Map({
        records: List(['foo', 'bar']),
        newRecord: 'test'
      });
      const nextState = finalize(state);

      expect(nextState).to.equal(Map({ records: List(['foo', 'bar', 'test'])}));
    });

    it('finalize the newRecord with a Map object', () => {
      const state = Map({
        records: List([RECORD_TEST_FOO]),
        // TODO - the id should only get added later by core.js
        newRecord: Map({'id':'A002', 'start':null, 'finish':null, 'type':'bar', 'count':10})
      });
      const nextState = finalize(state);

      expect(nextState).to.equal(Map({ records: List([
        RECORD_TEST_FOO,
        Map({'id':'A002', 'start':null, 'finish':null, 'type':'bar', 'count':10})
      ])}));
    });
  });
});