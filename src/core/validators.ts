import type { HamferFormModelItem } from "./HamferFromModelItem.ts";
import { tools } from "./tools.ts";
import type { PrimitiveType } from "./Types.ts";

export type ValueExtractorType = (arg: PrimitiveType | undefined) => PrimitiveType | undefined;

export const validatorRegexes = {
  digitOnlyRegex: /^[0-9]+$/,
  numberRegex: /^[-+]?([0-9]+\.)?[0-9]+$/,
  dateOnlyRegex:
    /^(?<year>\d{1,4})[\\/-](?<month>0?[1-9]|1[012])[\\/-](?<day>0?[1-9]|[12][0-9]|3[01])$/,
  nationalCodeRegex: /^\d\d[1-9]\d{5}[1-9]\d$/,
  nationalIdRegex: /^[0-9]{11}$/,
  mobileNoRegex: /^(0|\+98)9\d{9}$/,
  phoneNumberRegex: /^(0|\+98)\d{10}$/,
};

export const validators = {
  /** Check if a string contains only digits 0-9 */
  forDigitOnly: (value: PrimitiveType | undefined): boolean =>
    typeof value === "string" ? validatorRegexes.digitOnlyRegex.test(value) : false,

  /** Check if a string is a number */
  forNumber: (value: PrimitiveType | undefined): boolean =>
    typeof value === "string" ? validatorRegexes.numberRegex.test(value) : false,

  /** Check if a string of date is a vlid date-only */
  forDateOnly: (value: PrimitiveType | undefined): boolean =>
    typeof value === "string" ? validatorRegexes.dateOnlyRegex.test(value) : false,

  /** Check if a string of national-code is a valid national-code */
  forNationalCode: (value: PrimitiveType | undefined): boolean => {
    if (typeof value !== "string") return false;
    if (!validatorRegexes.nationalCodeRegex.test(value)) return false;
    if (
      [
        "222222222",
        "333333333",
        "444444444",
        "555555555",
        "666666666",
        "777777777",
        "888888888",
        "999999999",
      ].indexOf(value ?? "") > 0
    )
      return false;
    let s = 0;
    for (let i = 0; i < 9; i++) {
      const a = Number(value.substring(i, i + 1));
      s += (10 - i) * a;
    }
    const n = s % 11;
    return Number(value.substring(9, 10)) == (n >= 2 ? 11 - n : n);
  },

  /** Check if a national-id is valid */
  forNationalId: (value: PrimitiveType | undefined): boolean =>
    typeof value === "string" ? validatorRegexes.nationalIdRegex.test(value) : false,

  /** Check if a mobile number is an iranian mobile number */
  forMobileNo: (value: PrimitiveType | undefined): boolean =>
    typeof value === "string" ? validatorRegexes.mobileNoRegex.test(value) : false,

  /** Check if a phone number is an iranian phone number */
  forPhoneNumber: (value: PrimitiveType | undefined): boolean =>
    typeof value === "string" ? validatorRegexes.phoneNumberRegex.test(value) : false,
};

export const LetsVerify = {
  /**
   * Apply verifications ON a Hamfer-Form-Model object
   *
   * @param hamferFormModel The form-model that contains needed info for verification or validation
   * @param valueExtractor A function that should be used for extracting proper value before verification
   * @returns A result object with `verified` and `message`  that defines result of verification.
   */
  On: (
    hamferFormModel: Record<string, HamferFormModelItem>,
    valueExtractor: ValueExtractorType | undefined = undefined,
  ): { message: string; verified: boolean } | null | undefined => {
    if (!hamferFormModel) return hamferFormModel;

    let verified: boolean = true;
    let message: string | undefined = undefined;
    const formModel = hamferFormModel;
    Object.keys(formModel).forEach((prop: string) => {
      if (verified) {
        const model = formModel[prop];
        const modelValue = valueExtractor ? valueExtractor(model?.value) : model?.value;
        const valueIsEmpty = tools.isEmpty(modelValue);

        if (model?.required && valueIsEmpty) {
          message = `اطلاعات ${model.title} نمی‌تواند خالی باشد.`;
          verified = false;
        }
        if (verified && model?.validator && !valueIsEmpty && modelValue && !model.validator(modelValue)) {
          message = `اطلاعات ${model.title} به درستی وارد نشده است.`;
          verified = false;
        }
      }
    });
    return {
      message: message ?? "",
      verified,
    };
  },
};
