'use client';

import Link from 'next/link';
import SignInButton from './signIn';
import SignUpButton from './signUpButton';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
        <SignInButton />
        {/* Render SignUpButton only if the user is not authenticated */}
        {session ? null : <SignUpButton />}
      </h2>
    </>
  );
};

export default Header;
