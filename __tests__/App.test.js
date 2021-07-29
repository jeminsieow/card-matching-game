import React from "react";
import { create } from "react-test-renderer";
import App from "../App";

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('../src/utilities/functions')

test("App screen renders correctly", () => {
  const tree = create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
