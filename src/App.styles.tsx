import { css } from "@emotion/react";

import * as assets from "assets";

export const globalStyle = css({
  body: {
    overflowX: "hidden",
  },

  "#root": {
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  },

  ".app-title": {
    fontFamily: "FF Oxide Solid",
    fontStyle: "normal",
    fontWeight: 300,
    letterSpacing: "0px",

    h2: {
      fontSize: "20px",
      margin: "0px",
    },
  },

  ".ant-layout-header": {
    alignItems: "center",
    height: "42px",
    padding: "0 20px",
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: "64px",
    display: "flex",
  },

  ".App-Bar": {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    top: "0px",
    position: "relative",
    padding: "1rem",
    zIindex: 2,

    ".ant-menu-horizontal": {
      borderBottomColor: "transparent",
      backgroundColor: "transparent",
      lineHeight: "inherit",
      fontSize: "16px",
      margin: "0 10px",

      ".ant-menu-item": {
        margin: "0 10px",
        color: "lightgrey",
        height: "35px",
        lineHeight: "35px",
        borderWidth: "0px !important",
      },

      ".ant-menu-item:hover": {
        color: "white",
        borderWidth: "0px !important",
      },

      ".ant-menu-item-selected": {
        fontWeight: "bold",
      },
    },
  },

  ".App-Bar-left": {
    boxSizing: "border-box",
    margin: "0px",
    minWidth: "0px",
    display: "flex",
    padding: "0px",
    alignItems: "center",
    width: "fit-content",
  },

  ".App-Bar-right": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifySelf: "flex-end",
  },

  ".wallet-wrapper": {
    paddingLeft: "0.7rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },

  ".wallet-key": {
    padding: "0.1rem 0.5rem 0.1rem 0.7rem",
    marginLeft: "0.3rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
  },

  ".ant-tabs-nav-scroll": {
    display: "flex",
    justifyContent: "center",
  },

  em: {
    fontWeight: "bold",
    fontStyle: "normal",
    textDecoration: "none",
  },

  ".ant-notification": {
    a: {
      color: "blue",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },

  ".ant-layout-content": {
    display: "flex",
    overflow: "auto",
  },

  ".flexColumn": {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  ".card-fill": {
    height: "100%",
  },

  ".card-row": {
    boxSizing: "border-box",
    margin: "5px 0px",
    minWidth: "0px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: "0px",
    alignItems: "center",
    justifyContent: "space-between",

    ".card-cell": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      boxSizing: "border-box",
      textAlign: "left",
      margin: "0px",
      minWidth: "0px",
      fontSize: "14px",
    },

    ".left": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },

    ".small": {
      fontSize: "11px",
    },
  },

  ".token-input": {
    display: "flex",
    alignItems: "center",
    border: "1px solid grey",
    padding: "0px 10px",
    margin: "5px 0px",
  },

  ".token-balance": {
    marginLeft: "auto",
    marginRight: "5px",
  },
});
