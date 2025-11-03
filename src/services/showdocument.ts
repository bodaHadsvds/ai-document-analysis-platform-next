import { DocumentData } from "@/types/document";

export async function getDocumentById(
  id: string
): Promise<DocumentData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/document/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
