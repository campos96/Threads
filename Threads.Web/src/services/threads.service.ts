import { API_URL, THREADS } from "../routes/endpoints";
import Thread from "../types/Thread";
import headers from "./headers";
import request from "./request";

export const getThreads = () => {
  return request(API_URL + THREADS.LIST, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const addThread = (thread: Thread) => {
  return request(API_URL + THREADS.ADD, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(thread),
  }).then((response) => response);
};
