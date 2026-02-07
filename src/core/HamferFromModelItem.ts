import type { PrimitiveType } from "./Types.ts";

export class HamferFormModelItem {
  /** The title of item or property */
  title: string;

  /** The value of item or property */
  value: PrimitiveType;

  /** Is this item is required to have a defined value? */
  required?: boolean = false;

  /** The validator function that validates the value. */
  validator?: ((arg: PrimitiveType) => boolean) | undefined = undefined;

  /**
   * Create a new `HamferFormModelItem` instance
   *
   * @param title The title of item or property
   * @param value The value of item or property
   * @param required Is this item is required to have a defined value?
   * @param validator The validator function that validates the value.
   */
  constructor(
    title: string,
    value: PrimitiveType,
    required: boolean | undefined = undefined,
    validator: ((arg: PrimitiveType) => boolean) | undefined = undefined,
  ) {
    this.title = title;
    this.value = value;
    this.required = required ?? false;
    this.validator = validator;
  }
}

export type HamferFormModel = Record<string, HamferFormModelItem>;
