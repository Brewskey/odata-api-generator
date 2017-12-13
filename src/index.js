// @flow

//import type { ResolveEntity } from './types';

import Entity from './Entity';
import Queryable from './Queryable';
//import EntityConfig from './util/EntityConfig';

type NavType = {
  id: number,
  name: string,
};

type BaseTest = {
  id: number,
  nav: NavType,
};

const navItem: NavType = {
  id: 123,
  name: 'dfasd',
};

const testItem = {
  id: 1234,
  nav: navItem,
};

class NavTypeEntity extends Entity<NavType> {
  constructor() {
    super({});
  }

  recursive = new NavTypeEntity();
}
class BaseTestEntity extends Entity<BaseTest> {
  constructor() {
    super({});
  }

  nav = new NavTypeEntity();
}

class API {
  constructor(config: {}) {}

  navTypes = new Queryable({ endpoint: 'navTypes' });
}
