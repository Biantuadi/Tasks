import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import Header from "./Header";
import TaskCard from "../../components/TaskCard";
import useFetchUsers from "../../hooks/userFetch";
import useFetchTasks from "../../hooks/taskFetch";
import { isEmpty } from "../../utils/base_utils";

type Props = {
  navigation: any; // Type de navigation
  currentUserID: any; // Type de user
};

export default function HomeScreen({ navigation, currentUserID }: Props) {
  const [activeEntity, setActiveEntity] = useState("Todo");
  const currentUser = useFetchUsers(currentUserID).currentUser;
  const allTasks:any = useFetchTasks();

  return (
    <SafeAreaView style={styles.container}>
      <Header activeEntity={activeEntity} currentUser={currentUser} setActiveEntity={setActiveEntity} />
      <FlatList
        data={!isEmpty(allTasks) && allTasks.filter((task:any) => {
          if (activeEntity === "Todo") return true;
          return task.status && task.status.toLowerCase() === activeEntity.toLowerCase();
        }) }
        renderItem={({ item }) => <TaskCard item={item} navigation={navigation} currentUserID={currentUserID} currentUser={currentUser} />}
        keyExtractor={(item, key) => key.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar 
      style="auto" 
      backgroundColor={"#fdfdfd"}
       />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F9",
  },
  flatListContent: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    paddingBottom: 30,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});
