import { TouchableOpacity, Platform } from "react-native";
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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../../redux/actions/taskAction";

type RootStackParamList = {
  ShowTask: { taskData: any }; // Assurez-vous que taskData est défini comme paramètre
};

type Props = {
  route: RouteProp<RootStackParamList, "ShowTask">;
  currentUserID: string;
};

export default function ShowTask({ route, currentUserID }: Props) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();


  const { taskData } = route.params;
  const { title, date, start, end, address, city, description, meetLink } = taskData;

  const { allUsers } = useFetchUsers();

  const currentUser = useFetchUsers(currentUserID).currentUser;

  const author = findAuthor(allUsers, taskData);

  const dateFormatted =
    !isEmpty(date) &&
    format(new Date(date), "EEEE, d MMMM", {
      locale: frLocale,
    } as any);

  const navigation = useNavigation();

  const authorDisplayName = (author: any): string => {
    if (author?.id === currentUserID) return "moi";
    if (author?.role.toLowerCase() === "pasteur")
      return `Pasteur ${author.firstname}`;
    return author?.firstname || "";
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteTaskAsync(taskData.id) as any);
    setShowDeleteConfirmation(false);
    navigation.goBack();
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <Container>
      <ContainerShowTask showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={25} color="black" />
          </TouchableOpacity>

          <ContainerActions>
            {(author?.id === currentUserID ||
              currentUser?.role.toLowerCase() === "pasteur") && (
              <>
                <TouchableOpacity onPress={() => console.log("update")}>
                  <EvilIcons name="pencil" size={37} color="#6366f1" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDeleteConfirmation(true)}>
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
              {!isEmpty(dateFormatted as any) ? dateFormatted : "Non renseigné"}
            </TextScheduleDate>
          </ContainerInfoDate>
          <TextSchedule>
            {!isEmpty(start) ? start : ""} - {!isEmpty(end) ? end : ""}
          </TextSchedule>
        </ContainerSchedule>

        {/* <ContainerLocation>
          <Ionicons name="location-outline" size={30} color="#30374b65" />
          <TextLocation>{capitalizeFirstLetter(`${address}`)}</TextLocation>
        </ContainerLocation> */}

        {/* <Separator />

        <ContainerLinkMeet>
          <ContainerInfoDate>
            <Ionicons name="videocam-outline" size={30} color="#30374b65" />
            <TextScheduleDate>Lien meet</TextScheduleDate>
          </ContainerInfoDate>
          <TextLinkMeet>{ meetLink ? capitalizeFirstLetter(`${meetLink}`): "Non renseigné"}</TextLinkMeet>
        </ContainerLinkMeet> */}

        <Separator />

        <ContainerDescription>
          <Ionicons name="document-text-outline" size={30} color="#30374b65" />
          <TextDescription>
            {description ? capitalizeFirstLetter(description) : "Non renseigné"}
          </TextDescription>
        </ContainerDescription>

        {/* <Separator /> */}

        {/* <ContainerReminder>
          <Ionicons name="notifications-outline" size={30} color="#30374b65" />
          <TextReminder>30 minutes avant</TextReminder>
        </ContainerReminder> */}

        <ContzinerInfoCreator>
          <TextCreator>Créé par</TextCreator>
          <TextName>{authorDisplayName(author)}</TextName>
          {author?.id && author?.id !== currentUserID && (
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
        onCancel={handleDeleteCancel}
        message="Êtes-vous sûr de vouloir supprimer ce task ?"
      />
    </Container>
  );
}

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

const TextSchedule = styled.Text`
  font-size: 16px;
  color: #30374bb6;
  margin-left: 40px;
  max-width: 95%;
`;

const ContainerLocation = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 25px;
`;

const TextLocation = styled.Text`
  font-size: 16px;
  color: #303552;
  font-weight: 500;
  max-width: 95%;
`;

const Separator = styled.View`
  border-bottom-color: #30374b1c;
  border-bottom-width: 1px;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const ContainerLinkMeet = styled.View`
  gap: -3px;
`;

const TextLinkMeet = styled.Text`
  font-size: 16px;
  color: #6366f1;
  margin-left: 40px;
  max-width: 95%;
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

const ContainerReminder = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const TextReminder = styled.Text`
  font-size: 16px;
  color: #30374b;
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
  /* font-weight: 500; */
  margin-left: 5px;
`;
