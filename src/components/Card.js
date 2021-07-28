import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { COLOR_BLUE, COLOR_WHITE, COLOR_BLACK, CARD_WIDTH, CARD_HEIGHT } from "../utilities/constants";

const FrontText = styled.Text`
  font-size: 20px;
  color: ${COLOR_BLACK};

  ${({ flipped }) => !flipped && `color:${COLOR_WHITE};`}
`;

const BackText = styled.Text`
  font-size: 40px;
  color: ${COLOR_WHITE};
`;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Card({
  onPress,
  card,
  index,
  isDisabled,
  isCleared,
  isFlipped,
}) {
  const animatedValue = useRef(new Animated.Value(180)).current;

  frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  const frontAnimatedStyle = {
    opacity: frontOpacity,
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    opacity: backOpacity,
    transform: [{ rotateY: backInterpolate }],
  };

  const handlePress = () => {
    if (!isCleared && !isDisabled) {
      onPress(index);
    }
  };

  useEffect(() => {
    flipCard();
  }, [isFlipped, isCleared]);

  const flipCard = () => {
    if (!isFlipped && !isCleared) {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  return isCleared ? (
    <View>
      <Animated.View style={[styles.card, styles.frontCard]}>
        <FrontText flipped={true}>{card}</FrontText>
      </Animated.View>
    </View>
  ) : (
    <View>
      <Animated.View
        style={[frontAnimatedStyle, styles.card, styles.frontCard]}
      >
        <FrontText flipped={isFlipped}>{card}</FrontText>
      </Animated.View>
      <AnimatedTouchable
        style={[backAnimatedStyle, styles.card, styles.backCard]}
        onPress={() => handlePress()}
        disabled={isDisabled || isFlipped}
      >
        <BackText>?</BackText>
      </AnimatedTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: COLOR_WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  frontCard: {
    backgroundColor: COLOR_WHITE,
    backfaceVisibility: "hidden",
  },
  backCard: {
    backgroundColor: COLOR_BLUE,
    position: "absolute",
  },
});
