/** Read API errors without exposing HTML proxy pages or internal stack traces. */
export async function responseError(
  response: Response,
  fallback = "The request could not be completed.",
): Promise<Error> {
  if (response.status === 401)
    return new Error(
      "Your email or password is incorrect, or your session has expired. Please sign in again.",
    )
  if (response.status === 403)
    return new Error("You do not have permission to perform this action.")
  if (response.status >= 500)
    return new Error(
      "The service is temporarily unavailable. Please try again shortly.",
    )
  try {
    const body: unknown = await response.json()
    if (
      body &&
      typeof body === "object" &&
      "message" in body &&
      typeof body.message === "string" &&
      body.message.length < 300
    ) {
      return new Error(body.message)
    }
  } catch {
    /* Non-JSON error pages use the safe fallback. */
  }
  return new Error(fallback)
}
