import React from "react";
import styled from 'styled-components'

const CardContainer = styled.TouchableOpacity`
  width: 95px;
  height: 140px;
  background-color: #1B98F2;
  border-radius: 10px;
  border-width: 3px;
  border-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const QuestionMark = styled.Text`
  font-size: 40px;
  color: #FFFFFF;
`;

export default function Card({ onPress, card, index, isInactive, isFlipped, isDisabled }) {
  const handlePress = () => {
    !isFlipped && !isDisabled && onPress(index);
  };

  return (
    <CardContainer onPress={handlePress}>
      <QuestionMark>?</QuestionMark>
    </CardContainer>
  );
}
