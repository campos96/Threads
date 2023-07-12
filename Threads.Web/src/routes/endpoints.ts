export const API_URL = "https://localhost:7145/api";

export enum ACCOUNT {
  GET = "/account/",
  LOGIN = "/account/login/",
  SIGNUP = "/account/signup/",
}

export enum THREADS {
  LIST = "/threads/",
  ADD = "/threads/",

export enum ATTACHMENTS {
  ADD = "/threadAttachments/",
  GET = "/threadAttachments/",
}

export enum PROFILE {
  GET = "/profiles/username/",
  THREADS = "/profiles/threads/",
  ACCOUNT = "/profiles/account/",
  PUT_ACCOUNT = "/profiles/account/",
  SET_PHOTO = "/profiles/photo/",
  GET_PHOTO = "/profiles/photo/",
  DELETE_PHOTO = "/profiles/photo/",
}
