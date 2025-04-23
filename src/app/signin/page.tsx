"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-6">Sign in</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => signIn("google", { callbackUrl: "/profile" })}
      >
        Sign in with Google
      </button>
    </main>
  );
}