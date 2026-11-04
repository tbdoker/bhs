import { NextResponse } from "next/server";

/**
 * Contact form endpoint. It validates the request and the KVKK consent.
 * TODO once the company mailbox exists: send the message with an email service
 * (for example Resend or Postmark) using CONTACT_TO from the environment.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = str("name"), email = str("email"), message = str("message");
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }
  if (body.consent !== "yes") {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 422 });
  }

  // Until email delivery is connected, the message is only logged on the server.
  console.info("[contact]", { name, email, company: str("company"), phone: str("phone"), topic: str("topic"), locale: str("locale"), length: message.length });
  return NextResponse.json({ ok: true });
}
