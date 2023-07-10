export const API_URL = "https://localhost:7145/api";

export enum ACCOUNT {
  GET = "/account/",
  LOGIN = "/account/login/",
  SIGNUP = "/account/signup/",
}

export enum THREADS {
  LIST = "/threads/",
}

export enum PROFILE {
  GET = "/profiles/username/",
  THREADS = "/profiles/threads/",
}
