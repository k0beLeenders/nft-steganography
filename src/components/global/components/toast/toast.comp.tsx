import React, { FC } from "react";
import { ToastContainer } from "react-toastify";

export interface IToastContainerProps {}

export const ToastContainerComp: FC<IToastContainerProps> = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme="dark"
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
