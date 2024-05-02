import React from 'react'
import { Text } from 'react-native'


interface Props {
    navigation: any;
    currentUserID: string;
  }

export default function Notification( { navigation, currentUserID }: Props) {
  return (
    <Text>Notification</Text>
  )
}
