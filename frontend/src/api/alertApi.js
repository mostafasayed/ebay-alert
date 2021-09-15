export const alertApi = async (url = "", method = "GET", data = {}) => {
  const request = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (Object.keys(data).length > 0) {
    request["body"] = JSON.stringify(data);
  }
  const response = await fetch(url, request);
  return response.json();
};

export const deleteData = async (url = "") => {
  const response = await fetch(url, {
    method: "DELETE",
  });
  return response;
};
