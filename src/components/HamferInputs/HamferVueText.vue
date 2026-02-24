<template>
  <div :id="id + 'InputContainer'" :style="{ width: (width ?? 0) + 'px' }" class="input-container">
    <input
      :id="id"
      :name="name"
      :type="type === 'money' || type === 'date' || type === 'number' ? 'text' : type"
      :class="inputClass"
      :style="{
        direction: type === 'money' || type === 'date' || type === 'number' ? 'ltr' : undefined,
      }"
      :placeholder="placeholder"
      :readonly="locked || disabled"
      :disabled="disabled"
      :value="valueModifier(modelValue)"
      @input="
        (e: Event) => {
          if (e.target && 'value' in e.target) {
            $emit('update:modelValue', valueUnmodifier(e.target.value));
          }
        }
      "
      @keydown="(e: Event) => keyDownHandler(e as KeyDownEventType)"
      @keyup="(e: Event) => keyUpHandler(e as KeyUpEventType)"
      :key="key2rerender"
      :maxlength="maxLength ?? (type === 'date' ? '10' : type === 'money' ? '23' : '40')"
    />
    <div v-if="postfix" :id="id + 'InputPostfix'" class="input-postfix">
      {{ postfix }}
    </div>
  </div>
</template>

<style scoped>
div.input-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
}

input {
  font-family: var(--font-family);
  border-radius: 4px;
  border: inset 1px var(--gray-color-light);
  padding: 5px 4px 4px 6px;
  width: calc(100% - 10px);
}
input:focus {
  outline: none;
}
input::-webkit-input-placeholder {
  color: var(--gray-color-light);
}
input::-moz-placeholder {
  color: var(--gray-color-light);
  opacity: 1;
}
input::placeholder {
  color: var(--gray-color-light);
}
input[readonly] {
  cursor: not-allowed;
}

input.text-center {
  text-align: center;
}
input.dir-ltr {
  direction: ltr;
}
input.danger {
  color: var(--secondary-color);
}

div.input-postfix {
  border: inset 1px var(--gray-color-light);
  background-color: var(--gray-color-lightest);
  border-top-left-radius: var(--input-border-radius);
  border-bottom-left-radius: var(--input-border-radius);
  font-size: var(--font-size-lower);
  padding: 5px 4px 4px 5px;
  margin-right: -3px;
  cursor: default;
}
</style>

<script lang="ts">
import { ref } from "vue";
import type { KeyDownEventType, KeyUpEventType } from "../../core/UiEventTypes.ts";

export default {
  name: "HamferText",
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true, validator: (arg: string) =>["text", "number", "date", "money", "password"].includes(arg) },
    inputClass: { type: String },
    placeholder: { type: String },
    maxLength: { type: String },
    postfix: { type: String },
    width: { type: String },
    locked: { type: Boolean },
    disabled: { type: Boolean },
    modelValue: {},
  },
  emits: ["update:modelValue"],
  setup(props) {
    const key2rerender = ref<number>(0);
    const digitKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const digitPersianKeys = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const movingKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    const editKeys = ["Backspace", "Delete"];
    const generalKeys = ["Ctrl", "Shift", "Alt", "Enter", "Tab", "Esc"];

    const moneyTypeValidKeys = [
      ...digitKeys,
      ...movingKeys,
      ...editKeys,
      ...generalKeys,
      ...digitPersianKeys,
    ];
    const numberTypeValidKeys = [...moneyTypeValidKeys, ".", "-"];
    const dateTypeValidKeys = [...moneyTypeValidKeys, "/"];
    const keyDownHandler = (e: KeyDownEventType) => {
      if (e.isTrusted) {
        if (e.ctrlKey && (e.key === "c" || e.key === "v")) {
          return true;
        }

        if (props.type === "number" && numberTypeValidKeys.indexOf(e.key) < 0) {
          e.preventDefault();
        } else if (props.type === "money" && moneyTypeValidKeys.indexOf(e.key) < 0) {
          e.preventDefault();
        } else if (props.type === "date" && dateTypeValidKeys.indexOf(e.key) < 0) {
          e.preventDefault();
        }
      }
      return false;
    };

    const keyUpHandler = (e: KeyUpEventType) => {
      if (e.isTrusted && e.ctrlKey && e.key === "v") {
        key2rerender.value++;
      }
    };

    const valueModifier = (value: unknown) => {
      // Make presentive value to a value with thousand separators
      if (props.type === "money" && (typeof value === "string" || typeof value === "number")) {
        const result = ("" + value)
          .replace(/\D/g, "")
          .split("")
          .reverse()
          .join("")
          .replace(/(\d{3}(?!.*\.|$))/g, "$1,")
          .split("")
          .reverse()
          .join("");
        return result;
      }

      // Make presentive value to a date type with '/' like dates
      if (props.type === "date" && typeof value === "string") {
        let result = value?.replace(/\D/g, "");
        if (result) {
          const match = /^(?<year>\d{1,4})[\/-]?(?<month>\d{0,2})?[\/-]?(?<day>\d{0,2})?$/.exec(
            result,
          );
          const year = match?.groups?.year;
          const month = match?.groups?.month;
          const day = match?.groups?.day;
          result = "" + year + (month ? "/" + month : "") + (day ? "/" + day : "");
        }
        return result;
      }
      return value;
    };

    const valueUnmodifier = (value: unknown) => {
      // Change persian digits to english digits
      if (
        (props.type === "number" || props.type === "money" || props.type === "date") &&
        typeof value === "string"
      ) {
        value = value
          ? value.replace(
              new RegExp(`[${digitPersianKeys.join("")}]`, "g"),
              (d) => `${digitPersianKeys.indexOf(d)}`,
            )
          : value;
      }

      // remove unwanted characters in money type
      if (props.type === "money" && typeof value === "string") {
        return value?.replace(/\D/g, "");
      }

      return value;
    };

    return {
      keyDownHandler,
      keyUpHandler,
      valueModifier,
      valueUnmodifier,
      key2rerender,
    };
  },
};
</script>
