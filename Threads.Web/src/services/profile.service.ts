import { API_URL, PROFILE } from "../routes/endpoints";
import headers from "./headers";
import request from "./request";

export const getProfile = (username: string) => {
  return request(API_URL + PROFILE.GET + username, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};
