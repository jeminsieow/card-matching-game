import React from "react";
import styled from "styled-components";

const CardContainer = styled.TouchableOpacity`
  width: 95px;
  height: 140px;
  background-color: #1b98f2;
  border-radius: 10px;
  border-width: 3px;
  border-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const QuestionMark = styled.Text`
  font-size: 40px;
  color: #ffffff;
`;

export default function Card({
  onPress,
  card,
  index,
  isDisabled,
  isInactive,
  isFlipped,
}) {
  const handlePress = () => {
    !isFlipped && !isDisabled && onPress(index);
  };

  return !isInactive ? (
    <CardContainer onPress={handlePress}>
      <QuestionMark>?</QuestionMark>
      <QuestionMark>{card}</QuestionMark>
    </CardContainer>
  ) : (
    <CardContainer onPress={handlePress}>
      <QuestionMark>flipped</QuestionMark>
      <QuestionMark>{card}</QuestionMark>
    </CardContainer>
  );
}
