import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #39353c;
  padding: 20px;
`;

const Header = styled.View`
  padding-top: 50px;
  flex-direction: row;
  justify-content: space-between;
`;

const RestartButton = styled.Text`
  font-size: 20px;
  color: #1b98f2;
`;

const StepsText = styled.Text`
  font-size: 35px;
  color: white;
`;

const CARD_PAIRS_VALUE = [1, 2, 3, 4, 5, 6];

// Fisher-Yates shuffle algorithm
function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  console.log(array);
  return array;
}

export default function Main() {
  const [cards, setCards] = useState(
    shuffleCards.bind(null, CARD_PAIRS_VALUE.concat(CARD_PAIRS_VALUE))
  );

  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={() =>
            setCards(
              shuffleCards.bind(null, CARD_PAIRS_VALUE.concat(CARD_PAIRS_VALUE))
            )
          }
        >
          <RestartButton>Restart</RestartButton>
        </TouchableOpacity>
        <StepsText>STEPS:</StepsText>
      </Header>

      {cards.map((card, i) => {
        return <Text key={i}>{card}</Text>;
      })}

      <StatusBar style="auto" />
    </Container>
  );
}
