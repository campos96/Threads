import { API_URL, PROFILE } from "../routes/endpoints";
import headers from "./headers";
import request from "./request";

export const getProfile = (username: string) => {
  return request(API_URL + PROFILE.GET + username, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const getThreads = (username: string) => {
  return request(API_URL + PROFILE.THREADS + username, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

