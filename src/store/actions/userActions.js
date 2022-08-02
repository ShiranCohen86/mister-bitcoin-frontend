import { userService } from "../../services/userService";

export const signup = (userCred) => {
  return async (dispatch) => {
    try {
      const user = await userService.signup(userCred);
      dispatch({ type: "SET_USER", user });
    } catch (err) {
      throw err;
    }
  };
};

export const login = (userCred) => {
  return async (dispatch) => {
    try {
      const user = await userService.login(userCred);

      dispatch({ type: "SET_USER", user });
    } catch (err) {
      throw err;
    }
  };
};

export const setLoggedInUser = () => {
  return async (dispatch) => {
    const loggedInUser = await userService.getLoggedInUser();
    dispatch({ type: "SET_USER", user: loggedInUser });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await userService.logout();
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_TRANSFERS" });
    dispatch({ type: "CLEAR_CONTACTS" });

  };
};

export function editUser(field, value) {
  return (dispatch) => {
    dispatch({ type: "EDIT_USER", field, value });
  };
}

export function saveUser(user) {
  return async (dispatch) => {
    const updatedUser = await userService.update(user);
    dispatch({ type: "UPDATE_USER", updatedUser });
  };
}

export const clearUserStore = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_USER_STORE" });
  };
};
