import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Alert, FlatList } from "react-native";
import styled from "styled-components/native";
import { Card } from "./components";
import { shuffleCards, getRandomNumbers } from "./utilities/functions";
import { COLOR_BLUE, COLOR_DARK_GREY, COLOR_WHITE, HEADER_HEIGHT } from "./utilities/constants";

const Container = styled.View`
  flex: 1;
  background-color: ${COLOR_DARK_GREY};
  padding: 20px;
`;

const Header = styled.View`
  height: ${HEADER_HEIGHT}px;
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

const CardContainer = styled.View`
  padding: 5px;
`;

const CARD_PAIRS_VALUE = getRandomNumbers();

export default function Main() {
  const [cards, setCards] = useState(
    shuffleCards.bind(null, CARD_PAIRS_VALUE.concat(CARD_PAIRS_VALUE))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState([]);
  const [isCardsDisabled, setIsCardsDisabled] = useState(false);
  const [steps, setSteps] = useState(0);
  const timeout = useRef(null);

  // Prevent user from pressing more than 2 cards
  const disableCards = () => {
    setIsCardsDisabled(true);
  };
  const enableCards = () => {
    setIsCardsDisabled(false);
  };

  // Check if both cards have the same value. If they do, mark them cleared
  const evaluateCards = () => {
    const [first, second] = openCards;
    enableCards();
    if (cards[first] === cards[second]) {
      setClearedCards((prev) => ([...prev, cards[first]]))
      setOpenCards([]);
      return;
    }
    // Flip cards after 1s
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 1000);
  };

  const handleCardPress = (index) => {
    setSteps(steps + 1);
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disableCards();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const isCardFlipped = (index) => {
    return openCards.includes(index);
  };

  const isCardCleared = (card) => {
    return clearedCards.includes(card);
  };

  // Get a new array of numbers, and shuffle the array
  const resetGame = () => {
    setCards(
      shuffleCards.bind(null, CARD_PAIRS_VALUE.concat(CARD_PAIRS_VALUE))
    );
    setClearedCards([]);
    setOpenCards([]);
    setSteps(0);
    setIsCardsDisabled(false);
  };

  const checkGameEnd = () => {
    if (clearedCards.length === CARD_PAIRS_VALUE.length) {
      Alert.alert(
        "Congratulations!",
        `You have won this game in ${steps} steps!`,
        [{ text: "Try another round", onPress: () => resetGame() }]
      );
    }
  };

  const renderCard = ({ item, index }) => {
    return (
      <CardContainer>
        <Card
          onPress={handleCardPress}
          card={item}
          index={index}
          isDisabled={isCardsDisabled}
          isCleared={isCardCleared(item)}
          isFlipped={isCardFlipped(index)}
        />
      </CardContainer>
    );
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluateCards, 100);
    }
  }, [openCards]);

  useEffect(() => {
    checkGameEnd();
  }, [clearedCards]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={resetGame}>
          <RestartButton>Restart</RestartButton>
        </TouchableOpacity>
        <StepsText>
          STEPS: <StepsNumber>{steps}</StepsNumber>
        </StepsText>
      </Header>

      <FlatList
        data={cards}
        numColumns={3}
        renderItem={renderCard}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />

      <StatusBar style="auto" />
    </Container>
  );
}
