// @flow

import type { ITypeGenerator, MemberType } from './schema-types';

export default class Member implements ITypeGenerator {
  _json: MemberType;

  constructor(json: MemberType) {
    this._json = json;
  }

  get name(): string {
    return this._json.$.Name;
  }

  get value(): number | string {
    return this._json.$.Value;
  }

  generateFlowType(): string {
    return `    ${this.name}: ${this.value};\n`;
  }
}
