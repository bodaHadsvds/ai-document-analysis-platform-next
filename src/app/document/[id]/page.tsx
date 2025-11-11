import DocumentDetails from "@/components/documentDetalis/DocumentDetalis";
import DocumentDetailsSkeleton from "@/components/documentDetalis/DocumentSkeleton";
import DocumentNotFound from "@/components/documentDetalis/NotFoundDocument";
import { getDocumentById } from "@/services/showdocument";
import { Suspense } from "react";


async function DocumentContent({ id }: { id: string }) {
  const doc = await getDocumentById(id);
  if (!doc) return <DocumentNotFound/>;

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


