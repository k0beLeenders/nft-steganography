import React, { FC, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { useSolanaFacade } from "state/solana";

import * as globalComps from "components/global";
import * as homeComps from "components/home";

import * as styled from "./home.styles";

export interface IHomeView {}

export const HomeView: FC<IHomeView> = () => {
  const { walletInfo, getNftsByOwner } = useSolanaFacade();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      getNftsByOwner({ owner: publicKey });
    }
  }, [getNftsByOwner, publicKey]);
  return (
    <styled.Home>
      <div className="nft-section">
        <globalComps.H2>NFT Gallery</globalComps.H2>
        <globalComps.P>Drag your NFT to the dropzone to embed your address.</globalComps.P>
        <homeComps.NftGridComp
          nftObjects={walletInfo?.walletNfts ?? []}
          itemsPerPage={8}
        ></homeComps.NftGridComp>
      </div>

      <div className="stenographic-section">
        <div className="embed-nft-section">
          <globalComps.H2>Embed NFT</globalComps.H2>
          <globalComps.P>Drag your NFT to the dropzone to embed your address.</globalComps.P>
          <homeComps.EmbedNftComp />
        </div>

        <div className="decode-nft-section">
          <globalComps.H2>Decode NFT</globalComps.H2>
          <globalComps.P>Upload or drag your NFT image to the dropzone to decode your NFT.</globalComps.P>
          <homeComps.DecodeNftComp />
        </div>
      </div>
    </styled.Home>
  );
};
