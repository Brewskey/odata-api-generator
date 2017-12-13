// @flow

import type { ActionType } from './schema-types';

import Parameter from './Parameter';
import ReturnType from './ReturnType';

export default class Action {
  _json: ActionType;
  _parameters: Array<Parameter>;
  _returnType: ReturnType;

  constructor(json: ActionType) {
    this._json = json;
    this._parameters = (json.Parameter || []).map(item => new Parameter(item));
    this._returnType = new ReturnType(json.ReturnType);
  }
}
