import styled from "@emotion/styled";

import * as consts from "consts";

export const DecodeNft = styled.div({
  display: "flex",
  gap: "15px",
  width: "100%",

  ".decode-dropzone": {
    cursor: "pointer",
    position: "relative",
    height: "204px",
    width: "204px",
    borderRadius: "8px",
    border: `2px dashed ${consts.BLACK}`,

    'input[type="file"]': {
      display: "none",

      "&:disabled": {
        cursor: "not-allowed",
      },
    },

    ".drag-file-element": {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "1rem",
      opacity: "0.2",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

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

  ".decode-actions": {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
});
