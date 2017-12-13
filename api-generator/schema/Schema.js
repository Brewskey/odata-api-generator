// @flow

import type { ITypeGenerator, SchemaType } from './schema-types';
import type NavigationProperty from './NavigationProperty';

import Action from './Action';
import ComplexType from './ComplexType';
import EntityContainer from './EntityContainer';
import EntityType from './EntityType';
import EnumType from './EnumType';
import FunctionType from './FunctionType';
import {
  formatNamespace,
  getTypeFromFullyQualifiedType,
  joinFlowTypeValue,
} from './util';

export default class Schema implements ITypeGenerator {
  _actions: Array<Action>;
  _complexTypes: Array<ComplexType>;
  _entityContainers: Array<EntityContainer>;
  _entityTypes: Array<EntityType>;
  _enumTypes: Array<EnumType>;
  _externalReferences: Set<string>;
  _functionTypes: Array<FunctionType>;
  _json: SchemaType;
  _namespace: string;

  constructor(json: SchemaType) {
    this._externalReferences = new Set();

    this._json = json;
    this._namespace = this._json.$.Namespace;
    this._actions = (json.Action || []).map(item => new Action(item));
    this._complexTypes = (json.ComplexType || []).map(
      item => new ComplexType(item, this),
    );
    this._entityContainers = (json.EntityContainer || []).map(
      item => new EntityContainer(item),
    );
    this._entityTypes = (json.EntityType || []).map(
      item => new EntityType(item, this),
    );
    this._enumTypes = (json.EnumType || []).map(
      item => new EnumType(item, this),
    );
    this._functionTypes = (json.Function || []).map(
      item => new FunctionType(item),
    );
  }

  get namespace(): string {
    return this._namespace;
  }

  includeIfExternalReference(fullyQualifiedType: string): void {
    this._externalReferences.add(fullyQualifiedType);
  }

  generateFlowType(): string {
    let output = '';
    const externalReferences = Array.from(this._externalReferences).map(
      fullyQualifiedType => getTypeFromFullyQualifiedType(fullyQualifiedType),
    );
    if (externalReferences.length) {
      output += joinFlowTypeValue(
        externalReferences.map(
          reference =>
            `import type ${reference.systemType} from '${reference.namespace}'`,
        ),
      );
      output += '\n';
    }
    output += `declare module '${formatNamespace(this.namespace)}' {`;
    output += joinFlowTypeValue(
      this._enumTypes.map(item => item.generateFlowType()),
    );

    output += joinFlowTypeValue(
      this._entityTypes.map(item => item.generateFlowType()),
    );

    output += joinFlowTypeValue(
      this._complexTypes.map(item => item.generateFlowType()),
    );

    return output + '}';
  }
}
