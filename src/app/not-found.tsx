"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";


export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-center">
      <Card className="p-6 shadow-lg rounded-2xl max-w-md bg-white/80 backdrop-blur">
        <CardContent className="flex flex-col items-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-800">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <Button asChild className="mt-4">
            <Link href="/" aria-label="Go back to the homepage">
              Go back home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
