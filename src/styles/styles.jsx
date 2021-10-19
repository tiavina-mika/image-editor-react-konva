import React from "react";
import { css, Global } from "@emotion/react";

import theme from "./theme";

const getGlobalStyles = () => css`
  @font-face {
    font-family: "Mont";
    src: url("/fonts/Mont/Mont-Regular.otf");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
  /* @font-face {
        font-family: "Mont";
        src: url("/fonts/Mont/Mont-Medium.otf");
        font-style: normal;
        font-weight: 500;
        font-display: swap;
      } */
  @font-face {
    font-family: "Mont";
    src: url("/fonts/Mont/Mont-SemiBold.otf");
    font-style: normal;
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: "Mont";
    src: url("/fonts/Mont/Mont-Bold.otf");
    font-style: normal;
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: "Mont";
    src: url("/fonts/Mont/Mont-Heavy.otf");
    font-style: normal;
    font-weight: 800;
    font-display: swap;
  }
  @font-face {
    font-family: "AmaticSC";
    src: url("/fonts/AmaticSC-Bold.ttf");
    font-style: normal;
    font-weight: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Courgette";
    src: url("/fonts/Courgette-Regular.ttf");
    font-style: normal;
    font-weight: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "DelaGothicOne";
    src: url("/fonts/DelaGothicOne-Regular.ttf");
    font-style: normal;
    font-weight: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Neucha";
    src: url("/fonts/Neucha-Regular.ttf");
    font-style: normal;
    font-weight: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Parisienne";
    src: url("/fonts/Parisienne-Regular.ttf");
    font-style: normal;
    font-weight: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "PlayfairDisplay";
    src: url("/fonts/PlayfairDisplay-Regular.ttf");
    font-style: normal;
    font-weight: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Montserrat";
    src: url("/Montserrat-Medium.ttf");
    font-style: normal;
    font-weight: normal;
    font-display: swap;
  }

  html,
  body {
    background: #fff;
    font-family: Lato, Regular, Helvetica, Arial, sans-serif;
    font-size: 16px;
    margin: 0;
    color: #191919;
  }
  * {
    box-sizing: border-box;
  }
  h1 {
    font-size: 36px !important;
  }
  h2 {
    font-size: 30px !important;
  }
  h3 {
    font-size: 26px !important;
  }
  h4 {
    font-size: 24px !important;
  }
  .link {
    font-family: ${theme.fonts.primary};
    font-size: 22px;
    font-weight: 500;
    cursor: "pointer";
  }
  .link:hover {
    opacity: 0.9;
    text-decoration: underline;
  }

  .initialButton {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .initialButton:hover {
    opacity: 0.8;
  }
  .button {
    border-radius: 15px;
    padding: 24px 31px 27px 31px;
    cursor: pointer;
    border: 1px solid ${theme.colors.primary};
    line-height: 1;
  }
  .button:focus {
    border: 1px solid ${theme.colors.primary};
  }
  .button:hover {
    opacity: 0.8;
    border: 1px solid ${theme.colors.primary};
  }
  .button:disabled {
    background-color: rgba(46, 46, 46, 0.16);
    color: #fff;
  }
  .buttonText {
    font-size: 18px;
    color: ${theme.colors.primary};
    font-style: normal;
    font-weight: 800;
  }
  .clickableText {
    border: none;
    background: none;
    cursor: pointer;
  }
  .formItem {
    border-radius: 4px;
    font-weight: 400;
    font-size: 15px;
    flex: 1 0 auto;
    line-height: 1.4;
    margin: 0;
    width: 100%;
  }
  .formItem .ant-input-affix-wrapper {
    padding-top: 0;
    padding-bottom: 0;
  }
  .formItem input {
    padding: ${theme.spacing(1.8)}px ${theme.spacing(1)}px !important;
    transition: border-color 0.3s ease-out;
  }

  .typography {
    font-family: ${theme.fonts.primary};
    line-height: 1.38;
  }
  .bold {
    font-weight: 800 !important;
  }
  .medium {
    font-weight: 500 !important;
  }
  .text {
    font-size: 22px !important;
    font-weight: 500;
  }
  .light {
    color: #fff !important;
  }
  .dark {
    color: ${theme.colors.dark} !important;
  }
  .lightDark {
    color: ${theme.colors.lightDark};
  }
  .active {
    color: ${theme.colors.primary};
  }
  .default {
    color: #000 !important;
  }
  .initialFlex {
    align-self: normal !important;
    flex: none !important;
  }
  .flexRow {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .flexColumn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
  }
  .flexCenter {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }
  .flexStretch {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .stretch {
    align-items: stretch;
  }
  .alignCenter {
    align-items: center;
  }
  .flexStart {
    align-items: flex-start;
  }
  .flexEnd {
    align-items: flex-end;
  }
  .spaceBetween {
    justify-content: space-between;
  }
  .spaceAround {
    justify-content: space-around;
  }
  .justifyStart {
    justify-content: flex-start;
  }
  .justifyEnd {
    justify-content: flex-end;
  }
  .justifyCenter {
    justify-content: center;
  }
  .stretchSelf {
    align-self: stretch;
  }
  .flexEndSelf {
    align-self: flex-end;
  }
  .centerSelf {
    align-self: center;
  }
  .flex1 {
    flex: 1;
  }
  .wrap {
    flex-wrap: wrap;
  }
  .nowrap {
    flex-wrap: nowrap;
  }
  .shrink0 {
    flex-shrink: 0;
  }
  .shrink1 {
    flex-shrink: 1;
  }

  .flexItem {
    padding: 10px;
  }
  /*------------------*/

  .textCenter {
    text-align: center;
  }
  .textLeft {
    text-align: left;
  }
  .textRight {
    text-align: right;
  }
  .errorColor {
    color: #ec554f;
  }
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .gridBorder {
    border-right: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
  }
  .width100 {
    width: 100%;
  }
  .height100 {
    height: 100%;
  }
  .minHeight100 {
    min-height: 100vh;
  }
  .minHeight50 {
    min-height: 50vh;
  }
  .pointer {
    cursor: pointer;
  }
  .overflowHidden {
    overflow: hidden;
  }
  .overflowAuto {
    overflow: auto;
  }
  .positionRelative {
    position: relative;
  }
  .overParent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .floatRight {
    float: right;
  }
  .fullWidth {
    width: 100%;
  }
  .hidden {
    opacity: 0;
  }
  .visible {
    opacity: 1;
  }
  .transition300ms {
    transition: all 300ms ease-in-out;
  }
  .blackColor {
    color: #000 !important;
  }
  .m-x-5 {
    margin-right: 5px;
    margin-left: 5px;
  }
  .m-x-8 {
    margin-right: 8px;
    margin-left: 8px;
  }
  .m-x-10 {
    margin-right: 10px;
    margin-left: 10px;
  }
  .m-x-15 {
    margin-right: 15px;
    margin-left: 15px;
  }
  .m-x-20 {
    margin-right: 20px;
    margin-left: 20px;
  }
  .m-x-25 {
    margin-right: 25px;
    margin-left: 25px;
  }

  .m-y-5 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .m-y-8 {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .m-y-10 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .m-y-15 {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .m-y-20 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .m-y-25 {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .m-r-5 {
    margin-right: 5px;
  }
  .m-r-8 {
    margin-right: 8px;
  }
  .m-r-10 {
    margin-right: 10px;
  }
  .m-r-15 {
    margin-right: 15px;
  }
  .m-r-20 {
    margin-right: 20px;
  }
  .m-r-25 {
    margin-right: 25px;
  }
  .m-t-10 {
    margin-top: 10px;
  }
  .m-t-15 {
    margin-top: 15px;
  }
  .m-t-20 {
    margin-top: 20px;
  }
  .m-t-25 {
    margin-top: 25px;
  }
  .m-t-50 {
    margin-top: 50px;
  }
  .m-l-5 {
    margin-left: 5px;
  }
  .m-l-8 {
    margin-left: 8px;
  }
  .m-l-10 {
    margin-left: 10px;
  }
  .m-l-15 {
    margin-left: 15px;
  }
  .m-l-20 {
    margin-left: 20px;
  }
  .m-l-25 {
    margin-left: 25px;
  }
  .m-b-3 {
    margin-bottom: 3px;
  }
  .m-b-5 {
    margin-bottom: 5px;
  }
  .m-b-8 {
    margin-bottom: 8px;
  }
  .m-b-10 {
    margin-bottom: 10px;
  }
  .m-b-15 {
    margin-bottom: 15px;
  }
  .m-b-20 {
    margin-bottom: 15px;
  }
  .m-b-25 {
    margin-bottom: 25px;
  }
  .m-t-0 {
    margin-top: 0;
  }

  .p-x-5 {
    padding-right: 5px;
    padding-left: 5px;
  }
  .p-x-8 {
    padding-right: 8px;
    padding-left: 8px;
  }
  .p-x-10 {
    padding-right: 10px;
    padding-left: 10px;
  }
  .p-x-15 {
    padding-right: 15px;
    padding-left: 15px;
  }
  .p-x-20 {
    padding-right: 20px;
    padding-left: 20px;
  }
  .p-x-25 {
    padding-right: 25px;
    padding-left: 25px;
  }

  .p-y-5 {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .p-y-8 {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .p-y-10 {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .p-y-15 {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .p-y-20 {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .p-y-25 {
    padding-top: 25px;
    padding-bottom: 25px;
  }

  .p-r-5 {
    padding-right: 5px;
  }
  .p-r-8 {
    padding-right: 8px;
  }
  .p-r-10 {
    padding-right: 10px;
  }
  .p-r-15 {
    padding-right: 15px;
  }
  .p-r-20 {
    padding-right: 20px;
  }
  .p-r-25 {
    padding-right: 25px;
  }
  .p-t-10 {
    padding-top: 10px;
  }
  .p-t-15 {
    padding-top: 15px;
  }
  .p-t-20 {
    padding-top: 20px;
  }
  .p-t-25 {
    padding-top: 25px;
  }
  .p-t-50 {
    padding-top: 50px;
  }
  .p-l-5 {
    padding-left: 5px;
  }
  .p-l-8 {
    padding-left: 8px;
  }
  .p-l-10 {
    padding-left: 10px;
  }
  .p-l-15 {
    padding-left: 15px;
  }
  .p-l-20 {
    padding-left: 20px;
  }
  .p-l-25 {
    padding-left: 25px;
  }
  .p-b-3 {
    padding-bottom: 3px;
  }
  .p-b-5 {
    padding-bottom: 5px;
  }
  .p-b-8 {
    padding-bottom: 8px;
  }
  .p-b-10 {
    padding-bottom: 10px;
  }
  .p-b-15 {
    padding-bottom: 15px;
  }
  .p-b-25 {
    padding-bottom: 25px;
  }
  .p-t-0 {
    padding-top: 0;
  }
  .title12 {
    font-size: 12px;
  }
  .title14 {
    font-size: 14px;
  }
  .title18 {
    font-size: 18px;
  }
  .title22 {
    font-size: 22px;
  }
  .title28 {
    font-size: 28px;
  }
  .title38 {
    font-size: 38px;
  }
  .boxSizing {
    box-sizing: initial !important;
  }
  .r7 {
    border-radius: 7px;
  }
  .red {
    background-color: red;
  }
  .green {
    background-color: green;
  }
  .yellow {
    background-color: yellow;
  }
`;

export const GlobalStyles = () => <Global styles={getGlobalStyles()} />;
