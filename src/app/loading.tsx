"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="p-6 shadow-lg rounded-2xl max-w-sm bg-white/80 backdrop-blur">
        <CardContent className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <h2 className="text-lg font-medium text-gray-700">
            Loading, please wait...
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}
