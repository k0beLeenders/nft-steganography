import React, { FC, useState, useRef } from "react";
import { useForm } from "react-hook-form";

import * as models from "models";
import * as utils from "utils";
import * as consts from "consts";

import * as globalComps from "components/global";

import * as styled from "./embedNft.styles";

export interface IEmbedNftProps {}

export const EmbedNftComp: FC<IEmbedNftProps> = ({}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [mint, setMint] = useState<string>("");
  const [encodedImg, setEncodedImg] = useState<string>();
  const form = useForm<models.IConversionPresetForm>({
    mode: "onChange",
    defaultValues: {
      preset: "NONE",
    },
  });

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

  const embedImage = async (preset?: models.IConversionPreset) => {
    if (imageRef?.current) {
      const encodedImage = await utils.encode(
        mint,
        imageRef.current,
        preset
      );
      setEncodedImg(encodedImage);
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

  const handleOnSubmit = (formData: models.IConversionPresetForm) => {
    embedImage(consts.CONVERSION_PRESET_MAP[formData.preset].value)
  }

  return (
    <styled.EmbedNft onSubmit={form.handleSubmit(handleOnSubmit)}>
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
        <globalComps.PrimaryButton type={'submit'}>
          Embed NFT
        </globalComps.PrimaryButton>
        <globalComps.SecondaryButton
          disabled={!encodedImg}
          type={'button'}
          onClick={() => downloadImage()}
        >
          Download
        </globalComps.SecondaryButton>
        <globalComps.H4>Compression type</globalComps.H4>
        <div>
          <input
            type="radio"
            {...form.register("preset")}
            value="NONE"
            id="NONE"
          />
          <label htmlFor="NONE">None</label>
        </div>
        <div>
          <input
            type="radio"
            {...form.register("preset")}
            value="TWITTER"
            id="TWITTER"
          />
          <label htmlFor="TWITTER">Twitter</label>
        </div>
      </div>
    </styled.EmbedNft>
  );
};
