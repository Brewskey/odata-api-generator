// @flow

import type { ExtractReturnType } from './types';

let a = new Proxy({ bar() {} }, {});
a.bar();

export default function Entity<TEntity: Object>(navigationProperties: {
  [key: $Keys<TEntity>]: ExtractReturnType,
}): Class<TEntity> {
  const EntityClass = class EntityType {
    constructor(data: $Shape<TEntity>) {
      Object.keys(data).forEach(key => {
        Object.defineProperty(this, key, {
          get() {
            return data[key];
          },
          set(newValue) {
            data[key] = newValue;
          },
        });
      });
    }
  };

  Object.keys(navigationProperties).forEach(key => {
    Object.defineProperty(EntityClass.prototype, key, {
      get() {
        return navigationProperties[key]();
      },
    });
  });

  return EntityClass;
}
