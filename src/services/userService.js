import { httpService } from "./httpService";

export const userService = {
  getUsers,
  getById,
  remove,
  update,
  login,
  signup,
  logout,
  getLoggedInUser,
  isSigned,
};

window.userService = userService;

function getUsers() {
  // return storageService.query("user");
  return httpService.get(`user`);
}

function getById(userId) {
  // return storageService.get("user", userId);
  return httpService.get(`user/${userId}`);
}

function remove(userId) {
  // return storageService.remove("user", userId);
  return httpService.delete(`user/${userId}`);
}

async function update(user) {
  // return storageService.put("user", user);
  return await httpService.put(`user/${user._id}`, user);
  // Handle case in which admin updates other user's details
  // if (getLoggedInUser()._id === user._id) _saveLocalUser(user);
}

async function login(userCred) {
  try {
    return await httpService.post("auth/login", userCred);
  } catch (err) {
    throw err;
  }
  // const user = await httpService.post("auth/login", userCred);
  // if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
  try {
    return await httpService.post("auth/signup", userCred);
  } catch (err) {
    console.log("service", err);
    throw err;
  }
  // const user = await httpService.post("auth/signup", userCred);
  // return _saveLocalUser(user);
}

async function logout() {
  // sessionStorage.clear();
  return await httpService.post("auth/logout");
}

async function getLoggedInUser() {
  try {
    return await httpService.get("user/loggedInUser");
  } catch (err) {
    throw err;
  }
}
async function isSigned(email) {
  try {
    return await httpService.get(`user/${email}`);
  } catch (err) {
    console.log(err.data);
    // throw err;
  }
}
