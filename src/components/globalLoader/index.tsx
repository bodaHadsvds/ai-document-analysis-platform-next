"use client";

import { useLoadingStore } from "@/hooks/useLoading";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GlobalLoader() {
  const isLoading = useLoadingStore((s) => s.isLoading);

  const pathname = usePathname();

 
  const stopLoading = useLoadingStore((s) => s.stopLoading);

  useEffect(() => {
  
  

        stopLoading();
    

  }, [pathname]);




  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
    </div>
  );
}
