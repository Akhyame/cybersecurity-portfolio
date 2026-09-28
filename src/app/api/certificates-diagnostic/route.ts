import { getPublishedCertificates } from "@/lib/notion/certificates";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    await getPublishedCertificates();
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const notionStatus = /Notion API request failed \((\d{3})\)/.exec(message)?.[1] ?? null;

    // Temporary diagnostic: expose only the upstream status, never credentials or response data.
    return Response.json(
      { ok: false, notionStatus, failure: notionStatus ? "notion-api" : "other" },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
