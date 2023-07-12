import { API_URL, ATTACHMENTS, THREADS } from "../routes/endpoints";
import Thread from "../types/Thread";
import headers from "./headers";
import request from "./request";

export const getThreads = () => {
  return request(API_URL + THREADS.LIST, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const getThread = (threadId: string) => {
  return request(API_URL + THREADS.LIST + threadId, {
    method: "GET",
    headers: headers(),
  }).then((response) => response);
};

export const postThread = (thread: Thread) => {
  return request(API_URL + THREADS.ADD, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(thread),
  }).then((response) => response);
};


export const postThreadPicture = (threadId: string, picture: File) => {
  const formData = new FormData();
  formData.append("picture", picture);
  return request(API_URL + ATTACHMENTS.ADD + threadId, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + headers().Authorization,
    },
    body: formData,
  }).then((response) => response);
};