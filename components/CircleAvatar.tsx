import React from "react";
import styled from "styled-components/native";

interface CircleAvatarProps {
  image: string;
  style?: any;
}

export default function CircleAvatar({ image, style }: CircleAvatarProps) {
  return (
    <>
      <CircleAvatarImage source={{ uri: image }} style={style} />
    </>
  );
}

const CircleAvatarImage = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  /* transform: scale(3); */

`;
