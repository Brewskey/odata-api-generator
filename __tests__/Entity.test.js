// @flow

import test from 'ava';
import sinon from 'sinon';
import Entity from '../src/Entity';
import EntityConfig from '../src/util/EntityConfig';

const emptyResolver = () => Promise.resolve();

test('Object without any keys', t => {
  // const entityConfig = new EntityConfig([], []);
  // const entity = Entity(entityConfig);
  //
  // t.deepEqual(entity, {});
});

test('Object with navigation props', t => {
  // const entityConfig = new EntityConfig([['test', emptyResolver]], []);
  // const entity = Entity(entityConfig);
  // t.deepEqual(entity, { test: emptyResolver });
});

test('Object with navigation collection props', t => {
  // const entityConfig = new EntityConfig([], [['test', emptyResolver]]);
  // const entity = Entity(entityConfig);
  // t.deepEqual(entity, { test: emptyResolver });
});

test('Object with all types of props', t => {
  // const entityConfig = new EntityConfig(
  //   [['test2', emptyResolver]],
  //   [['test3', emptyResolver]],
  // );
  // const entity = Entity(entityConfig);
  // t.deepEqual(entity, {
  //   test1: emptyResolver,
  //   test2: emptyResolver,
  //   test3: emptyResolver,
  // });
});
