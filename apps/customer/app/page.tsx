"use client"
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession()
  return (
    <div>
      <Appbar user={session.data?.user} onSignIn={signIn} onSignOut={signOut}/>
    </div>
  );
}
