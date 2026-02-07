import { ref, type Ref } from "vue";
import { HamferFormModelItem } from "./HamferFromModelItem.ts";
import type { PrimitiveType } from "./Types.ts";

export type ValidatorType = (value: PrimitiveType | undefined) => boolean;

export class HamferVueFormModelItem extends HamferFormModelItem {
  /** The vue/ref object that will contains value of this item or property */
  value: Ref;

  /**
   * Create a new `HamferVueFormModelItem` instance
   *
   * @param title The title of item or property
   * @param ref The vue/ref object that will contains value of this item or property
   * @param required Is this item is required to have a defined value?
   * @param validator The validator function that validates the value.
   */
  constructor(
    title: string,
    refObj: Ref | undefined,
    required: boolean | undefined = undefined,
    validator: ValidatorType | undefined = undefined,
  ) {
    super(title, refObj ?? ref<string>(), required, validator);
    this.value = refObj ?? ref<string>();
  }

  /**
   * Create a new instance of `HamferVueFormModelItem` by using an input object
   *
   * @param arg An input object to ease creating
   * @param arg.title The title of item or property
   * @param arg.ref The vue/ref object that will contains value of this item or property
   * @param arg.required Is this item is required to have a defined value?
   * @param arg.validator The validator function that validates the value.
   * @returns
   */
  public static Create = (arg: {
    title: string;
    ref?: Ref;
    required?: boolean;
    validator?: ValidatorType;
  }): HamferVueFormModelItem => {
    const item = new HamferVueFormModelItem(arg.title, arg.ref, arg.required, arg.validator);
    return item;
  };

  /**
   * Create a new instance of `HamferVueFormModelItem` by using an input object that it's already `required=true`.
   *
   * @param arg An input object to ease creating
   * @param arg.title The title of item or property
   * @param arg.ref The vue/ref object that will contains value of this item or property
   * @param arg.validator The validator function that validates the value.
   * @returns
   */
  public static CreateRequired = (arg: {
    title: string;
    ref?: Ref;
    validator?: ValidatorType;
  }): HamferVueFormModelItem => {
    const item = new HamferVueFormModelItem(arg.title, arg.ref, true, arg.validator);
    return item;
  };
}

export type HamferVueFormModel = Record<string, HamferVueFormModelItem>;

export const hamferVueFormModelHelper = {
  /**
   * Get real value of an item from form-model
   *
   * @param formModelItem The item of form-model
   * @returns The real value of the item
   */
  getValue: <T>(formModelItem: HamferVueFormModelItem | undefined): T => {
    return formModelItem?.value.value;
  },

  /**
   * Set correctly value of an item from form-model
   *
   * @param formModelItem The item of form-model
   * @param value The desired value to set on the item
   */
  setValue: (
    formModelItem: HamferVueFormModelItem | undefined,
    value: PrimitiveType | undefined,
  ): HamferVueFormModelItem | undefined => {
    if (formModelItem) {
      formModelItem.value.value = value;
    }
    return formModelItem;
  },
};
