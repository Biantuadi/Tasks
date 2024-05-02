import React from "react";
import { Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import styled from "styled-components/native";

const SelectInput = ({ control, name, label, options, rules }: any) => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        rules={rules} // Passer les règles comme une seule prop
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onValueChange={(value: any) => onChange(value)}
            items={options.map((option: any) => ({
              label: option,
              value: option,
            }))}
            value={value}
          />
        )}
      />
    </Container>
  );
};


const Container = styled.View`
  /* height: 16px; */
  /* flex: .8; */
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
`;


export default SelectInput;
