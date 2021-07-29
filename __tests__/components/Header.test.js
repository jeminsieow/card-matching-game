import React from "react";
import { create } from "react-test-renderer";
import Header from "../../src/components/Header";

it("Header renders correctly", () => {
  const tree = create(
    <Header onPressResetGame={() => null} steps={5} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
