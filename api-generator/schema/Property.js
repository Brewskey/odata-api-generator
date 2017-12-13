// @flow

import type { ITypeGenerator, PropertyType } from './schema-types';
import type Schema from './Schema';

import {
  getFlowTypeBySystemType,
  getFullyQualifiedType,
  getTypeFromFullyQualifiedType,
  isCollectionType,
  isEdmType,
} from './util';

export default class Property implements ITypeGenerator {
  _fullyQualifiedType: string;
  _isCollection: boolean;
  _json: PropertyType;

  constructor(json: PropertyType, schema: Schema) {
    this._json = json;

    this._fullyQualifiedType = getFullyQualifiedType(this._json.$.Type);
    this._isCollection = isCollectionType(this._json.$.Type);

    if (
      !isEdmType(this.fullyQualifiedType) &&
      (this.fullyQualifiedType.length < schema.namespace.length ||
        !this.fullyQualifiedType.startsWith(schema.namespace + '.') ||
        this.fullyQualifiedType.indexOf('.', schema.namespace.length + 1) !==
          -1)
    ) {
      schema.includeIfExternalReference(this.fullyQualifiedType);
    }
  }

  get fullyQualifiedType(): string {
    return this._fullyQualifiedType;
  }

  get isCollection(): boolean {
    return this._isCollection;
  }

  get isNullable(): boolean {
    return this._json.$.Nullable === 'true';
  }

  get name(): string {
    return this._json.$.Name;
  }

  get namespace(): string {
    return getTypeFromFullyQualifiedType(this._fullyQualifiedType).namespace;
  }

  get systemType(): string {
    return getTypeFromFullyQualifiedType(this._fullyQualifiedType).systemType;
  }

  get flowType(): string {
    return getFlowTypeBySystemType(this._fullyQualifiedType, this.isCollection);
  }

  generateFlowType(): string {
    return `\t\t${this.name}: ${this.isNullable ? '?' : ''}${this.flowType},`;
  }
}
