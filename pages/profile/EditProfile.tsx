import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import HeaderLayout from "../../components/layouts/HeaderLayout";

const status = [
  "Todo",
  "Doing",
  "Done"
];


export default function EditProfile({ navigation }: { navigation: any }) {
  return (
    <ContainerEditProfile showsVerticalScrollIndicator={false}>

      <StatusBar style="auto" backgroundColor="#fdfdfd" />
    </ContainerEditProfile>
  );
}

const ContainerEditProfile = styled.ScrollView`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? "50px" : "20px"};
  background: #fdfdfd;
  padding-left: 20px;
  padding-right: 20px;
`;
