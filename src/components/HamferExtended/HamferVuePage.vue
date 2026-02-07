<template>
  <div class="page">
    <div class="page-title">
      <h2>
        <i :class="config.icon" v-if="config.icon"></i>
        <span>{{ config.title }}</span>
      </h2>
      <i v-if="config.parent" class="fa fa-angle-right back-icon" @click="goUp"> </i>
    </div>
    <div class="page-content">
      <slot>
        <b>⚠ 🏗 👷‍♂️👷 توجه فرمایید:</b>
        <br /><br />
        🚧🚧 در حال حاضر محتوای این صفحه در حال توسعه است! 🚧🚧
      </slot>
    </div>
  </div>
</template>

<style scoped>
div.page {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}
div.page .page-title {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px var(--gray-color-light);
  width: 95%;
  margin-bottom: 20px;
  height: var(--page-title-height);
}
div.page .page-title h2 {
  color: var(--primary-color);
}
div.page .page-title h2 i {
  margin: 0 10px 0 10px;
}
div.page .page-title .back-icon {
  cursor: pointer;
  font-size: var(--page-title-font-size);
  color: var(--primary-color-light);
}
div.page .page-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  width: 95%;
  overflow-y: auto;
  height: calc(94vh - var(--page-title-height) - 44px);
}
</style>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";

export default {
  name: "HamferPage",
  props: {
    title: { type: String },
    icon: { type: String },
  },
  setup: (props) => {
    const route = useRoute();
    const router = useRouter();

    const config = {
      title: props.title || "" + route.meta.title,
      icon: props.icon,
      parent: route.meta.parentPath,
    };

    const goUp = () => {
      router.push(config.parent!);
    };

    return {
      config,
      goUp,
    };
  },
};
</script>
