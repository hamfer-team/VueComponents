<template>
  <div
    class="mol-toggle"
    :name="name"
    :id="id"
    :readonly="locked || disabled"
    :disabled="disabled"
    @click="locked || disabled ? null : $emit('update:modelValue', !modelValue)"
  >
    <i :class="{ 'fa fa-toggle-on': modelValue, 'fa fa-toggle-off': !modelValue }"></i>
  </div>
</template>

<style scoped>
div.mol-toggle {
  font-size: var(--toggle-size);
  padding: 0 8px;
  cursor: pointer;
}

div.mol-toggle i {
  color: var(--primary-color);
}

div.mol-toggle:not([readOnly]) i:hover {
  color: var(--primary-color-light);
  text-shadow: 0 1px 1px var(--gray-color);
}

div.mol-toggle:not([readOnly]) i:active {
  color: var(--primary-color-dark);
  text-shadow: 1px 0 1px var(--gray-color);
}

div.mol-toggle[readonly] {
  cursor: not-allowed;
}
</style>

<script lang="ts">
export default {
  name: "HamferToggle",
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    locked: { type: Boolean },
    disabled: { type: Boolean },
    modelValue: { type: Boolean },
  },
  emits: ["update:modelValue"],
};
</script>
