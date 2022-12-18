import styled from "@emotion/styled";

import * as consts from "consts";

export const buttonBaseStyles = {
  cursor: "pointer",
  display: "inline-flex",
  border: "none",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
  borderRadius: "10px",
  fontWeight: 600,
  padding: "8px 12px",
  width: "120px",
  height: '38px',
  transition: "0.5s",

  "&:disabled": {
    opacity: 0.8,
    cursor: "not-allowed",
  },
};

export const PrimaryButton = styled.button({
  backgroundColor: consts.BLACK,
  color: consts.WHITE,

  "&:hover": {
    opacity: 0.9,
  },
  ...buttonBaseStyles,
});

export const SecondaryButton = styled.button({
  backgroundColor: consts.DARK_WHITE,
  color: consts.BLACK,

  "&:hover": {
    backgroundColor: consts.WHITE,
  },
  ...buttonBaseStyles,
});
