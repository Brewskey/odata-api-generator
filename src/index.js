// @flow

//import type { NavigationProperty } from './NavigationProperty';

//import Entity from './Entity';
//import Queryable from './Queryable';
//import EntityConfig from './util/EntityConfig';

//import { getNavigationPropertyExtractor } from './NavigationProperty';

import type { ExtractReturnType } from './types';

type FooProps = {|
  id: number,
|};

type BarProps = {|
  id: number,
  value: string,
|};

class EntityBase<TType: Object> {
  constructor(navigationProperties: { [key: $Keys<TType>]: () => Class<*> }) {
    Object.keys(navigationProperties).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          const v = navigationProperties[key]();
          return new v(this);
        },
        set(value) {
          throw 'Not implemented';
        },
      });
    });
  }
}

class Entity<TType: Object, NavigationProps: Object> extends EntityBase<TType> {
  _data: TType;

  constructor(
    defaultValues: TType,
    navigationProperties: { [key: $Keys<NavigationProps>]: () => Class<*> },
  ) {
    super(navigationProperties);

    this._data = defaultValues;
    Object.keys(defaultValues).forEach(key => {
      Object.defineProperty(this, key, {
        get: () => this.get(key),
        set: value => this.set(key, value),
      });
    });
  }

  get<TKey: $Keys<TType>>(key: TKey): $ElementType<TType, TKey> {
    return this._data[key];
  }

  set<TKey: $Keys<TType>>(key: TKey, value: $ElementType<TType, TKey>): void {
    console.log('key', key, value);
    this._data[key] = value;
  }
}

class NavigationProperty<TType: Object> extends EntityBase<TType> {
  _type: string;
  _resolver: () => Promise<TType>;

  constructor(
    type: string,
    resolver: () => Promise<TType>,
    navigationProperties: { [key: $Keys<TType>]: () => Class<*> },
  ) {
    super(navigationProperties);
    this._type = type;
    this._resolver = resolver;
  }

  select(): Promise<TType> {
    return this._resolver();
  }
}

const FooNavigationProps: { [key: $Keys<Foo>]: () => Class<*> } = {
  recursive: () => FooNavigationProperty,
};
const BarNavigationProps: { [key: $Keys<Bar>]: () => Class<*> } = {
  foo: () => FooNavigationProperty,
};

class FooNavigationProperty extends NavigationProperty<Foo> {
  constructor() {
    super('Foo', () => Promise.resolve(new Foo()), FooNavigationProps);
  }

  recursive: FooNavigationProperty;
}

class Foo extends Entity<FooProps, typeof FooNavigationProps> {
  constructor(fooProps?: FooProps) {
    super({ id: 11 }, FooNavigationProps);
  }

  id: number;
  recursive: FooNavigationProperty;
}

class Bar extends Entity<BarProps, typeof BarNavigationProps> {
  foo: FooNavigationProperty;
  id: number;
  value: string;

  constructor(props?: BarProps) {
    super({ id: 0, value: '' }, BarNavigationProps);
  }
}

(async () => {
  const bar: Bar = new Bar({ id: 10, value: 'asdf' });
  bar.value = 'asdfasdfasd';
  const foo = await bar.foo.select();
  console.log(foo);
  foo.id = 10;
  console.log(foo);
  bar.foo = new FooNavigationProperty();
})();
