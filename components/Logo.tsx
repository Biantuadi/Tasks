import React from "react";
import styled from "styled-components/native";
import LogoImg from "../assets/logo.png";
// import LogoTest from "../assets/ia_logo.png";

export default function Logo({style}:any) {
  return <ImageStyled source={LogoImg} style={style} />;
}

const ImageStyled = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;
