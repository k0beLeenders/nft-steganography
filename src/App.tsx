import { Global } from "@emotion/react";
import React, { FC } from "react";
import { globalStyle } from "./App.styles";

import { Router } from "./routes";

export interface IAppComp {}

export const AppComp: FC<IAppComp> = () => {
  return (
    <>
      <Global styles={globalStyle} />
      <Router />
    </>
  );
};
