<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">سامانه میدرم</slot>
        </div>

        <div class="modal-body">
          <slot name="body">...</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <span>سامانه یکپارچه پایش منابع و محیط زیست میدکو - سامانه میدرم</span>
            <mol-button class="modal-default-button" title="تایید" @click="$emit('close')" />
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal-mask-background-color);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: var(--modal-width);
  margin: auto;
  padding: 20px 25px;
  background-color: var(--modal-background-color);
  box-shadow: 0 3px 8px 1px black;
  transition: all 0.3s ease;
  direction: rtl;
  line-height: 1.5;
  border-radius: var(--modal-border-radius);
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: var(--gray-color-light);
  font-size: var(--font-size-lower);
}

.modal-default-button {
  float: left;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<script lang="ts">
import HamferButton from "../HamferButton/HamferButton.vue";

export default {
  name: "HamferModal",
  components: {
    MolButton: HamferButton,
  },
  props: {
    show: {
      type: Boolean,
    },
  },
};
</script>
