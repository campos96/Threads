import { API_URL, PROFILE } from "../routes/endpoints";
import AccountProfile from "../types/AccountProfile";
import headers from "./headers";
import request from "./request";

export const getProfile = (username: string) => {
  return request(API_URL + PROFILE.GET + username, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const getProfileAccount = (accountId: string) => {
  return request(API_URL + PROFILE.ACCOUNT + accountId, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const updateProfileAccount = (profileAccount: AccountProfile) => {
  return request(API_URL + PROFILE.PUT_ACCOUNT + profileAccount.accountId, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(profileAccount),
  }).then((response) => response);
};

export const getThreads = (username: string) => {
  return request(API_URL + PROFILE.THREADS + username, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const getReplies = (username: string) => {
  return request(API_URL + PROFILE.REPLIES + username, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const postProfilePhoto = (accountid: string, photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);
  return request(API_URL + PROFILE.SET_PHOTO + accountid, {
    method: "POST",
    headers: {
      Authorization: headers().Authorization,
    },
    body: formData,
  }).then((response) => response);
};

export const deleteProfilePhoto = (accountId: string) => {
  return request(API_URL + PROFILE.DELETE_PHOTO + accountId, {
    method: "DELETE",
    headers: headers(),
  }).then((response) => response);
};
