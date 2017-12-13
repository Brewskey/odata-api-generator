// @flow

import type { ITypeGenerator } from './schema-types';

import nullthrows from 'nullthrows';

const COLLECTION = 'Collection(';
const FLOW_TYPE_BY_SYSTEM_TYPE = new Map([
  ['Edm.Binary', 'string'],
  ['Edm.Boolean', 'boolean'],
  ['Edm.Byte', 'number'],
  ['Edm.DateTime', 'Date'],
  ['Edm.DateTimeOffset', 'Date'],
  ['Edm.Decimal', 'number'],
  ['Edm.Double', 'number'],
  ['Edm.Guid', 'string'],
  ['Edm.Int16', 'number'],
  ['Edm.Int32', 'number'],
  ['Edm.Int64', 'number'],
  ['Edm.SByte', 'number'],
  ['Edm.Single', 'number'],
  ['Edm.String', 'string'],
  ['Edm.Time', 'Date'],
  ['Null', 'null'],
]);

type SystemType = {
  namespace: string,
  systemType: string,
};

const TYPE_BY_FULLY_QUALIFIED_TYPE: Map<string, SystemType> = new Map();
export function getTypeFromFullyQualifiedType(
  fullyQualifiedType: string,
): SystemType {
  try {
    return nullthrows(TYPE_BY_FULLY_QUALIFIED_TYPE.get(fullyQualifiedType));
  } catch (exception) {
    console.log(fullyQualifiedType, exception);
    throw exception;
  }
}

export function setSystemTypeToCache(
  namespace: string,
  systemType: string,
): void {
  TYPE_BY_FULLY_QUALIFIED_TYPE.set(`${namespace}.${systemType}`, {
    namespace,
    systemType,
  });
}

export function formatNamespace(namespace: string) {
  return 'odata_' + namespace.replace(/\./g, '_').toLowerCase();
}

export function joinFlowTypeValue(definitions: Array<string>): string {
  if (!definitions.length) {
    return '';
  }

  return (
    definitions.reduce((output, definition) => output + '\n' + definition, '') +
    '\n'
  );
}

export function isCollectionType(key: string): boolean {
  return key.startsWith(COLLECTION);
}

export function getFullyQualifiedType(key: string) {
  if (key.startsWith(COLLECTION)) {
    key = key.replace(COLLECTION, '').slice(0, -1);
  }

  return key;
}

export function getSystemNamespace(
  key: string,
  schemaNamespaces: Array<string>,
): ?string {
  return schemaNamespaces.find(schema => {
    const index = key.indexOf(schema);

    if (index === -1) {
      return false;
    }
    return key.indexOf('.', schema.length + 1) === -1;
  });
}

export function isEdmType(type: string): boolean {
  return FLOW_TYPE_BY_SYSTEM_TYPE.has(type);
}

export function getFlowTypeBySystemType(
  fullyQualifiedType: string,
  isCollection: boolean,
) {
  try {
    let { systemType } = TYPE_BY_FULLY_QUALIFIED_TYPE.get(
      fullyQualifiedType,
    ) || { systemType: '' };
    if (!systemType) {
      systemType = nullthrows(FLOW_TYPE_BY_SYSTEM_TYPE.get(fullyQualifiedType));
    }

    if (isCollection) {
      return `Array<${systemType}>`;
    }

    return systemType;
  } catch (exception) {
    console.log('Missing System Type', fullyQualifiedType);
    throw exception;
  }
}

export function stringComparer<TType>(
  selector: (input: TType) => string,
): (a: TType, b: TType) => number {
  return (item1, item2) => {
    const a = selector(item1);
    const b = selector(item2);
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }

    return 0;
  };
}
