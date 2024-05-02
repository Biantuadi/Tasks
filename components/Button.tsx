import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

interface Props {
  textButton: string;
  onPress: any;
  textStyles?: any;
  ButtonStyles?: any;
  loading?: boolean;
}

 const Button = ({ textButton, onPress, loading, ButtonStyles }: Props) => {
  return (
    <ButtonContainer onPress={onPress} disabled={loading} activeOpacity={0.7} style={ButtonStyles}>
      {loading ? (
        <ActivityIndicator color="white" /> // Afficher l'indicateur de chargement si loading est true
      ) : (
        <ButtonText>{textButton}</ButtonText> // Afficher le texte du bouton si loading est false
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: #1e263b;
  padding: 13px 0px;
  border-radius: 8px;
  align-items: center;
  align-self: center;
  margin-top: 15px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default Button;