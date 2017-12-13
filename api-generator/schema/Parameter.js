// @flow

import type { ParameterType } from './schema-types';

export default class Parameter {
  _json: ParameterType;
  constructor(json: ParameterType) {
    this._json = json;
  }
}
