import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Alert, FlatList } from "react-native";
import styled from "styled-components/native";
import { Card } from "./components";

const Container = styled.View`
  flex: 1;
  background-color: #39353c;
  padding: 20px;
`;

const Header = styled.View`
  padding-top: 50px;
  padding-bottom: 5px;
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

  // Check if both cards have the same value. If they do, mark them cleared
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
    console.log(index, steps);
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disableCards();
    } else {
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
    checkGameEnd();
  }, [clearedCards]);

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
    setIsCardsDisabled(false);
  };

  const checkGameEnd = () => {
    if (Object.keys(clearedCards).length === CARD_PAIRS_VALUE.length) {
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
