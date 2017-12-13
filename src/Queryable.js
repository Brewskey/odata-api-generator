// @flow

import Filter from './Filter';
import EntityKeyResolver from './util/buildEntityKeyResolver';

type QueryableConfig = {
  endpoint: string,
};

class Queryable<TEntity: Object> {
  constructor(config: QueryableConfig) {}

  count() {
    // execute
    // TODO: The same stuff we do in `select`
  }

  select<TSelection>(): Array<TEntity> {
    // TODO: build $expand/$select
    // TODO: check cache to see if the query exists
    // TODO: Fetch items
    // TODO: Check if existing item has all fields, if not fetch extra fields
    return [];
  }

  where = new Filter(this);
}

export default Queryable;
