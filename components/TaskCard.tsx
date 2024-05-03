import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import CircleAvatar from "./CircleAvatar";
import capitalizeFirstLetter, {
  ellipsisText,
  findAuthor,
  isEmpty,
  showMessage,
} from "../utils/base_utils";
import useFetchUsers from "../hooks/userFetch";
import CustomAlert from "./CustomAlert";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../redux/actions/taskAction";

export default function TaskCard({
  item,
  navigation,
  currentUserID,
  currentUser,
}: any) {
  const dispatch = useDispatch();
  const { allUsers } = useFetchUsers();

  const author = findAuthor(allUsers, item);

  const handleCardPress = () => {
    navigation.navigate("ShowTask", { taskData: item });
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleCardLongPress = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteTaskAsync(item.id) as any);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const isAuthor = item.creator_id === currentUserID;

  return (
    <>
      <CardTask
        activeOpacity={0.7}
        onPress={handleCardPress}
        onLongPress={
          isAuthor || currentUser?.role.toLowerCase() === "pasteur"
            ? handleCardLongPress
            : () =>
                showMessage("Vous n'êtes pas autorisé à supprimer ce task")
        }
      >
        <BadgeAndType>
          <BadgeContainer>
            <BadgeText>{capitalizeFirstLetter(item.status)}</BadgeText>
          </BadgeContainer>
          <TypeText>
            {item.type && item.type !== null
              ? capitalizeFirstLetter(item.type)
              : "Type"}
          </TypeText>
        </BadgeAndType>
        <ContainerTitle>
          <Title>{ellipsisText(item.title, 19)}</Title>
          <SubTitle>{`${item.start} - ${item.end}`}</SubTitle>
        </ContainerTitle>

        <Footer>
          <ContainerInfo>
            {!isEmpty(author) && author?.avatar && (
              <CircleAvatar
                image={author.avatar}
                style={{ width: 22, height: 22 }}
              />
            )}
            {!isEmpty(author) && author?.firstname && author?.id && (
              <TextInfo>
                {author?.id === currentUserID
                  ? "Créé par vous"
                  : author?.role.toLowerCase() === "pasteur"
                  ? "Créé par le pasteur"
                  : `Créé par ${author.firstname}`}
              </TextInfo>
            )}
          </ContainerInfo>
          <Ionicons name="eye" size={22} color="#1E263B" />
        </Footer>
      </CardTask>

      <CustomAlert
        visible={showDeleteConfirmation}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        message="Êtes-vous sûr de vouloir supprimer ce task ?"
      />
    </>
  );
}

const CardTask = styled.TouchableOpacity`
  flex: 1;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const BadgeContainer = styled.View`
  background-color: #000;
  border-radius: 20px;
  padding: 3px 8px;
`;

const BadgeText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

const ContainerTitle = styled.View`
  margin-top: 10px;
  gap: 6px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #30374b;
  font-weight: bold;
  margin-top: 10px;
  max-width: 80%;
`;

const SubTitle = styled.Text`
  font-size: 13px;
  color: #a0a3bd;
`;

const BadgeAndType = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TypeText = styled.Text`
  font-size: 10px;
  color: #a0a3bd;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ContainerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const TextInfo = styled.Text`
  font-size: 9px;
  color: #30374b;
`;
