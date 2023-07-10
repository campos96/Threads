import request from "./request";
import { ACCOUNT, API_URL } from "../routes/endpoints";
import AuthResult from "../types/AuthResult";
import Login from "../types/Login";
import headers from "./headers";
import Identity from "../types/Identity";
import Account from "../types/Account";

export const login = async (values: Login) => {
  return await request(API_URL + ACCOUNT.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8;",
    },
    body: JSON.stringify(values),
  }).then(async (response) => {
    var authResult = response.payload as AuthResult;
    if (authResult) {
      localStorage.setItem("AccessToken", authResult.accessToken);
      var expirationDate = new Date();
      expirationDate.setSeconds(
        expirationDate.getSeconds() + authResult.expiresIn
      );
      localStorage.setItem(
        "AccessTokenExpiration",
        expirationDate.getTime().toString()
      );

      var account = await getAccount(authResult.accountId).then(
        async (response) => (await response.payload) as Account
      );

      var identity = {
        id: account.id,
        name: account.name,
        username: account.username,
      } as Identity;

      localStorage.setItem("Identity", JSON.stringify(identity));
    }
    return response;
  });
};

export const getAccount = (id: string) => {
  return request(API_URL + ACCOUNT.GET + id, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const logout = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("Identity");
  localStorage.removeItem("AccessTokenExpiration");
};
