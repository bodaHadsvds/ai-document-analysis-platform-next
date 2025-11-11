"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DocumentNotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-red-600">
            <AlertTriangle className="w-6 h-6" />
            Document Not Found
          </CardTitle>
          <CardDescription>
            The document you are looking for does not exist or may have been removed.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Button
            variant="default"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}