<template>
  <div
    class="button"
    :class="btnClass"
    :style="{ width: width }"
    :title="title"
    :data-tooltip="tooltip"
    data-tooltip-info
  >
    <slot>{{ title }}</slot>
  </div>
</template>

<style lang="css" scoped>
div.button {
  display: inline-block;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: var(--button-border-radius);
  padding: 8px 24px;
  color: var(--gray-color-lightest);
  text-align: center;
}
div.button:hover {
  background-color: var(--primary-color-light);
  box-shadow: 1px 0 1px var(--gray-color);
}
div.button:active {
  background-color: var(--primary-color-dark);
  box-shadow: 0px 1px 1px var(--gray-color);
}

div.button.gray {
  background-color: var(--gray-color);
}
div.button.gray:hover {
  background-color: var(--gray-color-light);
}
div.button.gray:active {
  background-color: var(--gray-color-dark);
}
</style>

<script lang="ts">
export default {
  name: "HamferButton",
  props: {
    title: {
      type: String,
      default: "Hamfer Button",
      required: true,
    },
    tooltip: {
      type: String,
      default: null,
    },
    btnClass: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: "200px",
    },
  },
};
</script>
