import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Card } from "./components";

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
  padding-left: 20px;
  font-size: 20px;
  color: #1b98f2;
`;

const StepsText = styled.Text`
  font-size: 35px;
  color: white;
`;

const CardTable = styled.View`
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
`;

const CardContainer = styled.View`
  padding: 5px;
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

const handleCardPress = (index) => {
  // We will handle it later
  console.log("pressed");
};

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

      <CardTable>
        {cards.map((card, index) => {
          // return <Text key={index}>{card}</Text>;
          return (
            <CardContainer key={index}>
              <Card onPress={handleCardPress} />
            </CardContainer>
          );
        })}
      </CardTable>

      <StatusBar style="auto" />
    </Container>
  );
}
