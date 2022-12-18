import styled from "@emotion/styled";

import * as consts from "consts";

export const EmbedNft = styled.div({
  display: "flex",
  gap: "15px",
  width: "100%",

  ".embed-dropzone": {
    position: "relative",
    height: "204px",
    width: "204px",
    borderRadius: "8px",
    border: `2px dashed ${consts.BLACK}`,

    ".drop-label": {
      position: "absolute",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      width: "100%",

      color: consts.LIGHTER_GRAY,
      fontWeight: 700,
    },

    img: {
      height: "200px",
      width: "200px",
      borderRadius: "8px",
    },
  },

  ".embed-actions": {
    display: "flex",
    gap: 10,
  },
});
