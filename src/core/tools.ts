import type { SecondaryType } from "./Types.ts";

export const tools = {
  /**
   * Check if a value means to be *EMPTY*.
   *
   * @param value An anonymous value ;).
   * @param withTrim Apply triming all space characters over `String` type values
   * @returns If `value` means to be *EMPTY* result is `true`.
   */
  isEmpty: (value: unknown, withTrim: boolean = false): boolean => {
    if (!value) {
      return true;
    }
    if (typeof value === "string" || value instanceof String) {
      return withTrim ? value.replace(/\s+/g, "") === "" : value === "";
    }
    if (typeof value === "number" || value instanceof Number) {
      return Number.isNaN(value);
    }
    return Object.keys(value).length === 0;
  },

  /**
   * Set a default value to an value when it means to be *EMPTY*.
   *
   * @param value An anonymous value or string
   * @param defaultValue The value or string to be used when `value` means to be *EMPTY*.
   * @returns The not empty `value`
   */
  emptyTo: (value: unknown, defaultValue: SecondaryType): SecondaryType =>
    tools.isEmpty(value) ? defaultValue : value!,

  /**
   * Check if type of a value is *ValueType* (`string`, `number`, `bigint`, `boolean`) or not.
   *
   * @param value An anonymous value
   * @returns Is type of value si *ValueType*?
   */
  isValueType: (value: unknown): boolean =>
    ["string", "number", "bigint", "boolean"].indexOf(typeof value) >= 0,

  /**
   * Check if type of a value is *PrimitiveType* (`string`, `number`, `bigint`, `boolean`, `object`, `null`) or not.
   *
   * @param value An anonymous value
   * @returns Is type of value is *PrimitiveType*?
   */
  isPrimitiveType: (value: unknown): boolean =>
    ["string", "number", "bigint", "boolean", "object", "null"].indexOf(typeof value) >= 0,
};
