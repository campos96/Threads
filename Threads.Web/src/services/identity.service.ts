import Identity from "../types/Identity";

export const userIdentity = (): Identity | undefined => {
  const accessToken = localStorage.getItem("AccessToken");
  const accessTokenExpiration = localStorage.getItem("AccessTokenExpiration");
  const fullName = localStorage.getItem("FullName");
  const accountId = localStorage.getItem("AccountId");

  if (!accessToken || !accessTokenExpiration || !fullName || !accountId) {
    return;
  }

  if (parseInt(accessTokenExpiration) <= new Date().getTime()) {
    return;
  }

  return {
    id: accountId,
    name: fullName,
  } as Identity;
};
