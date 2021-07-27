import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styled from "styled-components/native";
import { COLOR_DARK_GREY } from './utilities/constants';

const Container = styled.View`
  flex: 1;
  background-color: #39353C;
  padding: 20px;
`;

const Header = styled.View`
  padding-top: 50px;
  flex-direction: row;
  justify-content: space-between;
`;

const RestartButton = styled.Text`
  font-size: 20px;
  color: #1B98F2;
`;

const StepsText = styled.Text`
  font-size: 35px;
  color: white;
`;

export default function Main() {
  return (
    <Container>
      <Header>
        <RestartButton>Restart</RestartButton>
        <StepsText>STEPS:</StepsText>
      </Header>
      
      <StatusBar style="auto" />
    </Container>
  );
}
