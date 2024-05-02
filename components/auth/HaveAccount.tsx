import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  textTitle: string;
  navigateTo: string;
  textButton: string;
}

export default function HaveAccount({
  textTitle,
  navigateTo,
  textButton,
}: Props) {
  const navigation = useNavigation();
  return (
    <DontHaveAccountContainer>
      <TextDontHaveAccount>{textTitle}</TextDontHaveAccount>
      <ButtonLogin
        onPress={() => navigation.navigate(navigateTo as never)}
        activeOpacity={0.9}
      >
        <TextButtonLogin>{textButton}</TextButtonLogin>
      </ButtonLogin>
    </DontHaveAccountContainer>
  );
}

const DontHaveAccountContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 40px;
  flex-direction: row;
  gap: 5px;
`;

const TextDontHaveAccount = styled.Text`
  font-size: 16px;
  color: #000;
`;

const ButtonLogin = styled.TouchableOpacity`
  /* margin-top: 10px; */
`;

const TextButtonLogin = styled.Text`
  font-size: 16px;
  color: #1e263b;
  font-weight: bold;
`;
