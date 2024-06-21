// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosInstance from "./axiosInstance";
import { getToken } from "./localStorageService";

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/user/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register/",
        method: "POST",
        body: user,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

//  The function `changePassword` asynchronously sends a POST request to change a user's password with  proper authorization handling.
const changePassword = async (passwordData) => {
  try {
    const { access_token } = getToken();
    const res = await axiosInstance.post("changepassword/", passwordData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// sends a reset password email using an axios POST request and  handles any errors that may occur.
const sendResetPasswordEmail = async (email) => {
  try {
    const res = await axiosInstance.post("send-reset-password-email/", email);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// it sends a POST request to reset a user's password using the provided password data, user ID (uid), and token.
const resetPassword = async (passwordData, uid, token) => {
  try {
    const res = await axiosInstance.post(
      `password-reset-confirm/${uid}/${token}/`,
      passwordData
    );
    console.log(res.data);
    console.log("uidd", uid);
    console.log("tokenn", token);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export { changePassword, sendResetPasswordEmail, resetPassword };
export const { useRegisterUserMutation } = userAuthApi;
