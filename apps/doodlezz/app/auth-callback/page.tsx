"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");

    if (token) {
      localStorage.setItem("token", token);
      if (name) {
        localStorage.setItem("name", name);
      }
      
      // Small delay to ensure storage is set before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } else {
      // If no token, something went wrong, go back to signin
      router.push("/signin");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen grainy flex flex-col items-center justify-center p-6">
      <div className="bg-white border-4 border-black p-10 rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-black animate-spin" />
        <h1 className="text-2xl font-black">Authenticating...</h1>
        <p className="text-gray-600 font-bold">Bringing you back to your doodles.</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen grainy flex flex-col items-center justify-center p-6">
        <div className="bg-white border-4 border-black p-10 rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-black animate-spin" />
          <h1 className="text-2xl font-black">Loading...</h1>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
