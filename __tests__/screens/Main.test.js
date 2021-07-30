import React from "react";
import Main from "../../src/screens/Main";
import Card from "../../src/components/Card";
import { shallow } from "enzyme";

jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("../../src/utilities/functions");

describe("Main component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });

  it("restart button resets game", () => {
    const wrapper = shallow(<Main />);
    const header = wrapper.find("Header").props();
    header.onPressResetGame();
    expect(header.steps).toBe(0);
  });

  it("children of FlatList are Cards", () => {
    const wrapper = shallow(<Main />);
    const flatList = wrapper.find("FlatList");
    const itemElement = flatList.props().renderItem({ item: 0, index: 0 });
    expect(itemElement.type).toEqual(Card);
  });

  it("flipcards are pressable", () => {
    const wrapper = shallow(<Main />);
    const flatList = wrapper.find("FlatList");
    let card0 = flatList.props().renderItem({ item: 0, index: 0 });
    card0.props.onPress();

    const header = wrapper.find("Header").props();
    expect(header.steps).toBe(1);
  });
});
