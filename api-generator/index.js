// @flow

import path from 'path';
import fs from 'fs';
import xml2js from 'xml2js';

import Schema from './schema/Schema';
import { formatNamespace } from './schema/util';

import type { Availability } from 'odata_keg_repository_models_beverages';

const b: Availability = { name: 'as', id: 123, description: 'asdf' };

(async () => {
  const parser = new xml2js.Parser();
  const result = await new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../brewskey.xml'), (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      parser.parseString(data, function(err, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  });

  const dataServices = result['edmx:Edmx']['edmx:DataServices'];
  const schemas = (dataServices[0].Schema || []).map(item => new Schema(item));

  schemas.map(schema => {
    const flowDefinition = '// @flow\n\n' + schema.generateFlowType();
    fs.writeFileSync(
      path.join(
        __dirname,
        '../flow-typed/odata',
        `${formatNamespace(schema.namespace)}.js.flow`,
      ),
      flowDefinition,
    );
  });

  // let flowDefinition =
  //   '// @flow\n\n' +
  //   schemas.reduce(
  //     (current, schema) => current + schema.generateFlowType() + '\n',
  //     '',
  //   );
  // fs.writeFileSync(
  //   path.join(__dirname, '../flow-typed/odata', `index.js.flow`),
  //   flowDefinition,
  // );
})();
