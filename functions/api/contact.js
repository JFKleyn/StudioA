export async function onRequestPost({ request, env }) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response("Expected application/json", { status: 415 });
    }

    const data = await request.json();

    // Match your form field names exactly:
    const firstname = (data.firstname || "").trim();
    const lastname = (data.lastname || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();

    if (!firstname || !lastname || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    const fullName = `${firstname} ${lastname}`.trim();

    // Basic email format sanity check (not perfect, but helps)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response("Invalid email address", { status: 400 });
    }

    const subject = `New lead submission from ${fullName}`;
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(message)}</pre>
    `;

    // Required env vars:
    // RESEND_API_KEY, TO_EMAIL, FROM_EMAIL
    if (!env.RESEND_API_KEY || !env.TO_EMAIL || !env.FROM_EMAIL) {
      return new Response("Server is missing email configuration", { status: 500 });
    }

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [env.TO_EMAIL],
        subject,
        html,
        reply_to: email, // client can hit reply
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return new Response(`Email send failed: ${err}`, { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(`Server error: ${e?.message || e}`, { status: 500 });
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
