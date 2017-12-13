// @flow

import type { ITypeGenerator, EntityTypeType } from './schema-types';
import type Schema from './Schema';

import NavigationProperty from './NavigationProperty';
import Property from './Property';
import { setSystemTypeToCache, stringComparer } from './util';

export default class EntityType implements ITypeGenerator {
  _json: EntityTypeType;
  _navigationProperties: Array<NavigationProperty>;
  _properties: Array<Property>;

  constructor(json: EntityTypeType, schema: Schema) {
    setSystemTypeToCache(schema.namespace, json.$.Name);

    this._json = json;
    this._navigationProperties = (json.NavigationProperty || []).map(
      item => new NavigationProperty(item, schema),
    );
    this._properties = (json.Property || []).map(
      item => new Property(item, schema),
    );
  }

  generateFlowType(): string {
    let output = `\tdeclare export type ${this._json.$.Name} = {|\n`;
    const definitions = [
      ...this._properties.map(item => [item.name, item.generateFlowType()]),
      ...this._navigationProperties.map(item => [
        item.name,
        item.generateFlowType(),
      ]),
    ].sort(stringComparer(item => item[0]));
    output = definitions.reduce(
      (current, item) => current + item[1] + '\n',
      output,
    );

    return output + '\t|};';
  }
}
