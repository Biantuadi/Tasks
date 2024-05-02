import { Platform } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import CircleAvatar from "../../../components/CircleAvatar";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
    currentUser: any;
}

export default function Header( { currentUser }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <HeaderContainer>
      <TopHeader>
        <IconContainerBtn
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#1E263B" />
        </IconContainerBtn>

        <TextTitle>
          Profile
        </TextTitle>

        <ContainerLogoNotification>
          {/* <IconContainer
            onPress={() => console.log("Notification")}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={22} color="#1E263B" />
            <ContainerNotifs>
             <TextNotification>3+</TextNotification>
           </ContainerNotifs>
          </IconContainer> */}
        </ContainerLogoNotification>
      </TopHeader>

      <>
        <ContainerAvatar>
          <CircleAvatar image={currentUser.avatar} />
        </ContainerAvatar>
      </>

     
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  padding-top: ${Platform.OS === "android" ? "50px" : "20px"};
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  gap: 20px;
  background: #f5f7f9;
  padding-bottom: 20px;
  height: 24%;
  position: relative;

`;

const TopHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

`;

const ContainerLogoNotification = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const TextTitle = styled.Text`
  font-size: 20px;
  color: #30374b;
  font-weight: bold;

`;

const IconContainerBtn = styled.TouchableOpacity`
`;

const ContainerAvatar = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 47%;
  right: 0;
  bottom: -15px;
  width: 50px;
    height: 50px;
  
  border-radius: 25px;
  transform: scale(3);
  padding: 5px;
    background-color: #FDFDFD;

`;

