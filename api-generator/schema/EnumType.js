// @flow

import type { EnumTypeType, ITypeGenerator } from './schema-types';
import type Schema from './Schema';

import Member from './Member';
import { setSystemTypeToCache, stringComparer } from './util';

export default class EnumType implements ITypeGenerator {
  _json: EnumTypeType;
  _members: Array<Member>;

  constructor(json: EnumTypeType, schema: Schema) {
    setSystemTypeToCache(schema.namespace, json.$.Name);

    this._json = json;
    this._members = (json.Member || [])
      .sort(stringComparer(item => item.$.Name))
      .map(item => new Member(item));
  }

  generateFlowType(): string {
    let output = `  declare type ${this._json.$.Name} = {|\n`;

    output = this._members.reduce(
      (current, item) => current + item.generateFlowType(),
      output,
    );

    return output + '  |};';
  }
}
