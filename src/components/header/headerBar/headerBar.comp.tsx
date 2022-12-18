import React, { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import * as assets from "assets";

import * as styled from "./headerBar.styles";

export interface IHeaderBarComp {}

export const HeaderBarComp: FC<IHeaderBarComp> = () => {
  return (
    <>
      <styled.Header>
        <styled.LogoImage
          alt="Solana Logo"
          src={assets.SOLANA_LOGO}
        ></styled.LogoImage>

        <styled.HeaderActions>
          <styled.HeaderLabel>
            <WalletMultiButton />
          </styled.HeaderLabel>
        </styled.HeaderActions>
      </styled.Header>
    </>
  );
};
