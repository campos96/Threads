export type ApiResponse = {
  status: number;
  title: string;
  errors?: Array<ApiResponseError>;
  payload?: object;
};

export type ApiResponseError = {
  key: string;
  value: string;
};
