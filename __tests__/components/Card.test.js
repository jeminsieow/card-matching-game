import React from "react";
import { create } from "react-test-renderer";
import Card from "../../src/components/Card";
import { shallow } from "enzyme";

jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("Card component", () => {
  it("unflipped card renders correctly", () => {
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

  it("flipped card renders correctly", () => {
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

  it("cleared card renders correctly", () => {
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

  it("disabled card renders correctly", () => {
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

  it("press function works correctly", () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(
      <Card
        onPress={mockFunc}
        card={1}
        index={1}
        isDisabled={false}
        isCleared={false}
        isFlipped={false}
      />
    )
    const card = wrapper.find({ testID: "touchableCard" });
    card.simulate('press');
    expect(mockFunc).toHaveBeenCalled();
  });
});
