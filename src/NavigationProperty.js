// @flow

import type { ResolveEntity } from './types';
import type EntityConfig from './util/EntityConfig';

type NavigationPropertyType<TEntity> = ResolveEntity<TEntity> & TEntity;

function NavigationProperty<TEntity>(
  entity: TEntity,
): NavigationPropertyType<TEntity> {
  const getter = (): Promise<TEntity> => {
    return Promise.resolve(({}: any));
  };

  Object.assign(getter, entity);

  return (getter: any);
}

export default NavigationProperty;
