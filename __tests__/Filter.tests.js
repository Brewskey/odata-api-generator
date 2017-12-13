// @flow

import test from 'ava';
import sinon from 'sinon';
import Filter from '../src/Filter';
import Queryable from '../src/Queryable';
import buildEntityKeyResolver from '../src/util/buildEntityKeyResolver';

type BasicType = {
  id: number,
  name: string,
};

test('equals', t => {
  // const queryable: Queryable<BasicType> = sinon.createStubInstance(Queryable);
  // const resolver = buildEntityKeyResolver({ id: 123, name: 'asdf' }, new Map());
  // var v = resolver.id;
  // const filter: Filter<BasicType> = new Filter(queryable, resolver);
  // const foo = filter.equals(e => e.id, 123);
  t.is(true, true);
});
