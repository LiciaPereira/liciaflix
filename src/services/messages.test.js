import {
  bannerMessages,
  dismissButtonTexts,
  getRandomItem,
  movieMessages,
} from "./messages";

describe("messages", () => {
  it("keeps demo message pools populated", () => {
    expect(movieMessages.length).toBeGreaterThan(0);
    expect(bannerMessages.length).toBeGreaterThan(0);
    expect(dismissButtonTexts.length).toBeGreaterThan(0);
  });

  it("returns an item from the provided list", () => {
    const options = ["first", "second", "third"];

    expect(options).toContain(getRandomItem(options));
  });
});
