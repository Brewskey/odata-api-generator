// @flow

export default class Entity<TObject: Object> {
  constructor(config: {}) {}

  select(): $Shape<TObject> {
    console.log('foo');
    return {};
  }
}
