// store access and refresh token locally
const storeToken = (value) => {
  //   console.log("token", value.token.access);
  const { access, refresh } = value;
//   console.log("access", access);
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

// get stored token
const getToken = () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  return { access_token, refresh_token };
  //   {
  //     access_token: "abcd1234",
  //     refresh_token: "wxyz5678"
  //   }
};

// remove stored token
const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export { storeToken, getToken, removeToken };
