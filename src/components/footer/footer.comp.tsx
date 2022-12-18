import React, { FC } from "react";

import * as styled from "./footer.styles";

export interface IFooterProps {}

export const FooterComp: FC<IFooterProps> = () => {
  return (
    <styled.Footer>
      <styled.Description></styled.Description>
    </styled.Footer>
  );
};
