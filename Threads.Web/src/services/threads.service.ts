import { API_URL, THREADS } from "../routes/endpoints";
import headers from "./headers";
import request from "./request";

export const getThreads = () => {
  return request(API_URL + THREADS.LIST, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};
