// AuthMiddleware.tsx

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StackActions, useNavigation } from "@react-navigation/native";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const navigation = useNavigation();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirigez l'utilisateur vers l'écran de connexion s'il n'est pas authentifié
      navigation.dispatch(StackActions.replace("Login"));
    }
  }, [isAuthenticated, navigation]);

  return <>{children}</>;
};

export default AuthMiddleware;
