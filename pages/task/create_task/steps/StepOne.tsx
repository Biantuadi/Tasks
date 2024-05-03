import React from "react";
import { View, Image, StyleSheet, Platform, Alert, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import FirstOne from "../../../../assets/mook/firstOne.png";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  onNext: () => void;
  onInputChange: (key: string, value: string) => void;
  task: any; // Définissez un type approprié pour votre task
}

const StepOne: React.FC<Props> = ({ onNext, onInputChange, task }) => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.safeArea}>
       <IconContainerBtn
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          {/* arro croix */}
          <Ionicons name="close" size={24} color="#1E263B" />
        </IconContainerBtn>
      <ContainerTitleText>
        <Title>Entrer les informations</Title>
        <Title>de votre task</Title>
      </ContainerTitleText>

      <View style={{ alignItems: "center" }}>
        <Image source={FirstOne} style={{ width: 300, height: 300 }} />
      </View>

      <TextInputStyled
        value={task.title}
        onChangeText={(text) => onInputChange("title", text)}
        placeholder="Titre"
      />

      

      <TextAreaDesc
        multiline
        numberOfLines={4}
        value={task.description}
        style={{ textAlignVertical: "top" }}
        onChangeText={(text) => onInputChange("description", text)}
        placeholder="Description"
      />

      <ContainerButtons>
      <TouchableOpacity style={[styles.navButton, {backgroundColor: '#1e263b'}]} onPress={onNext}>
          <Text style={{color: '#fff'}}>Next</Text>
        </TouchableOpacity>
      </ContainerButtons>
    </SafeAreaView>
  );
};

const IconContainerBtn = styled.TouchableOpacity`
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const ContainerTitleText = styled.View`
  margin-bottom: 20px;
`;

const ContainerButtons = styled.View`
  margin-top: 30px;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`;

const TextInputStyled = styled.TextInput`
  padding: 13px 15px;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const TextAreaDesc = styled.TextInput`
  height: 100px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
  font-size: 16px;
  color: #333;
`;



const styles = StyleSheet.create({

  navButton: {
    
    padding: 27,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? -20 : 0,
    paddingBottom: 20,
  }
});

export default StepOne;
