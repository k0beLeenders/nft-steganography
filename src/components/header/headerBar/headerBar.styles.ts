import styled from "@emotion/styled";

import * as consts from "consts";
import * as colors from "consts/colors.consts";

export const Header = styled.header(() => ({
  boxSizing: "border-box",
  height: "100px",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  color: colors.WHITE,
  position: "fixed",
  backgroundColor: "rgb(1 1 2 / 80%)",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 18,

  [consts.mediaQuery.tablet]: {
    width: "100vw",
    left: 0,
  },
}));

export const HeaderActions = styled.div({
  marginLeft: "auto",
  marginRight: "80px",
  gap: "20px",
  display: "flex",
  alignItems: "center",
});

export const HeaderLabel = styled.div({
  lineHeight: "20px",
  fontFamily: "Blender pro, sans-serif",
  color: colors.WHITE,
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: 800,

  a: {
    textDecoration: "none",
    color: "inherit",
  },

  button: {
    width: "250px",
    marginBottom: 0,
  },

  "&.dropdown": {
    overflow: "hidden",
  },

  "&.dropdown:hover .dropdown-content": {
    display: "block",
  },

  ".dropdown-content": {
    display: "none",
    position: "absolute",
    background: colors.BACKGROUND_BLACK_TRANSPARENT,
    padding: "10px 9px",
    borderRadius: "9px",

    a: {
      color: consts.DARK_WHITE,
      float: "none",
      textDecoration: "none",
      display: "block",
      margin: "5px 0",
      textAlign: "left",

      "&:hover": {
        color: consts.WHITE,
      },
    },
  },
});

export const LogoImage = styled.img({
  width: "220px",
  padding: "2px",
});

export const MobileToggler = styled.div<{ isSideBar: boolean }>(
  ({ isSideBar }) => ({
    marginRight: 0,
    cursor: "pointer",

    img: {
      height: 30,
    },
  })
);
