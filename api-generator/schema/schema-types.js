// @flow

export interface ITypeGenerator {
  generateFlowType(): string;
}

export type SchemaType = {
  $: { Namespace: string },
  Action?: Array<ActionType>,
  ComplexType?: Array<ComplexTypeType>,
  EntityContainer?: Array<EntityContainerType>,
  EntityType?: Array<EntityTypeType>,
  EnumType?: Array<EnumTypeType>,
  Function?: Array<FunctionTypeType>,
};

export type EntityTypeType = {
  $: { Name: string },
  Name: string,
  NavigationProperty: Array<NavigationPropertyType>,
  Property: Array<PropertyType>,
};

export type EnumTypeType = {
  $: { Name: string },
  Member: Array<MemberType>,
};

export type ComplexTypeType = {
  $: {
    Name: string,
  },
  Property?: Array<PropertyType>,
};

export type KeyType = {
  PropertyRef: PropertyRefType,
};

export type PropertyRefType = {
  Name: string,
};

export type NavigationPropertyType = {
  $: {
    Name: string,
    Nullable?: 'false' | 'true',
    Type: string,
  },
  ReferentialConstraint?: ReferentialConstraintType,
};

export type PropertyType = {
  $: {
    Name: string,
    Nullable?: 'false' | 'true',
    Type: string,
  },
};

export type MemberType = {
  $: {
    Name: string,
    Value: number | string,
  },
};

export type ReferentialConstraintType = {
  Property: string,
  ReferencedProperty: string,
};

export type FunctionTypeType = {
  IsBound: boolean,
  Name: string,
  Parameter?: Array<ParameterType>,
  ReturnType: ReturnTypeType,
};

export type ActionType = {
  IsBound: boolean,
  Name: string,
  Parameter?: Array<ParameterType>,
  ReturnType: ReturnTypeType,
};

export type ParameterType = {
  Name: string,
  Type: string,
};

export type ReturnTypeType = {
  Type: string,
};

export type EntityContainerType = {
  ActionImport?: Array<ActionImportType>,
  EntitySet?: Array<EntitySetType>,
  EntityType: string,
  Name: string,
};

export type EntitySetType = {
  NavigationPropertyBinding?: Array<NavigationPropertyBindingType>,
};

export type NavigationPropertyBindingType = {
  Path: string,
  Target: string,
};

export type ActionImportType = {
  Name: string,
  Action: string,
};
