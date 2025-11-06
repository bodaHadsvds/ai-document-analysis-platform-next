import DocumentDetails from "@/components/documentDetalis/DocumentDetalis";
import DocumentDetailsSkeleton from "@/components/documentDetalis/DocumentSkeleton";
import { getDocumentById } from "@/services/showdocument";
import { notFound } from "next/navigation";
import { Suspense } from "react";


async function DocumentContent({ id }: { id: string }) {
  const doc = await getDocumentById(id);
  if (!doc) return notFound();

  return <DocumentDetails doc={doc} />;
}

export default function DocumentPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<DocumentDetailsSkeleton />}>
      {/* DocumentContent fetches server-side */}
      <DocumentContent id={params.id} />
    </Suspense>
  );
}


