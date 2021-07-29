import React from "react";
import Main from "../../src/screens/Main";
import { shallow } from "enzyme";

jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("../../src/utilities/functions");

describe("Main component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });
});
