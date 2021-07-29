import React from "react";
import { create } from "react-test-renderer";
import Card from "../../src/components/Card";

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test("Unflipped card renders correctly", () => {
  const tree = create(
    <Card
      onPress={() => null}
      card={1}
      index={1}
      isDisabled={false}
      isCleared={false}
      isFlipped={false}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Flipped card renders correctly", () => {
  const tree = create(
    <Card
      onPress={() => null}
      card={1}
      index={1}
      isDisabled={false}
      isCleared={false}
      isFlipped={true}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Cleared card renders correctly", () => {
  const tree = create(
    <Card
      onPress={() => null}
      card={1}
      index={1}
      isDisabled={false}
      isCleared={true}
      isFlipped={false}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Disabled card renders correctly", () => {
  const tree = create(
    <Card
      onPress={() => null}
      card={1}
      index={1}
      isDisabled={true}
      isCleared={false}
      isFlipped={false}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
