import userReducer, { login, logout, selectUser } from "./userSlice";

describe("userSlice", () => {
  it("stores the logged-in user", () => {
    const user = { uid: "user-1", email: "licia@example.com" };

    const state = userReducer(undefined, login(user));

    expect(state.user).toEqual(user);
  });

  it("clears the user on logout", () => {
    const state = userReducer(
      { user: { uid: "user-1", email: "licia@example.com" } },
      logout()
    );

    expect(state.user).toBeNull();
  });

  it("selects the user from the root state", () => {
    const user = { uid: "user-1" };

    expect(selectUser({ user: { user } })).toBe(user);
  });
});
