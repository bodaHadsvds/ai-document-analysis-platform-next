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




// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { notFound } from "next/navigation";

// interface Entity {
//   type: string;
//   text: string;
// }

// interface DocumentData {
//   id: string;
//   title: string;
//   text: string;
//   summary: string;
//   confidence: number;
//   sentiment: {
//     label: string;
//     score: number;
//   };
//   entities: Entity[];
//   keywords: { word: string; relevance: number }[];
// }

// async function getDocument(id: string): Promise<DocumentData | null> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/${id}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) return null;
//   return res.json();
// }

// export default async function DocumentDetail({ params }: { params: { id: string } }) {
//   const doc = await getDocument(params.id);
//   if (!doc) return notFound();

//   const groupedEntities = doc.entities.reduce((acc: Record<string, string[]>, entity) => {
//     if (!acc[entity.type]) acc[entity.type] = [];
//     acc[entity.type].push(entity.text);
//     return acc;
//   }, {});
  
//   return (
//     <div className="p-8 space-y-6">
//       <h1 className="text-3xl font-bold">{doc.title}</h1>

//       {/* Summary Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>AI Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-700">{doc.summary}</p>
//           <p className="text-sm text-gray-500 mt-2">Confidence: {Math.round(doc.confidence * 100)}%</p>
//         </CardContent>
//       </Card>

//       {/* Sentiment Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Sentiment Analysis</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-700">
//             Sentiment: <strong>{doc.sentiment.label}</strong>
//           </p>
//           <Progress value={doc.sentiment.score * 100} className="mt-2" />
//         </CardContent>
//       </Card>

//       {/* Entities Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Named Entities</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {Object.entries(groupedEntities).map(([type, items]) => (
//             <div key={type}>
//               <h4 className="font-semibold">{type}</h4>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {items.map((text, idx) => (
//                   <Badge key={idx} variant="secondary">{text}</Badge>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Keywords Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Keywords / Topics</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-wrap gap-2">
//             {doc.keywords.map((k, i) => (
//               <Badge key={i} variant="outline">
//                 {k.word} ({Math.round(k.relevance * 100)}%)
//               </Badge>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

   
//       <Card>
//         <CardHeader>
//           <CardTitle>Original Text</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="whitespace-pre-wrap leading-relaxed">
//             {highlightEntities(doc.text, doc.entities)}
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// function highlightEntities(text: string, entities: Entity[]) {
//   let highlighted = text;
//   entities.forEach((e) => {
//     const regex = new RegExp(`\\b${e.text}\\b`, "gi");
//     highlighted = highlighted.replace(
//       regex,
//       `<mark class="bg-yellow-200 px-1 rounded">${e.text}</mark>`
//     );
//   });
//   return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
// }
