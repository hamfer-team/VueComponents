<template>
  <Teleport to="body">
    <hamfer-modal :show="show">
      <template #header>
        <h3 id="ModalHeader">{{ objectModel.header }}</h3>
      </template>
      <template #body>
        <p id="ModalBody">{{ objectModel.message }}</p>
      </template>
      <template #footer>
        <span>سامانه یکپارچه پایش منابع و محیط زیست میدکو - سامانه میدرم</span>
        <div class="modal-buttons">
          <hamfer-button
            v-for="btn in objectModel.buttons"
            v-bind:key="btn.title"
            class="modal-button"
            :class="btn.class"
            :title="btn.title"
            @click="btn.action"
          />
        </div>
      </template>
    </hamfer-modal>
  </Teleport>
</template>

<style scoped>
h3#ModalHeader {
  color: var(--primary-color);
}
p#ModalBody {
  color: var(--gray-color-dark);
  margin-right: 16px;
}
.modal-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.modal-buttons .modal-button {
  margin-right: 8px;
}
.modal-buttons .modal-button.button-danger {
  background-color: var(--secondary-color-dark);
}
.modal-buttons .modal-button.button-gray {
  background-color: var(--gray-color);
}
</style>

<script lang="ts">
import { HamferModalModel } from "./HamferVueModal.ts";
import HamferButton from "../HamferButton/HamferButton.vue";
import HamferModal from "./HamferVueModal.vue";

export default {
  name: "HamferModalSpecific",
  props: {
    objectModel: {
      type: HamferModalModel,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    HamferModal: HamferModal,
    HamferButton: HamferButton,
  },
};
</script>
