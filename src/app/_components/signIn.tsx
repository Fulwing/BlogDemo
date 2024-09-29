'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  const handleLogin = async () => {
    if (session) {
      await signOut();
    } else {
      await signIn();
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
    >
      {session ? "Sign Out" : "Login"}
    </button>
  );
}
