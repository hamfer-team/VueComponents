<template>
  <div class="gauge">
    <div class="title" @click="onclick">
      <i :class="icon" v-if="icon"></i>
      {{ title }}:
    </div>
    <div class="value">
      {{ value }}
    </div>
  </div>
</template>

<style scoped>
.gauge {
  box-shadow: 1px 1px 5px var(--gray-color);
  background-color: var(--gray-color-lightest);
  border-radius: var(--gauge-border-radius);
  padding: 12px;
  width: var(--gauge-width);
  margin: 4px;
}
.gauge .title {
  border-bottom: solid 1px var(--gray-color-lighter);
  padding: 4px 4px 8px 4px;
  cursor: pointer;
}
.gauge .title i {
  margin-left: 4px;
}

.gauge .value {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--gauge-value-font-size);
  color: var(--primary-color-light);
  padding: 24px 24px 12px 24px;
}
</style>

<script lang="ts">
export default {
  name: "HamferGauge",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    value: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
    },
  },
  setup(props) {
    const onclick = () => {
      if (props.onClick) {
        props.onClick();
      }
    };
    return { onclick };
  },
};
</script>
