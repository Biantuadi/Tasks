import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import DateImage from "../../../../assets/mook/step2.png";

interface Props {
  onPrevious: () => void;
  onNext: () => void;
  onInputChange: (key: string, value: Date) => void;
}

const StepTwo: React.FC<Props> = ({ onPrevious, onNext, onInputChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const navigation = useNavigation();
  
  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate || null);
    onInputChange('date', currentDate || new Date());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <IconContainerBtn
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        {/* arro croix */}
        <Ionicons name="close" size={24} color="#1E263B" />
      </IconContainerBtn>

      <ContainerTitleText>
        <Title>
          Définissez le début
        </Title>
        <Title>
          Et la fin de votre task
        </Title>
      </ContainerTitleText>

      <View style={{ alignItems: "center" }}>
        <Image source={DateImage} style={{ width: 350, height: 350 }} />
      </View>

      <TouchableOpacity style={styles.selector} onPress={() => setShowDatePicker(true)}>
        <Text>{selectedDate ? selectedDate.toLocaleDateString() : "Entrez la date"}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={selectedDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.navButton} onPress={onPrevious}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, {backgroundColor: '#1e263b'}]} onPress={onNext}>
          <Text style={{color: '#fff'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const IconContainerBtn = styled.TouchableOpacity`
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const ContainerTitleText = styled.View`
  margin-bottom: 20px;
`;


const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selector: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 7,
    width: '80%', // Adjust width as needed
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 50,
    gap: 10,
  },

  navButton: {
    padding: 27,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? -20 : 0,
    paddingBottom: 20,
  }
});

export default StepTwo;
