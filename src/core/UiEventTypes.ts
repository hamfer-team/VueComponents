import type { ObjectType } from "./Types.ts";

export interface InputDeviceCapabilities {
  readonly firesTouchEvents: boolean;
}

export interface UiEventType extends Event {
  readonly detail: number;
  readonly sourceCapabilities: InputDeviceCapabilities;
  readonly view: object;
}

//#region Input Events

export interface InputEventType extends UiEventType {
  readonly data: string | null;
  readonly dataTransfer: ObjectType; // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
  readonly inputType: string;
  readonly isComposing: boolean;
  getTargetRanges: () => object[]; // https://developer.mozilla.org/en-US/docs/Web/API/StaticRange
}

interface IBlobMethods {
  arrayBuffer: () => Promise<ArrayBuffer>;
  text: () => Promise<string>;
}

export interface EventTargetFile extends IBlobMethods, Blob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
}

export interface EventTargetFiles extends EventTarget {
  files: Array<EventTargetFile>;
}

export interface InputFileEventType extends InputEventType {
  readonly target: EventTargetFiles;
}

//#endregion

//#region Keyboard Events

export interface KeyboardEventType extends UiEventType {
  readonly altKey: boolean;
  readonly code: string;
  readonly ctrlKey: boolean;
  readonly isComposing: boolean;
  readonly key: string;
  readonly location: number;
  readonly metaKey: boolean;
  readonly repeat: boolean;
  readonly shiftKey: boolean;
  readonly charCode: number;
  readonly keyCode: string;
  getModifierState: (key: string) => boolean;
}

export type KeyUpEventType = KeyboardEventType;
export type KeyDownEventType = KeyboardEventType;

//#endregion

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
