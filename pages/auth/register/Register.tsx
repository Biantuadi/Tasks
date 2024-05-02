import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import Logo from "../../../components/Logo";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HaveAccount from "../../../components/auth/HaveAccount";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import OtherWaySign from "../../../components/auth/OtherWaySign";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/actions/authActions";
import { Platform } from "react-native";

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // État de chargement
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();

  const onSubmit = async (data: any) => {
    setLoading(true); // Définir l'état de chargement sur true lors de la soumission du formulaire
    const { firstname, lastname, email, password } = data;
    await dispatch(registerUser(email, password, firstname, lastname) as never);
    setLoading(false); // 
  };

  return (
    <Container>
       <ContainerScroll showsVerticalScrollIndicator={false}>
       <Logo />
  
  <ContainerTexts>
    <TextTitle>Créer un compte</TextTitle>
    <TextDescription>
      Créez un compte pour accéder à votre espace personnel
    </TextDescription>
  </ContainerTexts>

  <FormulairContainer>
    <Input
      control={control}
      errors={errors}
      placeholder="Firstname"
      icon={ <AntDesign
        name="user"
        size={24}
        color="#B3B3B3"
        style={{ position: "absolute", top: 15, right: 15 }}
      />}
      name="firstname"
      rules={/^[A-Za-z]+$/}
    />
    <Input
      control={control}
      errors={errors}
      placeholder="Lastname"
      icon={ <AntDesign
        name="user"
        size={24}
        color="#B3B3B3"
        style={{ position: "absolute", top: 15, right: 15 }}
      />}
      name="lastname"
      rules={{ required: "Lastname is required" }}
    />
    <Input
      control={control}
      errors={errors}
      placeholder="Email"
      name="email"
      icon={ <AntDesign
        name="mail"
        size={24}
        color="#B3B3B3"
        style={{ position: "absolute", top: 15, right: 15 }}
      /> }
      rules={{
        required: "Email is required",
        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
      }}
    />
    <Input
      control={control}
      errors={errors}
      placeholder="Password"
      name="password"
      icon={ <EvilIcons
        name="lock"
        size={44}
        color="#B3B3B3"
        style={{ position: "absolute", top: 7, right: 5 }}
      />}
      rules={{
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must have at least 6 characters",
        },
      }}
      secureTextEntry={true}
    />
    <Button 
    textButton={"S'inscrire" }
    onPress={handleSubmit(onSubmit)}
      loading={loading} 
    />
  </FormulairContainer>

  <OtherWaySign
    title="register"
    onPress={() => navigation.navigate("Home" as never)}
  />

  <HaveAccount
    textTitle="Vous avez déjà un compte ?"
    navigateTo="Login"
    textButton="Se connecter"
  />
       </ContainerScroll>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fdfdfd;
  padding-top: ${Platform.OS === "android" ? "10px" : "20px"};
  padding-bottom: 20px;
  `;

const ContainerScroll = styled.ScrollView`
padding-left: 20px;
padding-right: 20px;
  flex: 1;
  width: 100%;
  gap: 20px;
`;

const ContainerTexts = styled.View`
  width: 100%;
  margin-bottom: 20px;
  gap: 10px;
  margin-top: 40px;
`;

const TextTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #000;
`;

const TextDescription = styled.Text`
  font-size: 16px;
  color: #000;
  margin-bottom: 20px;
  max-width: 77%;
`;

const FormulairContainer = styled.View`
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default Register;
