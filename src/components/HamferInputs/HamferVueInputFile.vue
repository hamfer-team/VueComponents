<template>
  <div class="file-input-container">
    <input
      type="file"
      :id="id"
      :name="name"
      :accept="acceptTypes"
      :style="{ width: (width ?? 0) + 'px' }"
      :readonly="locked || disabled"
      :disabled="disabled"
      @change="fileChanged"
      @input="$emit('update:modelValue', ($event.target as EventTargetFiles).files[0])"
    />
  </div>
</template>

<style scoped>
input {
  font-family: var(--font-family);
  border-radius: var(--input-border-radius);
  border: inset 1px var(--gray-color-light);
  font-family: var(--font-family);
  padding: 8px;
}

input[readonly] {
  cursor: not-allowed;
}
</style>

<script lang="ts">
import type { EventTargetFiles } from '../../core/UiEventTypes';

export default {
  name: "HamferInputFile",
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    acceptTypes: { type: String },
    placeholder: { type: String },
    width: { type: String },
    locked: { type: Boolean },
    disabled: { type: Boolean },
    modelValue: {},
  },
  emits: ["update:modelValue"],
  setup() {
    const fileChanged = (e: Event) => {
      console.log(e.target);
    };

    return {
      fileChanged,
    };
  },
};
</script>
