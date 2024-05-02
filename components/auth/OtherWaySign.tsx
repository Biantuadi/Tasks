import React from "react";
import styled from "styled-components/native";

interface Props {
  title: string;
  onPress: any;
}

export default function OtherWaySign({ title, onPress }: Props) {
  return (
    <OttherWayContainer>
      <TextOtherWay>- Or {title} with -</TextOtherWay>
      <ContainerOtherWay>
        <ButtonOtherWay onPress={onPress} activeOpacity={0.9}>
          <TextButtonOtherWay>Facebook</TextButtonOtherWay>
        </ButtonOtherWay>
        <ButtonOtherWay>
          <TextButtonOtherWay>Google</TextButtonOtherWay>
        </ButtonOtherWay>
      </ContainerOtherWay>
    </OttherWayContainer>
  );
}

const OttherWayContainer = styled.View`
  width: 100%;
  align-items: center;
  align-self: center;
  margin-top: 20px;
  gap: 5px;
`;

const TextOtherWay = styled.Text`
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
`;

const ContainerOtherWay = styled.View`
  flex-direction: row;
  gap: 20px;
`;

const ButtonOtherWay = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextButtonOtherWay = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: bold;
`;
