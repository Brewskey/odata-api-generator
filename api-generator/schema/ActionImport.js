// @flow

import type { ActionImportType } from './schema-types';

export default class ActionImport {
  _json: ActionImportType;

  constructor(json: ActionImportType) {
    this._json = json;
  }

  get action(): string {
    return this._json.Action;
  }

  get name(): string {
    return this._json.Name;
  }
}
