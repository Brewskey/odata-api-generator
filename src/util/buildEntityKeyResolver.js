// @flow

import nullthrows from 'nullthrows';

// TODO: This flow type isn't correct. I couldn't find a way to do the
// recursive types
export type EntityKeyResolver<TBasicProps: Object> = {
  _keys: Array<string>,
  //[key: $Keys<TBasicProps>]: EntityKeyResolver<TBasicProps>,
  getCombinedKeys: () => Array<string>,
};
//
// const buildEntityKeyResolver = function<
//   TStandardPropType: string,
//   TNavigationPropType: string,
//   TNavigationCollectionPropType: string,
// >(
//   basicProperties: TBasicProps,
//   navigationProps: TNavigationProps,
// ): EntityKeyResolver<TBasicProps, TNavigationProps> {
//   const output = {
//     _keys: [],
//     getCombinedKeys: () => {
//       const keys = output._keys;
//       output._keys = [];
//       return keys;
//     },
//   };
//
//   Object.keys(entity).map(key => {
//     if (definitions.has(key)) {
//       Object.defineProperty(output, key, {
//         get: function() {
//           const resolver: EntityKeyResolver<
//             $ElementType<TEntity, $Keys<TEntity>>,
//           > = nullthrows(definitions.get(key));
//
//           resolver._keys = [...output._keys, key];
//           output._keys = [];
//
//           return resolver;
//         },
//       });
//     } else {
//       Object.defineProperty(output, key, {
//         get: function() {
//           const keys = output._keys;
//           output._keys = [...keys, key];
//           return output;
//         },
//       });
//     }
//   });
//
//   return output;
// };

const buildEntityKeyResolver = <T: Object>(t: Object) => {};

export default buildEntityKeyResolver;
