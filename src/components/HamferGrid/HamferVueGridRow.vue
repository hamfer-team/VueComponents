<template>
  <tr :class="rowClass">
    <td
      v-for="column in columns"
      v-bind:key="column.key"
      :class="column.class"
      @click="if (column.canShowChildRow) showChild();"
    >
      <div
        v-for="cellValue in [getValue(itemIndex, itemData, column.key, column.modifier)]"
        v-bind:key="cellValue"
        class="cell-content"
      >
        <!-- Action keys -->
        <div v-if="column.key === actionsKey" class="actions">
          <span v-if="!(config?.showActionsInPopUp ?? false)">
            <i
              v-for="(ac, index) in rowActions"
              v-bind:key="index"
              :class="{
                [ac.icon]: true,
                hidden: ac.moder && ac.moder(itemData) === HamferGridActionMode.Hidden,
                disabled: ac.moder && ac.moder(itemData) === HamferGridActionMode.Disabled,
              }"
              :style="{ color: ac.color ?? 'var(--primary-color-dark)' }"
              :data-tooltip="ac.title"
              @click="
                (_: any) => {
                  if (!ac.moder || ac.moder(itemData) !== HamferGridActionMode.Disabled)
                    ac.onClick(itemData, index);
                }
              "
            >
            </i>
          </span>
          <i
            v-if="config?.showActionsInPopUp ?? false"
            class="fa fa-bars action-menu"
            @click="swapActionMenuVisible"
          >
            <div
              v-if="actionMenuVisible"
              class="action-menu-dimmer"
              @@click="swapActionMenuVisible"
            ></div>
            <div v-show="actionMenuVisible" class="action-menu-list">
              <div
                v-for="(ac, index) in rowActions"
                v-bind:key="index"
                class="action-menu-item"
                :class="{
                  hidden: ac.moder && ac.moder(itemData) === HamferGridActionMode.Hidden,
                  disabled: ac.moder && ac.moder(itemData) === HamferGridActionMode.Disabled,
                  alternative: index % 2 === 0,
                }"
                :style="{ color: ac.color ?? 'var(--primary-color-dark)' }"
                @click="
                  (_: any) => {
                    if (!ac.moder || ac.moder(itemData) !== HamferGridActionMode.Disabled)
                      ac.onClick(itemData, index);
                  }
                "
              >
                <i :class="ac.icon"></i>
                <span>{{ ac.title }}</span>
              </div>
            </div>
          </i>
        </div>
        <!-- Normal -->
        <div
          v-if="column.tag === 'div' || column.tag === undefined"
          :title="cellValue"
          :class="{ 'label-value': column.labeler }"
          :style="{ backgroundColor: column.labeler ? '' + column.labeler(cellValue) : '' }"
        >
          {{ cellValue }}
        </div>
        <!-- Image -->
        <img
          v-if="column.tag === 'img' && cellValue"
          :src="cellValue"
          :alt="column.key"
          :style="{ width: column.width + 'px', maxHeight: column.width + 'px' }"
        />
        <!-- Tags / List -->
        <div v-if="column.tag === 'list'" class="list-of-values">
          <div v-for="listItem in cellValue" v-bind:key="listItem">
            {{ listItem }}
          </div>
        </div>
      </div>
    </td>
  </tr>
  <tr v-if="itemData.showChildRow" :class="rowClass">
    <td colspan="100%">
      <slot :id="itemData.id"></slot>
    </td>
  </tr>
</template>

<style scoped>
tr {
  background-color: var(--gray-color-lightest);
}
tr.alternative {
  background-color: var(--primary-color-megalight);
}
tr td {
  padding: 4px;
}
tr td div.cell-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

tr td div.actions .hidden {
  display: none;
}
tr td div.actions .disabled {
  color: var(--gray-color);
  cursor: not-allowed;
}
tr td div.actions i {
  margin-left: 4px;
  cursor: pointer;
}
tr td div.actions i.action-menu {
  position: relative;
}
tr td div.actions i.action-menu div.action-menu-dimmer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0001;
  cursor: default;
  z-index: 5000;
}
tr td div.actions i.action-menu div.action-menu-list {
  position: absolute;
  left: 0;
  min-width: 100px;
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: right;
  background-color: var(--grid-row-background-color);
  border: inset 1px var(--grid-row-border-color);
  border-radius: var(--grid-row-border-radius);
  z-index: 5001;
}
tr td div.actions i.action-menu div.action-menu-list div.action-menu-item {
  font-size: var(--font-size);
  padding: 4px 8px;
}
tr td div.actions i.action-menu div.action-menu-list div.action-menu-item.alternative {
  background-color: var(--grid-row-alternative-background-color);
}
tr td div.actions i.action-menu div.action-menu-list div.action-menu-item span {
  font-family: var(--font-family);
  font-weight: 600;
}

tr td div.label-value {
  color: var(--grid-cell-label-color);
  font-size: var(--font-size-lower);
  padding: 4px 8px;
  width: fit-content;
}

tr td img {
  object-fit: scale-down;
}

tr td div.list-of-values {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: center;
}
tr td div.list-of-values div {
  background-color: #d9d9d9;
  padding: 2px 4px;
  border-radius: var(--grid-row-border-radius);
  margin-left: 2px;
  border: 1px solid var(--gray-color-light);
}

/* External classes for HamferGridColumnClass */
.col-center {
  text-align: center;
}
.col-right {
  text-align: right;
}
.col-left {
  text-align: left;
}
.col-rtl {
  direction: rtl;
}
.col-ltr {
  direction: ltr;
}
.cursor-pointer {
  cursor: pointer;
}
</style>

<script lang="ts">
import { isProxy, ref, toRaw } from "vue";
import {
  HamferGridAction,
  HamferGridConfig,
  HamferGridActionMode,
  HamferGridColumn,
} from "./HamferVueGrid.ts";

export default {
  name: "HamferGridRow",
  props: {
    itemData: { type: Object, required: true },
    itemIndex: { type: Number, required: true },
    getValue: { type: Function, required: true },
    columns: { type: Array<HamferGridColumn>, required: true },
    actionsKey: { type: String, required: true },
    config: { type: HamferGridConfig },
    rowActions: { type: Array<HamferGridAction> },
    rowClass: {},
  },
  setup(props) {
    const actionMenuVisible = ref(props.itemData.actionMenuVisible);
    const showChildRow = ref(props.itemData.showChildRow);

    function showChild() {
      showChildRow.value = !showChildRow.value;
      if (showChildRow.value && props.config?.showChildCallBack) {
        props.config.showChildCallBack(
          isProxy(props.itemData) ? toRaw(props.itemData) : props.itemData,
        );
      }
    }
    function swapActionMenuVisible() {
      actionMenuVisible.value = !actionMenuVisible.value;
    }

    return {
      showChildRow,
      actionMenuVisible,
      showChild,
      swapActionMenuVisible,
      HamferGridActionMode,
    };
  },
};
</script>
