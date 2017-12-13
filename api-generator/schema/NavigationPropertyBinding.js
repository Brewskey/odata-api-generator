// @flow

import type { NavigationPropertyBindingType } from './schema-types';

export default class NavigationPropertyBinding {
  _json: NavigationPropertyBindingType;

  constructor(json: NavigationPropertyBindingType) {
    this._json = json;
  }

  get path(): string {
    return this._json.Path;
  }

  get target(): string {
    return this._json.Target;
  }
}
