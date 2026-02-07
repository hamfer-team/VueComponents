export type ValueType = string | number | bigint | boolean;

export type ObjectType = object | null;

export type PrimitiveType = string | number | bigint | boolean | object | null;

export type SecondaryType = string | number | bigint | boolean | object | null | symbol;

export type AllType = string | number | bigint | boolean | object | null | symbol | FunctionType;

export type AnyType =
  | string
  | number
  | bigint
  | boolean
  | object
  | null
  | symbol
  | FunctionType
  | undefined;

export type FunctionType = (...args: AnyType[]) => AnyType;

export type FunctionEmptyType = () => void;
