import React from "react";
import { create } from "react-test-renderer";
import Main from "../../src/screens/Main";

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('../../src/utilities/functions')

test("Main screen renders correctly", () => {
  const tree = create(
    <Main />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
