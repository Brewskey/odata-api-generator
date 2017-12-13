// @flow

import type { EntitySetType } from './schema-types';

import NavigationPropertyBinding from './NavigationPropertyBinding';

export default class EntitySet {
  _json: EntitySetType;
  _navigationPropertyBindings: Array<NavigationPropertyBinding>;

  constructor(json: EntitySetType) {
    this._json = json;
    this._navigationPropertyBindings = (
      json.NavigationPropertyBinding || []
    ).map(item => new NavigationPropertyBinding(item));
  }
}
