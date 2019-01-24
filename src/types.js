// @flow

export type ExtractReturnType = <TType>() => Class<TType>;

export type ResolveEntity<TType> = () => Promise<TType>;

export type EntityTuple<TKey, TValue> = [TKey, () => Promise<TValue>];
export type NEntityTuple<TFilterKeys> =
  | []
  | [EntityTuple<TFilterKeys, *>]
  | [EntityTuple<TFilterKeys, *>, EntityTuple<TFilterKeys, *>]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ]
  | [
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
      EntityTuple<TFilterKeys, *>,
    ];
