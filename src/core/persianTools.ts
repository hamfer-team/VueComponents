import { validatorRegexes, validators } from "./validators.ts";

const numberDescriberValues: Record<string, string> = {
  "0": "صفر",
  "1": "یک",
  "2": "دو",
  "3": "سه",
  "4": "چهار",
  "5": "پنج",
  "6": "شش",
  "7": "هفت",
  "8": "هشت",
  "9": "نه",
  "10": "ده",
  "11": "یازده",
  "12": "دوازده",
  "13": "سیزده",
  "14": "چهارده",
  "15": "پانزده",
  "16": "شانزده",
  "17": "هفده",
  "18": "هجده",
  "19": "نوزده",
  "20": "بیست",
  "30": "سی",
  "40": "چهل",
  "50": "پنجاه",
  "60": "شصت",
  "70": "هفتاد",
  "80": "هشتاد",
  "90": "نود",
  "100": "صد",
  "200": "دویست",
  "300": "سیصد",
  "400": "چهارصد",
  "500": "پانصد",
  "600": "ششصد",
  "700": "هفتصد",
  "800": "هشتصد",
  "900": "نهصد",
  "1000": "هزار",
  "1000000": "میلیون",
  "1000000000": "میلیارد",
};

const monthDescriberValues: Record<string, string> = {
  "1": "فروردین",
  "2": "اردیبهشت",
  "3": "خرداد",
  "4": "تیر",
  "5": "مرداد",
  "6": "شهریور",
  "7": "مهر",
  "8": "آبان",
  "9": "آذر",
  "10": "دی",
  "11": "بهمن",
  "12": "اسفند",
};

export const persianTools = {
  /**
   * Convert persian-numbers to english-numbers
   *
   * @param value The input value as `string`
   * @returns Changed persian-numbers to english-numbers in `value` as result
   */
  convertPersianNumbers2english: (value: string | null | undefined): string | null | undefined =>
    value ? value.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d) => `${"۰۱۲۳۴۵۶۷۸۹".indexOf(d)}`) : value,

  /**
   * Descripe a value-number
   *
   * @param value The value-number
   * @returns Described value-number
   */
  describeNumber2persian: (
    value: string | number | null | undefined,
  ): string | null | undefined => {
    if (value === undefined || value === null) return value;
    if (typeof value === "string" && validators.forNumber(value) === false) {
      throw new Error(`مقدار ورودی(${value}) معتبر نمی‌باشد.`);
    }

    const describe = (partValue: number): string | undefined => {
      if (partValue === 0) return numberDescriberValues["0"];

      let prefix = "";
      if (partValue < 0) {
        prefix = "منفی ";
        partValue = -partValue;
      }

      const partDescriber = (value: number, limit: number) => {
        const partOne = describe(Math.floor(value / limit));
        const net = value % limit;
        const partTwo = net > 0 ? " و " + describe(net) : "";
        return `${partOne} ${numberDescriberValues["" + limit]}${partTwo}`;
      };

      const finalPartDescriber = (value: number) => {
        value = Math.floor(value % 1000);
        const sadgan = Math.floor(value / 100) * 100;
        let sadganPart = sadgan !== 0 ? numberDescriberValues["" + sadgan] : "";

        value = value - sadgan;
        if (sadgan > 0 && value > 0) sadganPart = sadganPart + " و ";

        let finalPart: string | undefined = "";
        if (value > 0 && value < 20) {
          finalPart = numberDescriberValues["" + value];
        } else if (value > 0) {
          const dahgan = Math.floor(value / 10) * 10;
          value = value - dahgan;
          finalPart =
            numberDescriberValues["" + dahgan] +
            (value > 0 ? ` و ${numberDescriberValues["" + value]}` : "");
        }

        if (value % 1 > 0) finalPart = finalPart + " ممیز  خورده‌ای"; // TODO

        return `${sadganPart}${finalPart}`;
      };

      const milyard = 1000000000;
      if (partValue >= milyard) return prefix + partDescriber(partValue, milyard);

      const milyun = 1000000;
      if (partValue >= milyun) return prefix + partDescriber(partValue, milyun);

      const hezar = 1000;
      if (partValue >= hezar) return prefix + partDescriber(partValue, hezar);

      return prefix + finalPartDescriber(partValue);
    };

    const num = typeof value === "string" ? Number(value) : value;
    return describe(num);
  },

  /**
   * Describe a value-Date
   *
   * @param value The value-Date as `string`
   * @param type The formatting type that uses a single `Y` for descibed year, `M` for month, `D` for day and `y` for *سال*, `m` for *ماه* & `d` for *روز*
   * @returns Described value-Date
   */
  describeDate2persian: (
    value: string | Date | null | undefined,
    type: string = "D M m Y",
  ): string | null | undefined => {
    if (!value) return value;
    if (typeof value !== "string") {
      value = `${value.getFullYear()}/${value.getMonth()}/${value.getDay()}`;
    }

    const match = validatorRegexes.dateOnlyRegex.exec(value);
    if (!match) {
      throw new Error("مقدار ورودی معتبر نمی‌باشد.");
    }

    const year = match.groups ? match.groups["year"] : "";
    const month = match.groups ? match.groups["month"] : "";
    const day = match.groups ? match.groups["day"] : "";
    const yearPart = persianTools.describeNumber2persian(year) ?? "";
    const monthPart = monthDescriberValues["" + Number(month)] ?? "";
    const dayPart = persianTools.describeNumber2persian(day) ?? "";

    return type
      .replace("Y", yearPart)
      .replace("M", monthPart)
      .replace("D", dayPart)
      .replace("y", "سال")
      .replace("m", "ماه")
      .replace("d", "روز");
  },

  /**
   * Add Currency at the end of a `string` value
   * @param str The `string` value
   * @param useMajor Use major currency (*تومان*) or not (*ریال*)
   * @returns The value with a currency postfix
   */
  addCurrency: (str: string, useMajor: boolean = false) => `${str} ${useMajor ? "تومان" : "ریال"}`,
};
