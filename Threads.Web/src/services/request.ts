import { ApiResponse } from "../types/ApiResponse";

const request = async (
  url: RequestInfo | URL,
  config?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(url, config);
    const json = await response.json();

    var errors = Array<{ key: string; value: string }>();
    for (var key in json.errors) {
      // eslint-disable-next-line no-loop-func, array-callback-return
      json.errors[key].map((error: string) => {
        errors.push({ key: key, value: error });
      });
    }

    json.errors = errors.length > 0 ? errors : [{ value: json.title }];
    return await json;
  } catch (error) {
    const response: ApiResponse = {
      status: 700,
      title: "Handling error",
    };

    return await response;
  }
};

export default request;
