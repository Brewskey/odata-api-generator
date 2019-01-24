// @flow

import type { ExtractReturnType } from './types';
import type EntityConfig from './util/EntityConfig';

import nullthrows from 'nullthrows';

export type NavigationProperty<
  TObject,
  TKeys: $Keys<TObject>,
  TNavigationProperties = { [key: TKeys]: ExtractReturnType },
> = {
  ...$ObjMap<TNavigationProperties, ExtractReturnType>,
  (): Promise<TObject>,
};

type NavigationPropertiesBase<TObject: Object, TKeys: $Keys<TObject>> = {
  [key: TKeys]: ExtractReturnType,
};

const entityMap: Map<string, NavigationProperty<*, *>> = new Map();

export function getNavigationPropertyExtractor(
  typeName: string,
): ExtractReturnType {
  return () => (nullthrows(entityMap.get(typeName)): any);
}

export default function $NavigationProperty<
  TEntity: Object,
>(navigationProperties: {
  [key: $Keys<TEntity>]: ExtractReturnType,
}): Class<TEntity> {
  const EntityClass = function EntityType() {};

  Object.keys(navigationProperties).forEach(key => {
    Object.defineProperty(EntityClass.prototype, key, {
      get() {
        return navigationProperties[key]();
      },
    });
  });

  return ((EntityClass: any): Class<TEntity>);
}
