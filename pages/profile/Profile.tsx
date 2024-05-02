import React, { useState } from "react";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import useFetchUsers from "../../hooks/userFetch";
import { isEmpty } from "../../utils/base_utils";
import Button from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import CustomAlert from "../../components/CustomAlert";
import HeaderProfile from "./widgets/HeaderProfile";

interface Props {
  navigation: any;
  currentUserID: string;
}

const Profile = ({ navigation, currentUserID }: Props) => {
  const { currentUser } = useFetchUsers(currentUserID);
  const dispatch = useDispatch();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    // Affichez l'alerte personnalisée
    setShowLogoutConfirmation(true);
  };

  const confirmLogout =async () => {
    await dispatch(logoutUser() as never);
    setShowLogoutConfirmation(false); // Fermez l'alerte après la confirmation
  };

  return (
    <Container>
      <StatusBar style="auto" backgroundColor={"#F5F7F9"} />
      <HeaderProfile currentUser={currentUser} />
      <ProfileInfo>
        <ProfileName>
          {!isEmpty(currentUser) &&
            currentUser?.firstname + " " + currentUser?.lastname}
        </ProfileName>
        <ProfileRole>
          {!isEmpty(currentUser) && currentUser.role}
        </ProfileRole>
        <Button
          textButton="Modifier"
          onPress={() => {}}
          ButtonStyles={styles.button}
        />
      </ProfileInfo>

      <MainSection>
        <ProfileItem>
          <Ionicons name="mail" size={24} color="#30374be4" />
          <ProfileItemText>
            {!isEmpty(currentUser) && currentUser?.email}
          </ProfileItemText>
        </ProfileItem>

        <ProfileItem>
          <Ionicons name="call" size={24} color="#30374be4" />
          <ProfileItemText>
            {!isEmpty(currentUser) && currentUser?.phone || "Non renseigné"}
          </ProfileItemText>
        </ProfileItem>

        <ProfileItem>
          <Ionicons name="calendar" size={24} color="#30374be4" />
          <ProfileItemText>
            Mes rendez-vous
          </ProfileItemText>
        </ProfileItem>

        <ProfileItem>
          <Ionicons name="location" size={24} color="#30374be4" />
          <ProfileItemText>
            {!isEmpty(currentUser) && currentUser?.address || "Non renseigné"}
          </ProfileItemText>
        </ProfileItem>

        <ProfileItem onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#30374be4" />
          <ProfileItemText>Déconnexion</ProfileItemText>
        </ProfileItem>
      </MainSection>

      <CustomAlert
        visible={showLogoutConfirmation}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirmation(false)}
        message="Voulez-vous vraiment vous déconnecter ?"
      />

      
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background: #fdfdfd;
`;

const ProfileInfo = styled.View`
  margin-top: 75px;
  align-items: center;
`;

const ProfileName = styled.Text`
  font-size: 18px;
  color: #30374b;
  font-weight: bold;
  text-align: center;
`;

const ProfileRole = styled.Text`
  font-size: 16px;
  color: #30374b;
  margin-top: 5px;
  text-align: center;
`;

const MainSection = styled.View`
  margin-top: 20px;
  gap: 1px;
`;

const ProfileItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
`;

const ProfileItemText = styled.Text`
  font-size: 18px;
  color: #30374b;
  margin-left: 10px;
`;

const styles = {
  button: {
    width: "80%",
    backgroundColor: "#1e263b",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

export default Profile;
