import React, { useState } from "react";
import {
  TouchableOpacity,
  Platform,
  View,
  Modal,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import frLocale from "date-fns/locale/fr";
import { format } from "date-fns";
import useFetchUsers from "../../hooks/userFetch";
import capitalizeFirstLetter, {
  findAuthor,
  isEmpty,
} from "../../utils/base_utils";
import CircleAvatar from "../../components/CircleAvatar";
import styled from "styled-components/native";
import CustomAlert from "../../components/CustomAlert";
import { useDispatch } from "react-redux";
import {
  deleteTaskAsync,
  updateTaskAsync,
} from "../../redux/actions/taskAction";
import { Picker } from "@react-native-picker/picker";

type RootStackParamList = {
  ShowTask: { taskData: any };
};

type Props = {
  route: RouteProp<RootStackParamList, "ShowTask">;
  currentUserID: string;
};

const ShowTask: React.FC<Props> = ({ route, currentUserID }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [taskData, setTaskData] = useState(route.params.taskData);

  const { title, dueDate, description, status } = taskData;
  const { allUsers } = useFetchUsers();
  // const currentUser = useFetchUsers(currentUserID).currentUser;
  const author = findAuthor(allUsers, taskData);

  const dateFormatted: any =
    !isEmpty(dueDate) &&
    format(new Date(dueDate), "EEEE, d MMMM", { locale: frLocale });

  const navigation = useNavigation();

  const authorDisplayName = (author: any): string => {
    return author?._id === currentUserID ? "moi" : author?.firstname || "";
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteTaskAsync(taskData._id) as any);
    setShowDeleteConfirmation(false);
    navigation.goBack();
  };

  const onInputChange = async (key: string, value: string) => {
    setLoading(true);
    const updatedTaskData = {
      ...taskData,
      [key]: value,
    };

    setTaskData(updatedTaskData);
    await dispatch(updateTaskAsync(updatedTaskData) as any);
    setLoading(false);
  };

  return (
    <Container>
      <ContainerShowTask showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={25} color="black" />
          </TouchableOpacity>

          <ContainerActions>
            {author?._id === currentUserID && (
              <>
                <TouchableOpacity onPress={() => console.log("change status")}>
                  <EvilIcons name="pencil" size={37} color="#6366f1" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowDeleteConfirmation(true)}
                >
                  <EvilIcons name="trash" size={37} color="#000" />
                </TouchableOpacity>
              </>
            )}
          </ContainerActions>
        </HeaderContainer>

        <Title
          style={{
            borderLeftWidth: 3,
            borderLeftColor: "#6366f1",
            paddingLeft: 10,
          }}
        >
          {capitalizeFirstLetter(title)}
        </Title>

        <ContainerSchedule>
          <ContainerInfoDate>
            <Ionicons name="time-outline" size={30} color="#30374b65" />
            <TextScheduleDate>
              {!isEmpty(dateFormatted) ? dateFormatted : "Non renseigné"}
            </TextScheduleDate>
          </ContainerInfoDate>
        </ContainerSchedule>

        <Separator />

        <ContainerDescription>
          <Ionicons name="document-text-outline" size={30} color="#30374b65" />
          <TextDescription>
            {description ? capitalizeFirstLetter(description) : "Non renseigné"}
          </TextDescription>
        </ContainerDescription>

        <View style={pickerContainerStyle as any}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) =>
              onInputChange("status", itemValue)
            }
            style={pickerStyle}
          >
            <Picker.Item label="Todo 🚫" value={"Todo"} />
            <Picker.Item label="Doing 🔄" value={"Doing"} />
            <Picker.Item label="Done ✅ " value={"Done"} />
          </Picker>
        </View>

        <ContzinerInfoCreator>
          <TextCreator>Créé par</TextCreator>
          <TextName>{authorDisplayName(author)}</TextName>
          {author?._id && author?._id !== currentUserID && (
            <CircleAvatar
              image={author?.avatar}
              style={{ transform: [{ scale: 0.6 }] }}
            />
          )}
        </ContzinerInfoCreator>
        <StatusBar style="auto" backgroundColor={"#fdfdfd"} />
      </ContainerShowTask>
      <CustomAlert
        visible={showDeleteConfirmation}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirmation(false)}
        message="Êtes-vous sûr de vouloir supprimer ce task ?"
      />

      <Modal transparent={true} animationType="none" visible={loading}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color={"#fff"} />
          <Text style={{ color: "#fff" }}>Veuillez patienter...</Text>
        </View>
      </Modal>
    </Container>
  );
};

export default ShowTask;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fdfdfd;
  padding-top: ${Platform.OS === "android" ? "50px" : "20px"};
`;

const ContainerShowTask = styled.ScrollView`
  flex: 1;
  background-color: #fdfdfd;
  padding-left: 20px;
  padding-right: 20px;
  gap: 20px;
  padding-top: 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContainerActions = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: #30374b;
  margin-top: 35px;
  vertical-align: middle;
  border-radius: 5px;
`;

const ContainerSchedule = styled.View`
  margin-top: 50px;
  gap: -3px;
`;

const ContainerInfoDate = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const TextScheduleDate = styled.Text`
  font-size: 16px;
  color: #30374b;
  font-weight: 500;
  margin-top: -5px;
  max-width: 95%;
`;

const Separator = styled.View`
  border-bottom-color: #30374b1c;
  border-bottom-width: 1px;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const ContainerDescription = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;
  max-width: 95%;
`;

const TextDescription = styled.Text`
  font-size: 13px;
  max-width: 90%;
  color: #30374bb6;
  margin-top: -5px;
  font-weight: 500;
`;

const ContzinerInfoCreator = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
  width: 100%;
`;

const TextCreator = styled.Text`
  font-size: 14px;
  color: #30374b80;
`;

const TextName = styled.Text`
  font-size: 14px;
  color: #6365f1a4;
  margin-left: 5px;
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
  modalBackground: {
    flex: 1,
    alignItems: "center",

    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#0000006f", // Couleur de fond semi-transparente
  },
});
