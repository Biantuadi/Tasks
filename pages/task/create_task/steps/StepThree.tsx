import React, { useState } from "react";
import { View, Image, StyleSheet, Platform, Text } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Done from "../../../../assets/mook/done.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import { useDispatch } from "react-redux";
import { Task } from "../../../../interfaces/main_interface";
import { addTaskAsync } from "../../../../redux/actions/taskAction";
import { Picker } from "@react-native-picker/picker";
import { useFetchGroups } from "../../../../hooks/userFetch";
import { isEmpty } from "../../../../utils/base_utils";

interface Props {
  onPrevious: () => void;
  onInputChange: (key: string, value: string) => void;
  task: Task; // Type approprié pour votre task
  currentUserID: string;
}

const StepThree: React.FC<Props> = ({ onPrevious, onInputChange, task, currentUserID }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const myGroup = useFetchGroups(currentUserID);

  const dispatch = useDispatch();

  const handleCreateTask = async () => {
    setLoading(true);

    // Traitement des données pour créer le task
    const formattedTask: Task = formatTaskData(task, currentUserID);

    try {
      await dispatch(addTaskAsync(formattedTask) as any);
      setLoading(false);
      navigation.navigate("Home" as never);
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    }
  };

  const formatTaskData = (task: Task, currentUserID: string): Task => {
    const formattedDate = task.dueDate.toISOString().split("T")[0];
   

    return {
      ...task,
      dueDate: formattedDate,
      creator_id: currentUserID,
    };
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Bouton de retour */}
      <IconContainerBtn onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Ionicons name="close" size={24} color="#1E263B" />
      </IconContainerBtn>

      {/* Titre */}
      <ContainerTitleText>
        <Title>Définir les informations supplémentaires</Title>
      </ContainerTitleText>

      {/* Image */}
      <View style={{ alignItems: "center" }}>
        <Image source={Done} style={{ width: 300, height: 300 }} />
      </View>

      <Text>
        Assigné à
      </Text>
    <View style={pickerContainerStyle as any}>
        <Picker
          selectedValue={
            task.assignee_id === currentUserID ? currentUserID : task.assignee_id
          }
          onValueChange={(itemValue, itemIndex) =>
            onInputChange("assignee_id", itemValue as string)
          }
          style={pickerStyle}
        >
          {!isEmpty(myGroup) && myGroup?.members.map((member: any) => (
            <Picker.Item
              key={member._id}
              label={member._id === currentUserID ? "Moi" : member.firstname + " " + member.lastname}
              value={member._id }
            />
          ))}
        </Picker>
      </View>


      {/* Boutons */}
      <ContainerButtons>
        <ButtonStyled onPress={onPrevious}>
          <ButtonText>Previous</ButtonText>
        </ButtonStyled>

        <Button
          textButton={loading ? "" : "Create Task"}
          onPress={handleCreateTask}
          loading={loading}
          ButtonStyles={{ backgroundColor: '#1E263B', padding: 10, borderRadius: 5 }}
        />
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

const ContainerTitleText = styled.View`
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const TextInputStyled = styled.TextInput`
  padding: 10px 27px;
  border-radius: 10px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  width: 80%;
`;

const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 20px;
`;

const ButtonStyled = styled.TouchableOpacity`
  /* background-color: #EFEFEF; */
  padding: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #1E263B;
`;

const pickerContainerStyle = {
  backgroundColor: "#f5f5f5",
  borderRadius: 10,
  overflow: "hidden",
  marginTop: 20,
  height: Platform.select({
    ios: 160,
    android: 50,
  }),
};

const pickerStyle = {
  color: "black", 
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? -20 : 0,
    paddingBottom: 20,
  }
});

export default StepThree;
