// @flow

import type { ReturnTypeType } from './schema-types';

export default class ReturnType {
  _json: ReturnTypeType;
  constructor(json: ReturnTypeType) {
    this._json = json;
  }
}
