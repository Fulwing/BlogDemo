'use client'

import { CMS_NAME } from "@/lib/constants";
import SignInButton from "./signIn";
import SignUpButton from "./signUpButton";
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export function Intro() {
  const { data: session } = useSession();

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Made with NextJS By Daniel & WeiZhi{" "}
      </h4>
      <div className="flex items-center space-x-4 mt-5">
        <SignInButton />
        {!session && <SignUpButton />}
        {session && (
          <Link href="/protected/add-post">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">
              + Create Post
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}
