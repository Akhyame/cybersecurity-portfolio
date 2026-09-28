import { getPublishedCertificateFile } from "@/lib/notion/certificates";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const pageId = new URL(request.url).searchParams.get("id") ?? "";
  const fileUrl = await getPublishedCertificateFile(pageId);

  if (!fileUrl) {
    return new Response("Certificate not found", { status: 404 });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: fileUrl,
      "Cache-Control": "no-store",
    },
  });
}
