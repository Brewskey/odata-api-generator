// @flow

import type Queryable from './Queryable';

import nullthrows from 'nullthrows';

type FilterStack<TEntity> = Array<string | Filter<TEntity>>;

type FilterOperation =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'ge'
  | 'lt'
  | 'le'
  | 'and'
  | 'or'
  | 'not'
  | 'has';

type ArithmeticOperators = 'add' | 'sub' | '-' | 'mul' | 'div' | 'mod';

type StringFunctions =
  | 'concat'
  | 'contains'
  | 'endswith'
  | 'indexof'
  | 'length'
  | 'startswith'
  | 'substring'
  | 'tolower'
  | 'toupper'
  | 'trim';

type DateTimeFunctions =
  | 'date'
  | 'day'
  | 'fractionalseconds'
  | 'hour'
  | 'maxdatetime'
  | 'mindatetime'
  | 'minute'
  | 'month'
  | 'now'
  | 'second'
  | 'time'
  | 'totaloffsetminutes'
  | 'totalseconds'
  | 'year';

type ArithmeticFunctions = 'ceiling' | 'floor' | 'round';

type TypeFunctions = 'cast' | 'isof';

type GeoFunctions = 'geo.distance' | 'geo.intersects' | 'geo.length';

type LambdaOperators = 'any' | 'all';

class Filter<TEntity: Object> {
  _queryable: Queryable<TEntity>;
  _parent: ?Filter<TEntity>;
  _filterStack: FilterStack<TEntity>;

  constructor(queryable: Queryable<TEntity>, parent?: Filter<TEntity>) {
    this._queryable = queryable;
    this._parent = parent;
  }

  get beginExpression(): Filter<TEntity> {
    return new Filter(this._queryable, this);
  }

  get endExpression(): Filter<TEntity> {
    return nullthrows(this._parent);
  }

  get and(): Filter<TEntity> {
    this._filterStack.push('and');
    return this;
  }

  get or(): Filter<TEntity> {
    this._filterStack.push('or');
    return this;
  }

  equals<Key: $Keys<TEntity>>(
    value: $ElementType<TEntity, Key>,
  ): Filter<TEntity> {
    this._buildODataFilter(value, 'eq');
    return this;
  }

  _buildODataFilter<Key: $Keys<TEntity>>(
    value: $ElementType<TEntity, Key>,
    operation: FilterOperation,
  ): void {
    // const key = selector(this._resolver)
    //   .getCombinedKeys()
    //   .join('/');
  }
}

export default Filter;
