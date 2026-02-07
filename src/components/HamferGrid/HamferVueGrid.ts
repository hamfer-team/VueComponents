import type { AnyType, ObjectType, PrimitiveType } from "../../core/Types";

export type ModifierType = (value: PrimitiveType | undefined) => PrimitiveType | undefined;
export type ModerType = (value: PrimitiveType | undefined) => PrimitiveType | undefined;
export type LabelerType = (value: PrimitiveType | undefined) => PrimitiveType | undefined;
export type TagType = "div" | "img" | "list";
export type OnClickType = (value?: PrimitiveType | undefined, index?: number | undefined) => void;

export const HamferGridColumnSpecial = {
  RowNumber: "@row-number",
  Actions: "@actions",
};

export const HamferGridColumnClass = {
  TextCenter: "col-center",
  TextRight: "col-right",
  TextLeft: "col-left",
  RTL: "col-rtl",
  LTR: "col-ltr",
  Pointer: "cursor-pointer",
};

export const HamferGridActionMode = {
  Hidden: "hidden",
  Disabled: "disabled",
};

export class HamferGridColumn {
  title!: string;
  key!: string;

  width?: string | undefined;
  class?: string | undefined;
  modifier?: ModifierType | undefined;
  labeler?: LabelerType | undefined;
  tag?: TagType | undefined;
  isSortable?: boolean = false;
  canFiltered?: boolean = false;
  canShowChildRow?: boolean = false;

  public static RowNo = (
    title: string = "ردیف",
    canShowChildRow: boolean = false,
  ): HamferGridColumn => {
    return {
      title: title,
      key: HamferGridColumnSpecial.RowNumber,
      class:
        HamferGridColumnClass.TextCenter +
        (canShowChildRow ? " " + HamferGridColumnClass.Pointer : ""),
      width: "50px",
      canShowChildRow,
    } as HamferGridColumn;
  };
  public static IsActive = (
    key: string = "isActive",
    title: string = "فعال",
    isSortable: boolean = false,
    canFiltered: boolean = false,
  ): HamferGridColumn => {
    return {
      title: title,
      key: key,
      modifier: (value: boolean) => (value ? "✅" : "❌"),
      class: HamferGridColumnClass.TextCenter,
      isSortable,
      canFiltered,
    } as HamferGridColumn;
  };
  public static Actions = (title: string = "عملیات"): HamferGridColumn => {
    return {
      title: title,
      key: HamferGridColumnSpecial.Actions,
      class: HamferGridColumnClass.TextCenter,
    } as HamferGridColumn;
  };
  public static ShowTag = (
    title: string,
    key: string,
    separator: string = ",",
    _class: string | undefined = HamferGridColumnClass.TextCenter,
  ): HamferGridColumn => {
    const tagModifier = (value: string) => value?.split(separator);
    return {
      title: title,
      key: key,
      tag: "list",
      class: _class,
      modifier: tagModifier,
    } as HamferGridColumn;
  };
}

export class HamferGridAction {
  title!: string;
  icon!: string;
  onClick!: OnClickType;
  color?: string | undefined;
  moder?: ModerType | undefined;

  public static Delete = (onClick: OnClickType, title = "حذف"): HamferGridAction => {
    return {
      title: title,
      icon: "fa fa-trash",
      onClick: onClick,
      color: "var(--secondary-color)",
    } as HamferGridAction;
  };
  public static Edit = (onClick: OnClickType, title = "ویرایش"): HamferGridAction => {
    return { title: title, icon: "fa fa-edit", onClick: onClick } as HamferGridAction;
  };
  public static Detail = (onClick: OnClickType, title = "جزئیات"): HamferGridAction => {
    return { title: title, icon: "fa fa-eye", onClick: onClick } as HamferGridAction;
  };
  public static Approve = (onClick: OnClickType, title = "تایید"): HamferGridAction => {
    return {
      title: title,
      icon: "fa fa-check-circle",
      color: "var(--green-color)",
      onClick: onClick,
    } as HamferGridAction;
  };
  public static Reject = (onClick: OnClickType, title = "ردتایید"): HamferGridAction => {
    return {
      title: title,
      icon: "fa fa-times-circle",
      color: "var(--secondary-color-dark)",
      onClick: onClick,
    } as HamferGridAction;
  };
}

export class HamferGridPagination {
  size: number;
  page?: number | undefined;
  sort?: ObjectType | undefined;
  where?: ObjectType | undefined;

  constructor(
    pageSize: number = -1,
    pageNo: number | undefined = undefined,
    sort: ObjectType | undefined = undefined,
    where: ObjectType | undefined = undefined,
  ) {
    this.size = pageSize;
    this.page = pageNo ?? 1;
    this.sort = sort;
    this.where = where;
  }
}

export class HamferGridData {
  count: number;
  data: Record<string, PrimitiveType>[];

  constructor(count: number, data: Record<string, PrimitiveType>[]) {
    this.count = count;
    this.data = data;
  }
}

export class HamferGridConfig {
  showActionsInPopUp?: boolean | undefined;
  showChildCallBack?: (result: AnyType) => void | undefined;
}
