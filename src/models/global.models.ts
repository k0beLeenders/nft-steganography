import { ReactNode } from "react";

export type CAROUSEL_BUTTON_TYPES = "ROUND" | "SIMPLE";

export interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
  portalId?: string;
  showDismiss?: boolean;
}

export interface IUseModalReturn {
  Modal: ({ children, ...props }: any) => JSX.Element;
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export interface IConversionPreset {
  height: number;
  width: number;
}

export type IApiStatus = "idle" | "loading" | "success" | "failed";
export type IError = SerializedError | any;

export type IConversionPresetType = "NONE" | "TWITTER";
export interface IConversionPresetForm {
  preset: IConversionPresetType;
}

export interface IConversionPresetMap {
  preset: IConversionPresetType;
  value?: IConversionPreset;
}
