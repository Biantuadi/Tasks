import React from 'react'
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export default function OldNotificationHeader() {
  return (
    <IconContainer
            onPress={() => console.log("Notification")}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={22} color="#1E263B" />
           <ContainerNotifs>
             <TextNotification>3+</TextNotification>
           </ContainerNotifs>
          </IconContainer>
  )
}

const ContainerLogoNotification = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const IconContainer = styled.TouchableOpacity`
  border-radius: 50px;
  height: 43px;
  width: 43px;
  justify-content: center;
  align-items: center;
  border: 1px solid #c2c6d1;
`;

const TextNotification = styled.Text`
  color: #fff;
  font-size: 10px;
`;

const ContainerNotifs = styled.View`
  background-color: #ff6b6b;
  position: absolute;
  border-radius: 50px;
  padding: 0 5px;
  top: -4px;
  right: -3px;
  justify-content: center;
  align-items: center;
`;