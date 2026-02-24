<template>
  <div 
    class="form-input"
    :class="{ class: true }"
    :id="`${id}FormInput`"
  >
    <label 
      :for="name" 
      :id="`${id}FormInputLabel`"
    >
      {{ title }}
      <sup v-if="required">*</sup>
    </label>
    <slot></slot>
  </div>
</template>

<style scoped>
div.form-input {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  margin: 8px 0 0 8px;
  padding-right: 4px;
  direction: rtl;
}
div.form-input label {
  color: var(--primary-color);
  margin: 0 4px 4px 4px;
  font-size: var(--font-size);
}
div.form-input label sup {
  color: var(--required-input-star-color);
  margin-right: 4px;
}

div.form-input.ltr {
  direction: ltr;
}

div.form-input.white label {
  color: white;
}
</style>

<script lang="ts">
export default {
  name: "HamferFormInput",
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    class: { type: String },
    required: { type: Boolean },
  },
};
</script>
