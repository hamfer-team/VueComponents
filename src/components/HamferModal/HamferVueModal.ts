export class HamferModalButtonModel {
  title!: string;
  class?: string;
  action!: () => void;
}

export class HamferModalModel {
  header: string;
  message: string;
  buttons: HamferModalButtonModel[];

  constructor(header: string, message: string, buttons: HamferModalButtonModel[]) {
    this.header = header;
    this.message = message;
    this.buttons = buttons;
  }

  public static Empty = (closeAction: () => void): HamferModalModel =>
    new HamferModalModel("سامانه راهرود", "...", [{ title: "تایید", action: closeAction }]);
  public static Info = (
    message: string,
    closeAction: () => void,
    header: string = "لطفا توجه نمایید:",
  ): HamferModalModel =>
    new HamferModalModel(`💡 ${header}`, message, [{ title: "تایید", action: closeAction }]);
  public static Error = (
    message: string,
    closeAction: () => void,
    header: string = "خطایی رخ داده است!:",
  ): HamferModalModel =>
    new HamferModalModel(`🛑 ${header}`, message, [{ title: "تایید", action: closeAction }]);
  public static Approve = (
    title: string,
    name: string,
    approveAction: () => void,
    closeAction: () => void,
  ): HamferModalModel =>
    new HamferModalModel(`💥 تایید ${title}`, `آیا از ${title} (${name}) اطمینان دارید؟`, [
      {
        title: "تایید",
        action: function () {
          approveAction();
          closeAction();
        },
      },
      { title: "انصراف", action: closeAction, class: "button-gray" },
    ]);
  public static Delete = (
    title: string,
    name: string,
    deleteAction: () => void,
    closeAction: () => void,
  ): HamferModalModel =>
    new HamferModalModel(
      `🔥 حذف اطلاعات ${title}`,
      `آیا از حذف اطلاعات ${title} (${name}) اطمینان دارید؟`,
      [
        {
          title: "تایید",
          action: function () {
            deleteAction();
            closeAction();
          },
          class: "button-danger",
        },
        { title: "انصراف", action: closeAction, class: "button-gray" },
      ],
    );
}
