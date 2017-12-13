// @flow

import type { ComplexTypeType } from './schema-types';
import type Schema from './Schema';

import Property from './Property';
import { setSystemTypeToCache, stringComparer } from './util';

export default class ComplexType {
  _json: ComplexTypeType;
  _properties: Array<Property>;

  constructor(json: ComplexTypeType, schema: Schema) {
    setSystemTypeToCache(schema.namespace, json.$.Name);

    this._json = json;
    this._properties = (json.Property || [])
      .map(item => new Property(item, schema))
      .sort(stringComparer(item => item.name));
  }

  generateFlowType(): string {
    let output = `  declare export type ${this._json.$.Name} = {|\n`;

    output = this._properties
      .map(item => item.generateFlowType())
      .reduce((current, item) => current + item + '\n', output);

    return output + '  |};';
  }
}
