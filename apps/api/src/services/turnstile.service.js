const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_TEST_SECRET =
  "1x0000000000000000000000000000000AA";

const verifyTurnstileToken = async ({ token, remoteIp }) => {
  if (!token) {
    return false;
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret:
        process.env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET,
      response: token,
      remoteip: remoteIp,
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error("TURNSTILE_UNAVAILABLE");
  }

  const result = await response.json();

  return result.success === true;
};

module.exports = {
  verifyTurnstileToken,
};
