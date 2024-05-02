import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import styled from "styled-components/native";

interface Props {
  control: any;
  errors: any;
  placeholder: string;
  name: string;
  rules?: any;
  secureTextEntry?: boolean;
  icon?: React.ReactNode;
  isNotAuthStyle?: boolean;
  style?: any;
  inputStyle?: any;
  numberOfLines?: number;
}

const Input: React.FC<Props> = ({
  control,
  errors,
  placeholder,
  name,
  rules,
  secureTextEntry,
  icon,
  isNotAuthStyle,
  style,
  inputStyle,
  numberOfLines
}) => {
  return (
    <ContainerInput style={style}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ContainerIconAndInput>
            <InputField
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              multiline={numberOfLines ? true : false}
              style={{ 
                backgroundColor: isNotAuthStyle ? "transparent" : "#f5f5f5",
                borderWidth: 1,
                borderColor:  "#e5e5e5",
                ...inputStyle,
                
              }}
            />
            {icon && icon}
          </ContainerIconAndInput>
        )}
        name={name}
        rules={ rules && {
          required: `${placeholder} is required`,
          ...rules,
        }}
        defaultValue=""
      />
      {rules && errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </ContainerInput>
  );
};

const ContainerInput = styled.View`
  margin-bottom: 20px;
  align-items: center;
  align-self: center;
  width: 100%;
  position: relative;
`;

const InputField = styled.TextInput`
  width: 100%;
  padding: 13px 15px;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const ContainerIconAndInput = styled.View`
  width: 100%;
  position: relative;
  flex-direction: row;
  align-items: center;
`;

const ErrorMessage = styled.Text`
  align-self: flex-start;
  font-size: 14px;
  color: #d18d8d;
`;

export default Input;
