<template>
  <span class="describer">
    {{ describer(modelValue) }}
  </span>
</template>

<style scoped>
span.describer {
  font-size: var(--font-size-lower);
  margin-right: 2px;
  color: var(--gray-color);
}
</style>

<script lang="ts">
import { persianTools } from "../../core/persianTools.ts";

export default {
  name: "HamferDescriber",
  props: {
    type: { type: String, required: true },
    placeHolder: { type: String },
    postfix: { type: String },
    modelValue: {},
  },
  setup(props) {
    const describer = (value: unknown) => {
      let result = "";
      switch (props.type) {
        case "persian-price": {
          if ((typeof value === "string" && value !== "") || typeof value === "number") {
            result = persianTools.describeNumber2persian(value) + (props.postfix ?? "");
          }
          break;
        }
        case "persian-date": {
          if (typeof value === "string") {
            result = persianTools.describeDate2persian(value) + (props.postfix ?? "");
          }
          break;
        }
        default: {
          result = "نوع انتخابی شناسایی نشد!";
          break;
        }
      }

      return result === "" ? props.placeHolder : result;
    };

    return {
      describer,
    };
  },
};
</script>
