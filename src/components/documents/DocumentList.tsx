'use client';

import { useSSEAnalyzer } from '@/hooks/useAnalyzer';
import { useDocumentsStore } from '@/hooks/useDocumentStates';
import DocumentCard from './DocumentCard';
import NoDocument from './NoDocument';




export function DocumentList() {
   const { documents, updateDocument, deleteDocument } = useDocumentsStore();
    const { analyzeDocument } = useSSEAnalyzer();
  if (documents.length === 0) return <NoDocument />;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-slate-800">
        Documents ({documents.length})
      </h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onUpdateTitle={(id, title) => updateDocument(id, (d) => ({ ...d, title }))}
            onDelete={deleteDocument}
            handleReanalyze={(id, task) => {
              const doc = documents.find(d => d.id === id);
              if (doc) analyzeDocument(doc, task);
            }}
          />
        ))}
      </div>
    </div>
  );
}
