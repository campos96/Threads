import Identity from "../types/Identity";

export const userIdentity = (): Identity | undefined => {
  const accessToken = localStorage.getItem("AccessToken");
  const accessTokenExpiration = localStorage.getItem("AccessTokenExpiration");
  const accountString = localStorage.getItem("Identity");

  if (!accessToken || !accessTokenExpiration || !accountString) {
    return;
  }

  if (parseInt(accessTokenExpiration) <= new Date().getTime()) {
    return;
  }

  return JSON.parse(accountString) as Identity;
};
