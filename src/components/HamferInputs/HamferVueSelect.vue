<template>
  <select
    :id="id"
    :style="{ width: (width ?? 0) + 'px' }"
    :name="name"
    :disabled="disabled"
    @change="
      $emit(
        'update:model-value',
        $event.target && 'value' in $event.target ? $event.target.value : null,
      )
    "
  >
    <option hidden disabled selected value>{{ placeholder }}</option>
    <option
      v-for="item in items"
      v-bind:key="item.key"
      :value="item.key"
      :selected="item.key === modelValue"
    >
      {{ item.value }}
    </option>
  </select>
</template>

<style scoped>
select {
  min-width: 200px;
  border-radius: var(--input-border-radius);
  border: inset 1px var(--gray-color-light);
  font-family: var(--font-family);
  padding: 4px;
}
</style>

<script lang="ts">
export default {
  name: "HamferSelect",
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    items: { type: Array<{ key: string; value: string }>, required: true },
    placeholder: { type: String },
    width: { type: String },
    disabled: { type: Boolean },
    modelValue: {},
  },
  emits: ["update:model-value"],
};
</script>
