import { isProxy, ref, toRaw, type Ref } from "vue";
import { LetsVerify } from "./validators.ts";
import type { HamferVueFormModelItem } from "./HamferVueFormModelItem.ts";
import type { PrimitiveType } from "./Types.ts";

export const vueTools = {
  /**
   * Extract value or raw-value of a vue-ref object
   *
   * @param ref The vue-ref object that contains a value
   * @returns The raw-value of vue-ref object.
   */
  extractRefValue: (ref: PrimitiveType | undefined): PrimitiveType | undefined => {
    const _ref = ref as Ref;
    if (!_ref) return ref;
    return isProxy(_ref.value) ? toRaw(_ref.value)._rawValue : _ref.value;
  },
};

export const LetsVerifyVue = {
  /**
   * Apply verifications ON a Hamfer-Vue-Form-Model object
   *
   * @param hamferFormModel The form-model that contains needed info for verification or validation
   * @returns A result object with `verified` and `message`  that defines result of verification.
   */
  On: (
    hamferFormModel: Record<string, HamferVueFormModelItem>,
  ): { message: string; verified: boolean } | null | undefined => {
    return LetsVerify.On(hamferFormModel, vueTools.extractRefValue);
  },
};