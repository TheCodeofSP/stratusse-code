const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const parseResponseBody = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (response.status === 204) {
    return null;
  }

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const request = async (path, options = {}) => {
  const {
    data,
    headers,
    method = "GET",
    skipAuthRedirect = false,
    ...fetchOptions
  } = options;

  const response = await fetch(`${baseUrl}${path}`, {
    ...fetchOptions,
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(data !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
  });

  const responseData = await parseResponseBody(response);

  if (!response.ok) {
    const error = new Error(
      responseData?.message || `La requête a échoué (${response.status}).`,
    );

    error.config = { skipAuthRedirect };
    error.response = {
      data: responseData,
      status: response.status,
    };

    if (response.status === 401 && !skipAuthRedirect) {
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    throw error;
  }

  return {
    data: responseData,
    headers: response.headers,
    status: response.status,
  };
};

const api = {
  get(path, config = {}) {
    return request(path, {
      ...config,
      method: "GET",
    });
  },

  post(path, data, config = {}) {
    return request(path, {
      ...config,
      data,
      method: "POST",
    });
  },

  patch(path, data, config = {}) {
    return request(path, {
      ...config,
      data,
      method: "PATCH",
    });
  },

  put(path, data, config = {}) {
    return request(path, {
      ...config,
      data,
      method: "PUT",
    });
  },

  delete(path, config = {}) {
    return request(path, {
      ...config,
      method: "DELETE",
    });
  },
};

export default api;
