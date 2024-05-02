import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  TitlePage: string;
  icon?: React.ReactNode;
}

export default function HeaderLayout({ TitlePage, icon }: Props) {
  const navigation = useNavigation();
  return (
    <Header>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {icon ? icon : <Ionicons name="arrow-back" size={24} color="black" />}
      </TouchableOpacity>
      <Title>
        {TitlePage}
      </Title>
    </Header>
  );
}

const Header = styled.View`
   flex-direction: row;
    align-items: center;
    gap: 100px;
`;

const Title = styled.Text`
  font-size: 23px;
    color: #000;
`;
