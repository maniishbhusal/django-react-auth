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


/**
 * The function `changePassword` asynchronously sends a POST request to change a user's password with
 * proper authorization handling.
 * @param passwordData - The `passwordData` parameter in the `changePassword` function likely contains
 * the new password information that the user wants to change to. It could include fields such as
 * `oldPassword` and `newPassword` to verify the user's identity and update their password accordingly.
 * @returns The `changePassword` function is returning the data received from the API response if the
 * request is successful. If there is an error during the API call, it will return the error response
 * data.
 */
const changePassword = async (passwordData) => {
  try {
    const { access_token } = getToken();
    const res = await axiosInstance.post("changepassword/", passwordData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default changePassword;
export const { useRegisterUserMutation } = userAuthApi;
