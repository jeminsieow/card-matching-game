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
  isCleared,
  isFlipped,
}) {
  const handlePress = () => {
    if (!isCleared && !isDisabled) {
      onPress(index);
    }
  };

  if (isFlipped) {
    return (
      <CardContainer onPress={handlePress} disabled={isDisabled}>
        <QuestionMark>{card}</QuestionMark>
      </CardContainer>
    );
  } else if (isCleared) {
    return (
      <CardContainer disabled={true}>
        <QuestionMark>{card}</QuestionMark>
      </CardContainer>
    );
  } else {
    return (
      <CardContainer onPress={handlePress}>
        <QuestionMark>?</QuestionMark>
      </CardContainer>
    );
  }
}
