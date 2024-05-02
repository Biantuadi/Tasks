import { Platform } from "react-native";
import CircleAvatar from "../../components/CircleAvatar";
import styled from "styled-components/native";
import { isEmpty, today } from "../../utils/base_utils";
import { formatDate } from "../../utils/base_utils";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  activeEntity: string;
  setActiveEntity: (status: string) => void;
  currentUser: any;
}

export default function Header({
  activeEntity,
  setActiveEntity,
  currentUser,
}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <HeaderContainer>
      <TopHeader>
        <ContainerAvatar>
          {!isEmpty(currentUser) && <CircleAvatar image={currentUser.avatar} />}
          <ContainerText>
            <TextTitle>
              Hello,{" "}
              {!isEmpty(currentUser) &&
              currentUser.role &&
              currentUser.role.toLowerCase() === "pasteur"
                ? "Pasteur"
                : currentUser?.firstname}
            </TextTitle>
            <TextSubtitle>{formatDate(today)}</TextSubtitle>
          </ContainerText>
        </ContainerAvatar>

        <Button
          textButton="+"
          onPress={() => navigation.navigate("createTask" as never)}
          textStyles={{
            fontSize: 16,
            color: "#fff",
            fontWeight: "bold",
          }}
          ButtonStyles={{
            backgroundColor: "#6366f1",
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: 8,
            alignItems: "center",
            alignSelf: "center",
            marginTop: 0,
            width: 40,
            height: 40,
            justifyContent: "center",
          }}
        />
      </TopHeader>

      <ContainerTitleBody>
        <Title>Synthèse de vos</Title>
        <ContainerSubtitle>
          <Title>tasks</Title>
          <TextSubtitle style={{ marginTop: 10 }}> (12) </TextSubtitle>
        </ContainerSubtitle>
      </ContainerTitleBody>

      <ContainerEntity>
        {["Todo", "Doing", "Done"].map((status) => (
          <EntityButton
            key={status}
            activeOpacity={0.7}
            onPress={() => setActiveEntity(status)}
          >
            <EntityContainer
              style={{
                backgroundColor:
                  activeEntity === status ? "#fff" : "transparent",
              }}
            >
              <EntityTitle
                style={{
                  color: activeEntity === status ? "#30374b" : "#a0a3bd",
                }}
              >
                {status}
              </EntityTitle>
            </EntityContainer>
          </EntityButton>
        ))}
      </ContainerEntity>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  padding-top: ${Platform.OS === "android" ? "50px" : "20px"};
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  gap: 20px;
  background: #fff;
  padding-bottom: 20px;
`;

const TopHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContainerAvatar = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const ContainerText = styled.View`
  justify-content: center;
`;

const TextTitle = styled.Text`
  font-size: 18px;
  color: #30374b;
  font-weight: bold;
`;

const TextSubtitle = styled.Text`
  font-size: 14px;
  color: #a0a3bd;
`;

const ContainerTitleBody = styled.View`
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 600;
  color: #30374b;
`;

const ContainerSubtitle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

const ContainerEntity = styled.View`
  flex-direction: row;
  background-color: #f5f7f9;
  border-radius: 30px;
  padding: 8px;
`;

const EntityButton = styled.TouchableOpacity``;

const EntityTitle = styled.Text`
  font-weight: 500;
`;

const EntityContainer = styled.View`
  padding: 7px 18px;
  border-radius: 15px;
`;
