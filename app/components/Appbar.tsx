"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Appbar() {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-between px-5 py-4 md:px-10 xl:px-20">
      <div
        onClick={() => {
          router.push("/home");
        }}
        className="flex flex-col justify-center text-lg font-bold hover:cursor-pointer text-white"
      >
        Muzer
      </div>
      <div className="flex items-center gap-x-2">
        {session.data?.user ? (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Logout
          </Button>
        ) : (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}
