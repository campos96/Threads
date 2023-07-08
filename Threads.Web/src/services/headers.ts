const headers = () => {
  const accessToken = localStorage.getItem("AccessToken");
  return {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json; charset=UTF-8;",
  };
};

export default headers;
