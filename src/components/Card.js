import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components";

const FlippedText = styled.Text`
  font-size: 20px;
  color: #000000;

  ${({ flipped }) =>
    !flipped &&
    `
    color: #ffffff;
  `}
`;

const UnflippedText = styled.Text`
  font-size: 40px;
  color: #ffffff;
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
    console.log("isflipped: " + isFlipped);
    console.log("iscleared: " + isCleared);
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

  if (isCleared) {
    return (
      <View>
        <Animated.View style={[styles.card, styles.frontCard]}>
          <FlippedText flipped={!isFlipped}>{card}</FlippedText>
        </Animated.View>
      </View>
    );
  }

  return (
    <View>
      <Animated.View
        style={[frontAnimatedStyle, styles.card, styles.frontCard]}
      >
        <FlippedText flipped={isFlipped}>{card}</FlippedText>
      </Animated.View>
      <AnimatedTouchable
        style={[backAnimatedStyle, styles.card, styles.backCard]}
        onPress={() => handlePress()}
        disabled={isDisabled || isFlipped}
      >
        <UnflippedText>? {card}</UnflippedText>
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
    width: 95,
    height: 140,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  frontCard: {
    backgroundColor: "#FFFFFF",
    backfaceVisibility: "hidden",
  },
  backCard: {
    backgroundColor: "#1b98f2",
    position: "absolute",
  },
});
