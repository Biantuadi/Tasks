import React, { useState, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import StepOne from "./steps/StepOne";
import StepThree from "./steps/StepThree";
import StepTwo from "./steps/StepTwo";
import { Task } from "../../../interfaces/main_interface";
import styled from "styled-components/native";


interface Props {
  currentUserID: string;
}

const CreateTask: React.FC<Props> = ({ currentUserID }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const pagerViewRef = useRef<any>(null);

  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    dueDate: "",
    creator_id: currentUserID,
    status: "Todo",
    priority: "Medium",
    assignee_id: "",
  });

  const handleTaskChange = (key: keyof Task, value: string) => {
    setTask((prevTask) => ({ ...prevTask, [key]: value }));
  };

  const isDateValid = () => {
    const now = new Date();
    const selectedDate = new Date(task.dueDate);
    return selectedDate >= now;
  };
  
  const nextPage = () => {
    const { title, dueDate } = task;
    if (title.trim() === "") {
      alert("Veuillez renseigner un titre avant de continuer.");
    } else if (currentStep === 1 && dueDate === "") {
      alert("Veuillez renseigner une dueDate et une heure de début avant de continuer.");
    } else if (currentStep === 1 && !isDateValid()) {
      alert("La dueDate doit être supérieure ou égale à la dueDate actuelle.");
    } else {
      const nextPage = currentStep + 1;
      setCurrentStep(nextPage);
      pagerViewRef.current?.setPage(nextPage);
    }
  };
  
  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentStep(e.nativeEvent.position)}
        scrollEnabled={false}
      >
        <ContainerStep key="1">
          <StepOne
            onNext={nextPage}
            onInputChange={handleTaskChange as any}
            task={task}
          />
        </ContainerStep>
        <ContainerStep key="2">
          <StepTwo
            onPrevious={() => {
              setCurrentStep((prevStep) => prevStep - 1);
              pagerViewRef.current?.setPage(currentStep - 1);
            }}
            onNext={nextPage}
            onInputChange={handleTaskChange as any}
          />
        </ContainerStep>
        <ContainerStep key="3">
          <StepThree
            onPrevious={() => {
              setCurrentStep((prevStep) => prevStep - 1);
              pagerViewRef.current?.setPage(currentStep - 1);
            }}
            onInputChange={handleTaskChange as any}
            task={task}
            currentUserID={currentUserID}
          />
        </ContainerStep>
      </PagerView>
      <PageIndicators currentStep={currentStep} />
    </View>
  );
};

const PageIndicators = ({ currentStep }: { currentStep: number }) => (
  <View style={styles.indicatorsContainer}>
    {[...Array(3)].map((_, i) => (
      <View
        key={i}
        style={[styles.dot, currentStep === i && styles.activeDot]}
      />
    ))}
  </View>
);

const ContainerStep = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: ${Platform.OS === "android" ? "40px" : "20px"};
  padding-bottom: 20px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pagerView: {
    flex: 1,
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "#bbb",
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
});

export default CreateTask;
