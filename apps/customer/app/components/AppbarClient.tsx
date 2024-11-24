"use client"
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import dash from '../../public/dash-logo.svg'
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar logo={dash} onSignIn={signIn} onSignOut={async () => {
        await signOut()
        router.push("/")
      }} user={session.data?.user} />
   </div>
  );
}
