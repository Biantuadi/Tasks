import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import { format } from "date-fns";
import {  today } from "../../utils/base_utils";
import { calandar_theme } from "../../themes/calandar_theme";
import useFetchTasks from "../../hooks/taskFetch";
import { StatusBar } from "expo-status-bar";
import frLocale from "date-fns/locale/fr";

interface CalendarProps {
  navigation: any;
  currentUserID: any;
}

const Calendar: React.FC<CalendarProps> = ({ navigation, currentUserID }) => {
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const allTasks = useFetchTasks() || [];


  const handleCardPress = (task: any) => {
    navigation.navigate("ShowTask", { taskData: task });
  };

  const renderEvents = (date: string) => {
    // Convertir la date au format Date
    const selectedDate = new Date(date);
  
    // Formater la date au format "Jour Date" (par exemple, "Monday 20") en français
    const formattedDate = format(selectedDate, "eeee d", {
      locale: frLocale,
    } as any);
  
    // Filtrer les événements en fonction de la date sélectionnée
    const filteredTaskForDate: any[] = allTasks.filter(
      (task: any) => task.date === date
    );
  
    // Trier les tasks par heure de début
    filteredTaskForDate.sort((a, b) => {
      // Convertir l'heure de début en objets Date
      const startTimeA = new Date(`2000-01-01T${a.start}`);
      const startTimeB = new Date(`2000-01-01T${b.start}`);
  
      // Comparer les heures de début
      return startTimeA.getTime() - startTimeB.getTime();
    });
  
    return (
      <>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20 }}>
          {formattedDate}
        </Text>
  
        {filteredTaskForDate.length === 0 ? (
          <Text style={styles.noEventsText}>No events for this day</Text>
        ) : (
          filteredTaskForDate.map((task: any, key: number) => (
            <TouchableOpacity
              key={key}
              style={styles.task}
              onPress={() => handleCardPress(task)}
              activeOpacity={0.6}
            >
              <Text style={styles.eventTitle}>{task.title}</Text>
              <Text>
                {task.start} - {task.end}
              </Text>
              <Text>{task.creator_name}</Text>
            </TouchableOpacity>
          ))
        )}
      </>
    );
  };
  

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <RNCalendar
        style={{ paddingTop: Platform.OS === "android" ? 50 : 20 }}
        markedDates={{
          [today]: {
            selected: true,
            selectedColor: "#6366f1",
            textColor: "#1E263B",
          },
          [selectedDate]: { selected: true, selectedColor: "#c2c6ca" },
          ...allTasks.reduce(
            (
              acc: Record<string, { marked: boolean; dotColor: string }>,
              task: any
            ) => {
              if (!acc[task.date]) {
                acc[task.date] = { marked: true, dotColor: "#6366f1" };
              }
              return acc;
            },
            {}
          ),
        }}
        theme={calandar_theme}
        onDayPress={onDayPress}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderEvents(selectedDate)}
      </ScrollView>
      <StatusBar style="auto" backgroundColor={"#fdfdfd"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fdfdfd",
    paddingTop: 25,
  },
  task: {
    backgroundColor: "#d8d1ff2d",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  eventTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  noEventsText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

export default Calendar;
