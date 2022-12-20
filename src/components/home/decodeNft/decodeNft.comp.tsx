import React, { FC, useState, useRef } from "react";
import * as web3 from "@solana/web3.js";

import * as utils from "utils";

import * as globalComps from "components/global";

import * as styled from "./decodeNft.styles";
import { useConnection } from "@solana/wallet-adapter-react";

export interface IDecodeNftProps {}

export const DecodeNftComp: FC<IDecodeNftProps> = ({}) => {
  const { connection } = useConnection();

  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileSelector = useRef<HTMLInputElement | null>(null);

  const [owner, setOwner] = useState<string>();

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const data = event.dataTransfer.getData("text");
    console.log(`Somebody dropped an element with id: ${data}`);
    const element = document.getElementById(data);

    const image = element?.attributes?.getNamedItem("src");

    if (imageRef.current && image) {
      imageRef.current.src = image.value;
    }
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (imageRef.current) {
          imageRef.current.src = reader.result?.toString() ?? "";
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onDragDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (imageRef.current) {
          imageRef.current.src = reader.result?.toString() ?? "";
        }
      });
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  const decodeImage = async () => {
    if (imageRef?.current) {
      // const aml = await utils.encode("E6SmUC27qUzcTRYSt7djCnrPKhTWRa5nq5shMfTpXPCF", imageRef.current);
      setOwner("")
      const mint = await utils.decode(imageRef.current);

      const mintKey = new web3.PublicKey(mint);
      const largestAccounts = await connection.getTokenLargestAccounts(mintKey);
      const largestAccountInfo = await connection.getParsedAccountInfo(
        largestAccounts.value[0].address
      );
      setOwner((largestAccountInfo.value?.data as web3.ParsedAccountData).parsed.info.owner);
    }
  };

  return (
    <styled.DecodeNft>
      <div
        className="decode-dropzone"
        onDragOver={enableDropping}
        onDrop={(event) => onDrop(event)}
        onClick={() => fileSelector.current?.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileSelector}
          onChange={onSelectFile}
          onDrop={onDragDrop}
        />

        {!imageRef?.current?.src && (
          <div className="drop-label">
            Drop your nft <br /> to decode!
          </div>
        )}

        <img crossOrigin={"anonymous"} ref={imageRef} onError={() => null} />

        <div
          className="drag-file-element"
          id="drag-file-element"
          onDrop={onDragDrop}
        ></div>
      </div>

      <div className="decode-actions">
        <globalComps.PrimaryButton onClick={() => decodeImage()}>
          Decode NFT
        </globalComps.PrimaryButton>
        <div>
          Owner: {owner}
        </div>
      </div>
    </styled.DecodeNft>
  );
};
