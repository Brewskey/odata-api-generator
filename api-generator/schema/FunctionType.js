// @flow

import type { FunctionTypeType } from './schema-types';

import Parameter from './Parameter';
import ReturnType from './ReturnType';

export default class FunctionType {
  _json: FunctionTypeType;
  _parameters: Array<Parameter>;
  _returnType: ReturnType;

  constructor(json: FunctionTypeType) {
    this._json = json;
    this._parameters = (json.Parameter || []).map(item => new Parameter(item));
    this._returnType = new ReturnType(json.ReturnType);
  }
}
