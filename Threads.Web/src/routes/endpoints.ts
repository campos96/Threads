export const API_URL = process.env.REACT_APP_API_URL;

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
  GET_LIKES = "/threadLikes/",
  REPLIERS = "/threads/repliers/",
  REPLIES = "/threads/replies/",
}

export enum ATTACHMENTS {
  ADD = "/threadAttachments/",
  GET = "/threadAttachments/",
}


export enum PROFILE {
  GET = "/profiles/username/",
  THREADS = "/profiles/threads/",
  REPLIES = "/profiles/replies/",
  ACCOUNT = "/profiles/account/",
  PUT_ACCOUNT = "/profiles/account/",
  SET_PHOTO = "/profilePictures/",
  GET_PHOTO = "/profilePictures/",
  GET_THUMBNAIL = "/profilePictures/thumbnail/",
  DELETE_PHOTO = "/profilePictures/",
}
