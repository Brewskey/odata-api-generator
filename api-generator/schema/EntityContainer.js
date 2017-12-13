// @flow

import type { EntityContainerType } from './schema-types';

import ActionImport from './ActionImport';
import EntitySet from './EntitySet';

export default class EntityContainer {
  _actionImports: Array<ActionImport>;
  _entitySets: Array<EntitySet>;
  _json: EntityContainerType;

  constructor(json: EntityContainerType) {
    this._json = json;
    this._actionImports = (json.ActionImport || []).map(
      item => new ActionImport(item),
    );
    this._entitySets = (json.EntitySet || []).map(item => new EntitySet(item));
  }
}
