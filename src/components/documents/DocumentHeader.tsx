"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DocumentItem } from "@/types/document";
import { Check, Edit2, FileText, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import StatusBadge from "./StatusBadge";

interface Props {
  document: DocumentItem;
  onUpdateTitle: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export default function DocumentHeader({
  document,
  onUpdateTitle,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(document.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdateTitle(document.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(document.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <Button
              name="save-button"
              aria-label="Save title"
              size="sm"
              variant="ghost"
              onClick={handleSave}
            >
              <Check className="w-4 h-4 text-green-600" />
            </Button>
            <Button
              name="cancel-button"
              aria-label="Cancel editing"
              size="sm"
              variant="ghost"
              onClick={handleCancel}
            >
              <X className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-500 flex-shrink-0" />
            <h3 className="text-slate-900 font-medium truncate">
              {document.title}
            </h3>
            <Button
            name="edit-button"
              size="sm"
              variant="ghost"
              aria-label="edit title"
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <StatusBadge status={document.status} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost"    size="sm" className="h-8 w-8 p-0"  aria-label={`Delete document ${document.title}`}>
              <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Document</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete “{document.title}”? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(document.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
