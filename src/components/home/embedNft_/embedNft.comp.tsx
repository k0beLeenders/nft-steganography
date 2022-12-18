import React, { FC, useState, useRef } from "react";

import * as utils from "utils";

import * as globalComps from "components/global";

import * as styled from "./embedNft.styles";

export interface IEmbedNftProps {}

export const EmbedNftComp: FC<IEmbedNftProps> = ({}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [mint, setMint] = useState<string>("");
  const [encodedImg, setEncodedImg] = useState<string>();

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const data = event.dataTransfer.getData("text");
    console.log(`Somebody dropped an element with id: ${data}`);
    const element = document.getElementById(data);

    setMint(data);
    const image = element?.attributes?.getNamedItem("src");

    if (imageRef.current && image) {
      imageRef.current.src = image.value;
    }
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const embedImage = async () => {
    if (imageRef?.current) {
      const encodedImage = await utils.encode(mint, imageRef.current);
      setEncodedImg(encodedImage);
      console.log(encodedImage);
    }
  };

  const downloadImage = async () => {
    if (encodedImg) {
      let a = document.createElement("a"); 
      a.href = encodedImg;
      a.download = "Image.png"; 
      a.click(); 
    }
  };

  return (
    <styled.EmbedNft>
      <div
        className="embed-dropzone"
        onDragOver={enableDropping}
        onDrop={(event) => onDrop(event)}
      >
        {!imageRef?.current?.src && (
          <div className="drop-label">
            Drop your nft <br /> to embed!
          </div>
        )}
        <img crossOrigin={"anonymous"} ref={imageRef} onError={() => null} />
      </div>

      <div className="embed-actions">
        <globalComps.PrimaryButton onClick={() => embedImage()}>
          Embed NFT
        </globalComps.PrimaryButton>
        <globalComps.SecondaryButton
          disabled={!encodedImg}
          onClick={() => downloadImage()}
        >
          Download
        </globalComps.SecondaryButton>
      </div>
    </styled.EmbedNft>
  );
};