import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
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
  padding-right: 20px;
  font-size: 30px;
  color: white;
`;

const StepsNumber = styled.Text`
  font-size: 35px;
  color: #1b98f2;
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

export default function Main() {
  const [cards, setCards] = useState(
    shuffleCards.bind(null, CARD_PAIRS_VALUE.concat(CARD_PAIRS_VALUE))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [isCardsDisabled, setIsCardsDisabled] = useState(false);
  const [steps, setSteps] = useState(0);
  const timeout = useRef(null);

  const disableCards = () => {
    setIsCardsDisabled(true);
  };
  const enableCards = () => {
    setIsCardsDisabled(false);
  };

  // Check if both cards have the same value. If they do, mark them inactive
  const evaluateCards = () => {
    const [first, second] = openCards;
    enableCards();
    if (cards[first] === cards[second]) {
      setClearedCards((prev) => ({ ...prev, [cards[first]]: true }));
      setOpenCards([]);
      return;
    }
    // Flip cards after a 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardPress = (index) => {
    setSteps(steps + 1);
    console.log(index, steps)
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disableCards();
    } else {
      // If two cards are already open, we cancel timeout set for flipping cards back
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluateCards, 500);
    }
  }, [openCards]);

  useEffect(() => {
    console.log("openCards: " + openCards);
    console.log("clearedCards: ");
    console.log(clearedCards);
  }, [openCards, clearedCards]);

  const isCardFlipped = (index) => {
    return openCards.includes(index);
  };

  const isCardCleared = (card) => {
    return clearedCards[card];
  };

  const resetGame = () => {
    setCards(
      shuffleCards.bind(null, CARD_PAIRS_VALUE.concat(CARD_PAIRS_VALUE))
    );
    setClearedCards({});
    setOpenCards([]);
    setSteps(0);
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={resetGame}>
          <RestartButton>Restart</RestartButton>
        </TouchableOpacity>
        <StepsText>STEPS: <StepsNumber>{steps}</StepsNumber></StepsText>
      </Header>

      <CardTable>
        {cards.map((card, index) => {
          // return <Text key={index}>{card}</Text>;
          return (
            <CardContainer key={index}>
              <Card
                onPress={handleCardPress}
                card={card}
                index={index}
                isDisabled={isCardsDisabled}
                isCleared={isCardCleared(card)}
                isFlipped={isCardFlipped(index)}
              />
            </CardContainer>
          );
        })}
      </CardTable>

      <StatusBar style="auto" />
    </Container>
  );
}
