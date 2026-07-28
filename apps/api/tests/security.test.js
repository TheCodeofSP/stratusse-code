const assert = require("node:assert/strict");
const { describe, it, mock } = require("node:test");

const {
  csrfOriginProtection,
} = require("../src/middlewares/csrfOrigin.middleware");
const {
  AUTH_COOKIE_NAME,
} = require("../src/utils/authCookie.utils");

const createResponse = () => ({
  statusCode: null,
  payload: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.payload = payload;
    return this;
  },
});

describe("protection de l’origine des sessions", () => {
  it("autorise une lecture authentifiée", () => {
    const next = mock.fn();
    const req = {
      method: "GET",
      cookies: { [AUTH_COOKIE_NAME]: "session" },
      get: () => undefined,
    };

    csrfOriginProtection(req, createResponse(), next);

    assert.equal(next.mock.callCount(), 1);
  });

  it("refuse une écriture provenant d’un autre site", () => {
    const next = mock.fn();
    const response = createResponse();
    const req = {
      method: "POST",
      cookies: { [AUTH_COOKIE_NAME]: "session" },
      get: () => "https://site-malveillant.example",
    };

    csrfOriginProtection(req, response, next);

    assert.equal(response.statusCode, 403);
    assert.equal(next.mock.callCount(), 0);
  });

  it("autorise une écriture provenant du front officiel", () => {
    const next = mock.fn();
    const req = {
      method: "POST",
      cookies: { [AUTH_COOKIE_NAME]: "session" },
      get: () => "https://www.stratusse.fr",
    };

    csrfOriginProtection(req, createResponse(), next);

    assert.equal(next.mock.callCount(), 1);
  });
});
