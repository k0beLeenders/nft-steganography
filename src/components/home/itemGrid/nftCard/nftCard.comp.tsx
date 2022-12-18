import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";

import * as assets from 'assets'
import * as models from "models";

import * as styled from "./nftCard.styles";

export interface INftCardProps {
  nftData: models.INftObject;
}

export const NftCard: FC<INftCardProps> = ({ nftData }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
  };

  return (
    <styled.NftCard>
      <div className="nft-img-section">
        <img
          draggable="true"
          id={nftData.mint}
          crossOrigin={"anonymous"}
          onDragStart={handleDragStart}
          src={nftData.image === '' ? assets.NFT_PLACEHOLDER: nftData.image}
        ></img>
      </div>
      <div className="nft-name">{nftData.name}</div>
    </styled.NftCard>
  );
};
