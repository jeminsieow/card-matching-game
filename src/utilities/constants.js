import { Dimensions } from "react-native";
import { shuffleCards, getRandomNumbers } from "../utilities/functions";

export const COLOR_BLUE = "#1B98F2";
export const COLOR_DARK_GREY = "#39353C";
export const COLOR_WHITE = "#FFFFFF";
export const COLOR_BLACK = "#000000";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export const HEADER_HEIGHT = SCREEN_HEIGHT / 7;
export const HEADER_WIDTH = SCREEN_WIDTH - 40;
export const CARD_WIDTH = Math.floor((SCREEN_WIDTH - 70) / 3);
export const CARD_HEIGHT = Math.floor((SCREEN_HEIGHT - HEADER_HEIGHT - 40) / 4);

export const CARD_PAIRS_VALUE = shuffleCards(getRandomNumbers());
