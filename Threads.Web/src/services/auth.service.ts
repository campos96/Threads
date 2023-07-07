import request from "./request";
import { ACCOUNT, API_URL } from "../routes/endpoints";
import AuthResult from "../types/AuthResult";
import Login from "../types/Login";

export const login = (values: Login) => {
  return request(API_URL + ACCOUNT.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8;",
    },
    body: JSON.stringify(values),
  }).then((response) => {
    var authResult = response.payload as AuthResult;
    if (authResult) {
      localStorage.setItem("AccessToken", authResult.accessToken);
      localStorage.setItem("FullName", authResult.userFullName);
      localStorage.setItem("AccountId", authResult.accountId);
      var expirationDate = new Date();
      expirationDate.setSeconds(
        expirationDate.getSeconds() + authResult.expiresIn
      );
      localStorage.setItem(
        "AccessTokenExpiration",
        expirationDate.getTime().toString()
      );
    }
    return response;
  });
};

export const logout = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("FullName");
  localStorage.removeItem("AccountId");
  localStorage.removeItem("AccessTokenExpiration");
};