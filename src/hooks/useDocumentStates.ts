'use client';

import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { DocumentItem } from '../types/document';

interface DocumentsStore {
  documents: DocumentItem[];
  addDocument: (doc: DocumentItem) => void;
  deleteDocument: (id: string) => void;
  updateDocument: (id: string, updater: (doc: DocumentItem) => DocumentItem) => void;
  setDocuments: (docs: DocumentItem[]) => void;
}

export const useDocumentsStore = create<DocumentsStore>((set) => ({
  documents: [
    {
      id: '1',
      title: 'Elon Musk and SpaceX',
      content: 'The document talks about Elon Musk founding SpaceX.',
      createdAt: new Date().toISOString(),
      status: 'completed',
      summary:
        "The document talks about Elon Musk founding SpaceX. The document also talks about Musk's role in the creation of the company. The documents were leaked to the media by Musk's company, SpaceX. SpaceX is a rocket company founded by Musk in 2010. The company has since raised more than $2 billion in funding.",
      sentiment: { label: 'Neutral', score: 0.5 },
      entities: [{ type: 'TOPIC', value: 'summarization' }],
    },
    {
      id: uuidv4(),
      title: 'Medium Sample',
      content:
        'This medium-length document provides a balanced test for summarization speed and accuracy...',
      createdAt: new Date().toISOString(),
      status: 'idle',
    },
    {
      id: uuidv4(),
      title: 'Long Sample',
      content:
        'This is a long sample document that contains multiple sentences, designed to test how the summarization model behaves with extended inputs...',
      createdAt: new Date().toISOString(),
      status: 'idle',
    },
  ],

  addDocument: (doc) =>
    set((state) => ({ documents: [doc, ...state.documents] })),

  deleteDocument: (id) =>
    set((state) => {
      toast.message('Document deleted.');
      return { documents: state.documents.filter((d) => d.id !== id) };
    }),

  updateDocument: (id, updater) =>
    set((state) => ({
      documents: state.documents.map((d) => (d.id === id ? updater(d) : d)),
    })),

  setDocuments: (docs) => set({ documents: docs }),
}));

