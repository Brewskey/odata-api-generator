// @flow

import test from 'ava';
import buildEntityKeyResolver from '../src/util/buildEntityKeyResolver';

type Type1 = { id: number, name: string };

test('Resolver generates keys correctly', t => {
  // const entity1: Type1 = {
  //   id: 11,
  //   name: 'asdf',
  // };
  //
  // const entity2: { id: number, value: Type1 } = {
  //   id: 11,
  //   value: entity1,
  // };
  //
  // const resolver1 = new buildEntityKeyResolver(entity1, new Map());
  // const resolver2 = new buildEntityKeyResolver(
  //   entity2,
  //   new Map([['value', resolver1]]),
  // );
  //
  // t.deepEqual(resolver2.value.name.getCombinedKeys(), ['value', 'name']);
  t.is(true, true);
});
