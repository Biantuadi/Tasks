import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from './Button';

const CustomAlert = ({ visible, onConfirm, onCancel, message }: any) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  }


  return (
    <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <Button textButton="Annuler" onPress={onCancel} ButtonStyles={styles.buttonCancel} textStyles={styles.textStyle} />
            <Button textButton={loading ? "" : "Confirmer"} onPress={handleConfirm} ButtonStyles={styles.buttonConfirm} textStyles={styles.textStyle} loading={loading} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  // button: {
  //   borderRadius: 7,
  //   padding: 10,
  //   elevation: 2,
  //   marginHorizontal: 12,
  //   width: 100,
  // },
  buttonCancel: {
    backgroundColor: "#1E263B",
    borderRadius: 7,
    padding: 10,
    elevation: 2,
    marginHorizontal: 12,
    width: 100,
  },
  buttonConfirm: {
    backgroundColor: "#6366f1",
    borderRadius: 7,
    padding: 10,
    elevation: 2,
    marginHorizontal: 12,
    width: 100,
   
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default CustomAlert;
