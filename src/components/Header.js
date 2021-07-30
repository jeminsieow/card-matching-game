import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  COLOR_BLUE,
  COLOR_WHITE,
  HEADER_HEIGHT,
  HEADER_WIDTH,
} from "../utilities/constants";

const HeaderContainer = styled.View`
  height: ${HEADER_HEIGHT}px;
  width: ${HEADER_WIDTH}px;
  padding-bottom: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const RestartButton = styled.Text`
  padding-left: 20px;
  padding-bottom: 5px;
  font-size: 20px;
  color: ${COLOR_BLUE};
`;

const StepsText = styled.Text`
  padding-right: 20px;
  font-size: 30px;
  color: ${COLOR_WHITE};
`;

const StepsNumber = styled.Text`
  font-size: 35px;
  color: ${COLOR_BLUE};
`;

export default function Header({ onPressResetGame, steps }) {
  return (
    <HeaderContainer>
      <TouchableOpacity onPress={onPressResetGame}>
        <RestartButton>Restart</RestartButton>
      </TouchableOpacity>
      <StepsText>
        STEPS: <StepsNumber>{steps}</StepsNumber>
      </StepsText>
    </HeaderContainer>
  );
}
