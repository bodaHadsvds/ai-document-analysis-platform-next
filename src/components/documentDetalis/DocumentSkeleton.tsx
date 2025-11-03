"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentDetailsSkeleton() {
  return (
    <div className="p-8 space-y-6 animate-pulse">
      <div className="h-8 w-1/3 bg-gray-300 rounded"></div>

      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-1/4" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
