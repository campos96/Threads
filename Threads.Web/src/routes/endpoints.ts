const PRO_API = "http://campos-001-site1.atempurl.com/api";
const DEV_API = "https://localhost:7145/api";

export const API_URL = PRO_API;

export enum ACCOUNT {
  GET = "/account/",
  LOGIN = "/account/login/",
  SIGNUP = "/account/signup/",
}

export enum THREADS {
  LIST = "/threads/",
  ADD = "/threads/",
  LIKE = "/threadLikes/",
  GET_LIKE = "/threadLikes/",
}

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
