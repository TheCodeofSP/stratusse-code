const AUTH_COOKIE_NAME = "stratusse_session";

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    ...(process.env.COOKIE_DOMAIN
      ? { domain: process.env.COOKIE_DOMAIN }
      : {}),
  };
};

const setAuthCookie = (res, token) => {
  res.cookie(AUTH_COOKIE_NAME, token, getCookieOptions());
};

const clearAuthCookie = (res) => {
  const options = getCookieOptions();
  delete options.maxAge;

  res.clearCookie(AUTH_COOKIE_NAME, options);
};

module.exports = {
  AUTH_COOKIE_NAME,
  clearAuthCookie,
  setAuthCookie,
};
