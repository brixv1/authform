"use client";

import { signOut, useSession } from "next-auth/react";
import Button from "../components/Button";

const Success = () => {
  const session = useSession();
  return (
    <div className="h-screen bg-neutral-700">
      <h1 className="text-2xl font-bold text-slate-100">
        Welcome {session.data?.user?.name}
      </h1>
      <Button onClick={signOut}>Logout</Button>
    </div>
  );
};
export default Success;
