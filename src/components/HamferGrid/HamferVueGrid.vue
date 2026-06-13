<template>
  <div :id="id" class="grid">
    <div class="grid-title" v-if="title || addAction">
      <h4 id="GridTitle">
        <span
          @click="
            () => {
              refreshData();
            }
          "
          title="بازخوانی اطلاعات جدول و در نظر نگرفتن تغییرات"
        >
          {{ title }}
          <small v-if="gotDatas && gotDatas.length > 0">( {{ totalRowCount }} )</small>
          <i id="RefreshIcon" class="fa fa-sync"></i>
        </span>
        <i
          id="ConfigIcon"
          class="fa"
          :class="{
            'fa-cog': !showColumnsConfig,
            'fa-play-circle fa-rotate-180': showColumnsConfig,
          }"
          :title="showColumnsConfig ? 'فراخوانی اطلاعات جدول با اعمال تغییرات' : 'مشاهده تنظیمات'"
          @click="
            () => {
              tableConfig();
            }
          "
        >
        </i>
      </h4>
      <slot name="buttons">
        <mol-button title="افزودن" @Click="addaction" v-if="addAction" />
      </slot>
    </div>
    <table v-if="dataFetched">
      <thead>
        <th v-for="column in columns" v-bind:key="column.key" :style="{ width: column.width }">
          <div v-for="columnInfo in [columnsInfo[column.key]]" v-bind:key="columnInfo?.key">
            <div class="column-title">
              <div
                :class="{
                  title: column.isSortable || column.canFiltered,
                  'wide-title': column.isSortable && column.canFiltered,
                }"
              >
                {{ column.title }}
              </div>
              <div
                v-if="column.isSortable || column.canFiltered"
                class="column-head-action"
                @click="
                  () => {
                    tableConfig();
                  }
                "
              >
                <i
                  class="fa fa-ellipsis-v"
                  v-if="
                    !(columnInfo?.isFiltered ?? false) &&
                    !(columnInfo?.isSortedAscending ?? false) &&
                    !(columnInfo?.isSortedDescending ?? false)
                  "
                ></i>
                <i class="fa fa-filter" v-if="columnInfo?.isFiltered"></i>
                <i class="fa fa-sort-amount-down-alt" v-if="columnInfo?.isSortedAscending"></i>
                <i class="fa fa-sort-amount-down" v-if="columnInfo?.isSortedDescending"></i>
              </div>
            </div>
            <div v-if="showColumnsConfig" class="column-config">
              <div v-if="column.canFiltered" class="config-filter">
                <i class="fa fa-filter"></i>
                <input type="text" v-model="columnInfo?.filter" />
              </div>
              <div v-if="column.isSortable" class="config-sort">
                <i class="fa fa-sort-amount-down"></i>
                <select
                  @change="
                    (e: Event) => {
                      if (columnInfo) {
                        columnInfo.sort =
                          e.target && 'selectedIndex' in e.target ? e.target.selectedIndex as number : -1;
                      }
                    }
                  "
                >
                  <option></option>
                  <option :selected="columnInfo?.sort === 1">کم به زیاد</option>
                  <option :selected="columnInfo?.sort === 2">زیاد به کم</option>
                </select>
              </div>
            </div>
          </div>
        </th>
      </thead>
      <tbody>
        <grid-row
          v-for="(item, index) in gotDatas"
          v-bind:key="index"
          :row-class="{ alternative: index % 2 === 0 }"
          :item-data="item"
          :item-index="index"
          :actions-key="actionsKey"
          :config="config ?? {}"
          :columns="columns"
          :get-value="getValue"
          :row-actions="rowActions ?? []"
        >
          <slot name="childInfo"> </slot>
        </grid-row>
        <tr v-if="dataFetched && (!totalRowCount || totalRowCount < 1)">
          <td colspan="100%">
            <h3 class="no-data">‼ اطلاعاتی برای نمایش وجود ندارد!</h3>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <!-- TODO SUMMARY -->
        <tr v-if="pagination.size !== -1" class="pagination">
          <td colspan="100%">
            <div>
              <i
                class="fa fa-angle-double-right"
                title="صفحه اول"
                :disabled="(pagination.page ?? 1) === 1 ? '' : null"
                @click="
                  (_: any) => {
                    if ((pagination.page ?? 1) !== 1) go2page(1);
                  }
                "
              ></i>
              <i
                class="fa fa-angle-right"
                title="صفحه قبل"
                :disabled="(pagination.page ?? 1) === 1 ? '' : null"
                @click="
                  (_: any) => {
                    if ((pagination.page ?? 1) !== 1) go2page('-1');
                  }
                "
              ></i>
              <span
                v-for="pageNo in paginationPages()"
                v-bind:key="pageNo"
                :class="{
                  active: pageNo !== 0 && pageNo !== pagination.page,
                  inactive: pageNo === pagination.page || pageNo === 0,
                }"
                :disabled="pageNo === 0 ? '' : null"
                @click="
                  (_: any) => {
                    if (pageNo !== pagination.page && pageNo !== 0) go2page(pageNo);
                  }
                "
              >
                {{ pageNo === 0 ? "..." : "" + pageNo }}
              </span>
              <i
                class="fa fa-angle-left"
                title="صفحه بعد"
                :disabled="(pagination.page ?? 1) === lastPage ? '' : null"
                @click="
                  (_: any) => {
                    if ((pagination.page ?? 1) !== lastPage) go2page('+1');
                  }
                "
              ></i>
              <i
                class="fa fa-angle-double-left"
                title="صفحه آخر"
                :disabled="(pagination.page ?? 1) === lastPage ? '' : null"
                @click="
                  (_: any) => {
                    if ((pagination.page ?? 1) !== lastPage) go2page(lastPage);
                  }
                "
              ></i>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
    <div id="LoadingDiv" v-if="!dataFetched"><i class="fa fa-spinner fa-spin"></i></div>
  </div>
</template>

<style lang="css" scoped>
div.grid {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: nowrap;
  width: 100%;
}
div.grid .grid-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 96%;
  margin: 0 2%;
}
div.grid .grid-title h4 {
  cursor: pointer;
  color: var(--primary-color);
  margin: 0;
}
div.grid .grid-title h4 i.fa {
  opacity: 0.5;
  margin-right: 10px;
}
div.grid table,
div.grid table * {
  border-radius: 3px;
}
div.grid table {
  border-spacing: 1px;
  margin: 1%;
  width: 98%;
  border: solid 1px var(--primary-color);
}

/* Grid Header */
div.grid table thead {
  background-color: var(--primary-color);
  color: var(--gray-color-lightest);
}
div.grid table thead th {
  padding: 8px 0;
}
div.grid table thead th div.title {
  margin: 0 12px;
}
div.grid table thead th div.wide-title {
  margin: 0 20px;
}
div.grid table thead th div div.column-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.grid table thead th div div.column-title .column-head-action {
  position: absolute;
  left: 4px;
  font-size: 12px;
  color: var(--gray-color-lighter);
  text-shadow: 1px 2px 1px black;
}
div.grid table thead th div div.column-title .column-head-action:hover {
  color: var(--gray-color-lightest);
}
div.grid table thead th div div.column-title .column-head-action:active {
  color: var(--gray-color-light);
}

div.grid table thead th div div.column-config {
  display: flex;
  flex-direction: column;
}
div.grid table thead th div div.column-config i {
  color: var(--gray-color-lighter);
  font-size: var(--font-size);
  margin-left: 4px;
}
div.grid table thead th div div.column-config div.config-filter {
  display: flex;
  align-items: center;
  padding: 4px 4px;
}
div.grid table thead th div div.column-config div.config-filter input {
  font-family: var(--font-family);
  width: 100%;
}
div.grid table thead th div div.column-config div.config-sort {
  display: flex;
  align-items: center;
  padding: 4px 4px;
}
div.grid table thead th div div.column-config div.config-sort select {
  font-family: var(--font-family);
  font-size: var(--font-size-lower);
  width: 100%;
}

/* Grid Body */
div.grid table tbody tr td h3.no-data {
  color: var(--grid-no-data-color);
}

/* Grid Footer */
div.grid table tfoot tr.pagination td {
  background-color: var(--gray-color-lightest);
  padding: 5px 8px 4px 8px;
}
div.grid table tfoot tr.pagination td div {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-size);
}
div.grid table tfoot tr.pagination td div i {
  margin: 0 2px;
}
div.grid table tfoot tr.pagination td div i:not([disabled]) {
  color: var(--primary-color);
  cursor: pointer;
}
div.grid table tfoot tr.pagination td div i:not([disabled]):hover {
  color: var(--primary-color-light);
  text-shadow: 1px 1px var(--gray-color-dark);
}
div.grid table tfoot tr.pagination td div i:not([disabled]):active {
  color: var(--primary-color-dark);
}
div.grid table tfoot tr.pagination td div i[disabled] {
  color: var(--gray-color);
  cursor: default;
}
div.grid table tfoot tr.pagination td div span {
  margin: 0 4px;
  font-weight: bold;
  display: inline-block;
  min-width: 12px;
  text-align: center;
}
div.grid table tfoot tr.pagination td div span.active {
  color: var(--primary-color);
  cursor: pointer;
}
div.grid table tfoot tr.pagination td div span.active:hover {
  color: var(--primary-color-light);
  text-shadow: 1px 1px var(--gray-color-dark);
}
div.grid table tfoot tr.pagination td div span.active:active {
  color: var(--primary-color-dark);
}
div.grid table tfoot tr.pagination td div span.inactive {
  color: var(--primary-color-lighter);
  cursor: default;
  text-decoration-line: underline;
}
div.grid table tfoot tr.pagination td div span.inactive[disabled] {
  color: var(--gray-color-light);
  cursor: default;
  text-decoration-line: none;
}

#LoadingDiv {
  display: flex;
  justify-content: center;
  font-size: var(--grid-loading-size);
  padding-top: 52px;
  color: var(--primary-color);
}
</style>

<script lang="ts">
import { ref } from "vue";

import {
  HamferGridAction,
  HamferGridConfig,
  HamferGridPagination,
  HamferGridActionMode,
  HamferGridColumn,
  HamferGridColumnSpecial,
  type ModifierType,
} from "./HamferVueGrid.ts";
import HamferGridRow from "./HamferVueGridRow.vue";
import type { PrimitiveType } from "../../core/Types.ts";
import HamferButton from "../HamferButton/HamferButton.vue";

interface ColumnsInfo {
  key: string;
  isFiltered: boolean,
  isSortedAscending: boolean,
  isSortedDescending: boolean,
  filter: string,
  sort: number,
}

export default {
  name: "HamferGrid",
  components: {
    GridRow: HamferGridRow,
    MolButton: HamferButton,
  },
  props: {
    title: {
      type: String,
    },
    addAction: {
      type: Function,
    },
    columns: {
      type: Array<HamferGridColumn>,
      required: true,
    },
    rowActions: {
      type: Array<HamferGridAction>,
    },
    getData: {
      type: Function,
      required: true,
    },
    paginationDefault: {
      type: HamferGridPagination,
    },
    config: {
      type: HamferGridConfig,
    },
    id: {
      type: String,
    },
  },
  setup(props) {
    const dataFetched = ref<boolean>(false);
    const columnsInfo = ref<Record<string, ColumnsInfo>>({});
    const showColumnsConfig = ref<boolean>(false);
    const actionsKey = HamferGridColumnSpecial.Actions;
    const gotDatas = ref<object[]>([]);
    const totalRowCount = ref<number>();
    const lastPage = ref<number>(1);
    const pagination = ref<HamferGridPagination>(
      props.paginationDefault ?? new HamferGridPagination(),
    );
    if ((pagination.value?.page ?? 0) < 1) pagination.value.page = 1;
    const addaction = () => {
      if (props.addAction) {
        props.addAction();
      }
    };

    const clearColumnsInfo = () => {
      showColumnsConfig.value = false;
      props.columns.forEach((col) => {
        if (col.isSortable || col.canFiltered) {
          const colInfo: ColumnsInfo = {
            key: col.key,
            isFiltered: false,
            isSortedAscending: false,
            isSortedDescending: false,
            filter: "",
            sort: 0,
          };
          columnsInfo.value[col.key] = colInfo;
        }
      });
    };

    const getValue = (
      index: number,
      data: Record<string, PrimitiveType>,
      key: string,
      modifier: ModifierType | undefined,
    ) => {
      switch (key) {
        case HamferGridColumnSpecial.RowNumber: {
          return index + 1;
        }
        case HamferGridColumnSpecial.Actions: {
          return null;
        }
        default: {
          break;
        }
      }
      const value = data[key];
      if (modifier === undefined) {
        return value;
      }

      return modifier(value);
    };

    const prepareData = async () => {
      const res = await props.getData(pagination.value);

      if (res && ("data" in res || "datas" in res)) {
        gotDatas.value = res.data;

        if ("count" in res) {
          totalRowCount.value = res.count;
        } else if ("totalCount" in res) {
          totalRowCount.value = res.totalCount;
        } else {
          totalRowCount.value = res.length;
        }
      } else {
        gotDatas.value = res;
        totalRowCount.value = res?.length ?? 0;
      }
      dataFetched.value = true;

      // Over-apply not paginated result 8-O.
      const size = pagination.value.size;
      if (size >= 1 && gotDatas.value && gotDatas.value.length > size) {
        pagination.value.page = pagination.value.page ?? 1;
        const fromRow = (pagination.value.page - 1) * size;
        gotDatas.value = gotDatas.value?.slice(fromRow, pagination.value.size);
      }

      const last = Math.ceil((totalRowCount.value ?? 1) / pagination.value.size);
      lastPage.value = last < 1 ? 1 : last;
    };

    const applyConfig = async () => {
      const sort: Record<string, string> = {};
      const where: Record<string, string> = {};
      Object.keys(columnsInfo.value).forEach((key: string) => {
        if(columnsInfo.value[key]) {
          if (columnsInfo.value[key].filter !== "") {
            where[key] = columnsInfo.value[key].filter;
            columnsInfo.value[key].isFiltered = true;
          } else {
            columnsInfo.value[key].isFiltered = false;
          }

          if (columnsInfo.value[key].sort === 1) {
            sort[key] = "asc";
            columnsInfo.value[key].isSortedAscending = true;
          } else {
            columnsInfo.value[key].isSortedAscending = false;
          }

          if (columnsInfo.value[key].sort === 2) {
            sort[key] = "desc";
            columnsInfo.value[key].isSortedDescending = true;
          } else {
            columnsInfo.value[key].isSortedDescending = false;
          }
        }
      });

      if (
        JSON.stringify(pagination.value.sort) !== JSON.stringify(sort) ||
        JSON.stringify(pagination.value.where) !== JSON.stringify(where)
      ) {
        pagination.value.page = 1;
      }

      pagination.value.sort = sort;
      pagination.value.where = where;
    };

    const paginationPages = () => {
      const size = pagination.value.size ?? 1;
      if (size < 1) return undefined;

      const curPage = (pagination.value.page ?? 0) < 1 ? 1 : (pagination.value.page ?? 1);

      const result: number[] = [1];

      if (curPage > 5) result.push(0);

      if (curPage >= lastPage.value - 2 && lastPage.value > 2) {
        for (let i = lastPage.value - 6; i < curPage - 3; i++) {
          result.push(i);
        }
      }

      for (let i = curPage - 3; i <= curPage + 3; i++) {
        if (i > 1 && i < lastPage.value) {
          result.push(i);
        }
      }

      if (curPage < 5) {
        for (let i = curPage + 4; i <= 7; i++) {
          if (i < lastPage.value) {
            result.push(i);
          }
        }
      }

      if (lastPage.value >= 5) {
        if (curPage < lastPage.value - 4) result.push(0);
        result.push(lastPage.value);
      }

      return result;
    };

    const go2page = async (page: string | number) => {
      let destPage = 0;
      if (typeof page === "string") {
        destPage = (pagination.value.page ?? 1) + Number(page);
      } else {
        destPage = page;
      }

      pagination.value.page =
        destPage < 1 ? 1 : destPage > lastPage.value ? lastPage.value : destPage;

      await prepareData();
    };

    const tableConfig = async () => {
      if (showColumnsConfig.value) {
        showColumnsConfig.value = false;

        await applyConfig();
        await prepareData();
      } else {
        showColumnsConfig.value = true;
      }
    };

    const refreshData = async () => {
      clearColumnsInfo();
      await applyConfig();
      await prepareData();
    };

    refreshData();
    //clearColumnsInfo();

    return {
      addaction,

      getValue,
      actionsKey,

      gotDatas,
      totalRowCount,

      dataFetched,
      refreshData,

      columnsInfo,
      showColumnsConfig,
      tableConfig,
      pagination,
      paginationPages,
      lastPage,
      go2page,

      HamferGridActionMode: HamferGridActionMode,
    };
  },
};
</script>
