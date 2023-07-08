import { API_URL, THREADS } from "../routes/endpoints";
import headers from "./headers";

export const getThreads = () => {
  return fetch(API_URL + THREADS.LIST, {
    method: "GET",
    headers: headers(),
  }).then((response) => response.json());
};
