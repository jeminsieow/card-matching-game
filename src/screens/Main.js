import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Alert, FlatList } from "react-native";
import styled from "styled-components/native";
import { Card, Header } from "../components";
import { shuffleCards, getRandomNumbers } from "../utilities/functions";
import { CARD_PAIRS_VALUE, COLOR_DARK_GREY } from "../utilities/constants";

const Container = styled.View`
  flex: 1;
  background-color: ${COLOR_DARK_GREY};
  padding: 20px;
  align-items: center;
`;

export default function Main() {
  const [cards, setCards] = useState(CARD_PAIRS_VALUE)
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
      setClearedCards((prev) => [...prev, cards[first]]);
      setOpenCards([]);
      return;
    }
    // Flip cards after 1 second
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
    setCards(shuffleCards(getRandomNumbers()));
    setClearedCards([]);
    setOpenCards([]);
    setSteps(0);
    setIsCardsDisabled(false);
  };

  const checkGameEnd = () => {
    if (clearedCards.length === CARD_PAIRS_VALUE.length / 2) {
      Alert.alert(
        "Congratulations!",
        `You have won this game in ${steps} steps!`,
        [{ text: "Try another round", onPress: () => resetGame() }]
      );
    }
  };

  const renderCard = ({ item, index }) => {
    return (
      <Card
        onPress={handleCardPress}
        card={item}
        index={index}
        isDisabled={isCardsDisabled}
        isCleared={isCardCleared(item)}
        isFlipped={isCardFlipped(index)}
      />
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
      <Header onPressResetGame={resetGame} steps={steps} />
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
