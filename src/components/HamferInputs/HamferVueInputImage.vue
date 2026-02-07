<template>
  <div class="file-input-container">
    <input
      type="file"
      :id="id"
      :name="name"
      :accept="acceptTypes ?? 'image/*'"
      :style="{ width: (width ?? 0) + 'px', visibility: locked || disabled ? 'hidden' : 'visible' }"
      :readonly="locked || disabled"
      :disabled="disabled"
      @change="(e: any) => onFileChange(e)"
      @input="$emit('update:modelValue', $event.target!.files[0])"
    />
    <img
      :src="url ?? placeholder ?? '#'"
      alt="یک تصویر انتخاب کنید ..."
      :readonly="locked || disabled"
      :style="{
        width: (width ?? 0) + 'px',
        height: (width ?? 0) + 'px',
        marginTop: locked || disabled ? `-12px` : 0,
      }"
    />
  </div>
</template>

<style scoped>
div.file-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
div.file-input-container input {
  font-family: var(--font-family);
  border-radius: var(--input-border-radius);
  border: inset 1px var(--gray-color-light);
  font-family: var(--font-family);
  padding: 8px;
  background-color: white;
}
div.file-input-container input[readonly] {
  cursor: not-allowed;
}

div.file-input-container img {
  width: 91.5%;
  max-width: 220px;
  margin: -1px 0 0px 0;
  padding: 8px;
  border: 1px solid var(--gray-color);
  border-radius: 4px;
  background-color: var(--gray-color-lightest);
  object-fit: scale-down;
}
div.file-input-container img[readonly] {
  cursor: not-allowed;
}
</style>

<script lang="ts">
import type { InputFileEventType } from "../../core/UiEventTypes.ts";

export default {
  name: "HamferInputImage",
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
  data() {
    return {
      url: null as string | null,
    };
  },
  methods: {
    onFileChange(e: InputFileEventType) {
      const file = e.target.files[0];
      this.url = file ? URL.createObjectURL(file) : "#";
    },
  },
};
</script>
